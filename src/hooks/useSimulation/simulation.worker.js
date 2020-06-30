let state = {
  isStasisReached: false,
  isRunning: false,
  tick: 0,
  maxTicks: 1000,
  positionNodes: [],
  virusSimulations: [],
  width: 0,
  height: 0,
};

/** CONSTANTS */
const DISEASE = ({
  INFECTED: 0,
  SUSCEPTIBLE: 1,
  RECOVERED: 2,
});

const MASK = {
  NO_MASK: 0,
  NON_MEDICAL: 1,
  MEDICAL: 2
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
  nNodes = 0,
  radius = 7,
  virusSimulations = [],
  ticksToRecover = 1000,
  velocity = 8,
  width = 500,
}) {
  state.width = width;
  state.height = height;
  state.tick = 0;
  state.isRunning = true;
  state.isStasisReached = false;
  state.positionNodes = makeNodes(nNodes, width, height, velocity, radius);
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
      {
        mask_status: infectorMask },
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
      maskedType,
      nInfected,
      maskTransmissionReduction,
      percentMasked,
      shouldInfect,
      virusNodes,
    };
  });
}

function tick() {
  if (state.isRunning && !state.isStasisReached) {
    const { positionNodes, virusSimulations } = state;

    state.isStasisReached = true;

    advancePositions(positionNodes, state.width, state.height);
    virusSimulations.forEach(({ virusNodes, shouldInfect }) => {
      if(advanceVirus(positionNodes, virusNodes, shouldInfect)) {
        state.isStasisReached = false;
      }
    })
    state.tick++;
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
function makeNodes(nNodes, width, height, startingVelocity, radius) {
  return [...new Array(nNodes)].map((__, index) => ({
    index,
    common_random_value: Math.random(),
    x: Math.random() * width * 0.9 + radius,
    y: Math.random() * height * 0.9 + radius,
    xVelocity: (Math.random() - 0.5) * startingVelocity,
    yVelocity: (Math.random() - 0.5) * startingVelocity,
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
  nodes.forEach(node => advancePosition(node, width, height));
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
  const contacts = {}; // { [infectious index]: [susceptible index, susceptible index, ...] }
  let nInfected = 0;
  // brute force detect contacts of infected with susceptible nodes
  nodes.forEach((circle, index) => {
    // only perform collision detection on infected nodes
    if (virusNodes[index].disease_status === DISEASE.INFECTED) {
      nInfected++;
      virusNodes[index].ticks_infected++;
      if (virusNodes[index].ticks_infected > state.ticksToRecover) {
        virusNodes[index].disease_status = DISEASE.RECOVERED;
        virusNodes[index].ticks_infected = 0;
      }

      // all other nodes, check for susceptible nodes
      nodes.forEach((other, otherIndex) => {
        if (virusNodes[otherIndex].disease_status === DISEASE.SUSCEPTIBLE) {
          // dumb proximity check
          if (
            Math.abs(circle.x - other.x) < other.radius &&
            Math.abs(circle.y - other.y) < other.radius
          ) {
            contacts[index] = contacts[index] || [];
            // add to possible list of infections
            contacts[index].push(otherIndex);
          }
        }
      });
    }
  });

  // apply infections based on attack rate
  Object.keys(contacts).forEach(infector => {
    contacts[infector].forEach(infectee => {
      if (shouldInfectNode(
        nodes[virusNodes[infector].index].common_random_value,
        virusNodes[infector],
        virusNodes[infectee])
      ) {
        virusNodes[infectee].disease_status = DISEASE.INFECTED;
      }
    });
  });

  return nInfected !== 0;
}
