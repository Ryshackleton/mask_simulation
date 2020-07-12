let state = {
  isStasisReached: false,
  isRunning: false,
  tick: 0,
  maxTicks: 1000,
  percentSociallyDistant: 0,
  positionNodes: [],
  virusSimulations: [],
  width: 0,
  height: 0,
  historyInterval: 3,
};

/** CONSTANTS */
const DISEASE = {
  INFECTED: 0,
  SUSCEPTIBLE: 1,
  RECOVERED: 2,
};

const MASK = {
  NO_MASK: 0,
  NON_MEDICAL: 1,
  MEDICAL: 2,
};

function dispatchMessage() {
  const {
    isStasisReached,
    isRunning,
    positionNodes,
    tick,
    virusSimulations = [],
  } = state;
  postMessage({
    isStasisReached,
    isRunning,
    positionNodes,
    tick,
     // remove shouldInfect function, which cannot be returned from worker
    virusSimulations: virusSimulations.map(({ shouldInfect, ...rest }) => rest) },
  );
}

function makeNewSimulation({
  attackSuccessProbability = 0.6,
  height = 500,
  historyInterval = state.historyInterval,
  nNodes = 0,
  percentSociallyDistant = 0,
  radius = 7,
  virusSimulations = [],
  ticksToRecover = 1000,
  velocity = 8,
  width = 500,
}) {
  state.width = width;
  state.height = height;
  state.tick = 0;
  state.isRunning = false;
  state.isStasisReached = false;

  const nSociallyDistant = Math.ceil((percentSociallyDistant / 100) * nNodes);
  state.positionNodes = makeNodes(nNodes, width, height, velocity, radius, nSociallyDistant);
  state.percentSociallyDistant = percentSociallyDistant;
  state.historyInterval = historyInterval;
  state.ticksToRecover = ticksToRecover;

  state.virusSimulations = virusSimulations.map(({
    maskedType = MASK.NON_MEDICAL,
    nInfected = 1,
    percentMasked = 0,
    maskTransmissionReduction = {}, // { [maskType]: reduction factor (decimal) }
    ...rest
  }) => {
    const nMasked = (percentMasked / 100) * nNodes;
    const virusNodes = makeVirusNodes(
      nNodes,
      nInfected,
      DISEASE.SUSCEPTIBLE,
      maskedType,
      nMasked
    );

    // node to node transmission
    const shouldInfect = (
      randomValue, // use the same random value for infected nodes between different virus simulations
      { mask_status: infectorMask },
      { mask_status: infecteeMask }
    ) => {
      return (
        randomValue <= attackSuccessProbability *
        maskTransmissionReduction[infectorMask] *
        maskTransmissionReduction[infecteeMask]
      );
    };

    return {
      ...rest,
      virusHistory: [getVirusTickData(virusNodes)],
      maskedType,
      nInfected,
      maskTransmissionReduction,
      percentMasked,
      shouldInfect,
      virusNodes,
    };
  });
}

function getVirusTickData(virusNodes) {
  const accumulator = {
    tick: state.tick,
    [DISEASE.INFECTED]: 0,
    [DISEASE.SUSCEPTIBLE]: 0,
    [DISEASE.RECOVERED]: 0,
  };
  for (let index = 0; index < virusNodes.length; ++index) {
    accumulator[virusNodes[index].disease_status]++
  }
  return accumulator;
}

function tick() {
  if (state.isRunning && !state.isStasisReached) {
    const { positionNodes, virusSimulations } = state;

    state.isStasisReached = true;

    advancePositions(positionNodes, state.width, state.height);
    state.tick++;
    virusSimulations.forEach(({ virusHistory, virusNodes, shouldInfect }) => {
      if(advanceVirus(positionNodes, virusNodes, shouldInfect)) {
        state.isStasisReached = false;
      }

      // compute totals for each state and push to history
      if (state.tick % state.historyInterval === 0) {
        virusHistory.push(getVirusTickData(virusNodes));
      }
    })
  }
}

function receiveMessage({ data: { action, ...rest } }) {
  switch (action) {
    case 'PAUSE':
      state.isRunning = false;
    break;
    case 'RESUME':
      state.isRunning = true;
    break;
    case 'NEW_SIMULATION': {
      state = { ...state, ...rest };
      makeNewSimulation(rest);
    }
    break;
    case 'TICK': {
      tick();
    }
    break;
    case 'RESIZE': {
      const { width, height } = rest;
      state.width = width;
      state.height = height;
      makeNewSimulation(state);
    }
    break;
    default:
  }
  dispatchMessage();
}

self.addEventListener("message", receiveMessage); // eslint-disable-line no-restricted-globals

/** POSITION FUNCTIONS */
function makeNodes(nNodes, width, height, startingVelocity, radius, nSociallyDistant) {
  return [...new Array(nNodes)].map((__, index) => ({
    index,
    common_random_value: Math.random(),
    x: Math.random() * width * 0.9 + radius,
    y: Math.random() * height * 0.9 + radius,
    xVelocity: nNodes - index < nSociallyDistant ? 0 : (Math.random() - 0.5) * startingVelocity,
    yVelocity: nNodes - index < nSociallyDistant ? 0 : (Math.random() - 0.5) * startingVelocity,
    radius
  }));
}

function advancePosition(node, width, height) {
  node.common_random_value = Math.random();
  if (node.x + node.radius > width || node.x - node.radius < 0) {
    node.xVelocity = -node.xVelocity;
  }
  if (node.y + node.radius > height || node.y - node.radius < 0) {
    node.yVelocity = -node.yVelocity;
  }
  node.x += node.xVelocity;
  node.y += node.yVelocity;
}

function advancePositions(nodes, width, height) {
  for (let index = 0; index < nodes.length; ++index) {
    advancePosition(nodes[index], width, height);
  }
}

/** VIRUS FUNCTIONS */

function makeVirusNodes(nNodes, nInfected, startingDiseaseStatus, startingMaskStatus, nMasked) {
  return [...new Array(nNodes)].map((__, index) => ({
    index,
    ticks_infected: 0,
    disease_status: index + 1 > nInfected ? startingDiseaseStatus : DISEASE.INFECTED,
    mask_status: index < nMasked ? startingMaskStatus : MASK.NO_MASK
  }));
}

// returns true if uninfected nodes remain
function advanceVirus(nodes, virusNodes, shouldInfectNode) {
  const newInfections = new Set(); // indexes of newly infected nodes
  let nInfected = 0;
  // brute force detect contacts of infected with susceptible nodes
  for (let infectorIndex = 0; infectorIndex < virusNodes.length; ++infectorIndex) {
    // only perform collision detection on infected nodes
    if (virusNodes[infectorIndex].disease_status === DISEASE.INFECTED) {
      virusNodes[infectorIndex].ticks_infected++;
      if (virusNodes[infectorIndex].ticks_infected > state.ticksToRecover) {
        virusNodes[infectorIndex].disease_status = DISEASE.RECOVERED;
        virusNodes[infectorIndex].ticks_infected = 0;
      } else {
        nInfected++; // only count as infected if the node will be infected in the next step
      }

      // all other nodes, check for susceptible nodes
      for (let infecteeIndex = 0; infecteeIndex < nodes.length; infecteeIndex++) {
        if (
          infectorIndex !== infecteeIndex // don't check self
          && virusNodes[infecteeIndex].disease_status === DISEASE.SUSCEPTIBLE // only infect susceptible nodes
        ) {
          // check proximity
          if (
            Math.sqrt(
              (nodes[infectorIndex].x - nodes[infecteeIndex].x) * (nodes[infectorIndex].x - nodes[infecteeIndex].x)
               + (nodes[infectorIndex].y - nodes[infecteeIndex].y) * (nodes[infectorIndex].y - nodes[infecteeIndex].y)
            ) < nodes[infectorIndex].radius + nodes[infecteeIndex].radius
          ) {
            if (shouldInfectNode(
              nodes[infectorIndex].common_random_value,
              virusNodes[infectorIndex],
              virusNodes[infecteeIndex])
            ) {
              newInfections.add(infecteeIndex)
            }
          }
        }
      }
    }
  }

  // infect new infectees
  for (let newlyInfected of newInfections) {
    virusNodes[newlyInfected].disease_status = DISEASE.INFECTED;
    virusNodes[newlyInfected].ticks_infected = 0;
    nInfected++;
  }

  return nInfected !== 0;
}
