import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSimulation, MASK, MASK_ATTACK_REDUCTION } from '../../hooks';
import { MultiSimulationContainer } from '../MultiSimulationContainer';

const defaultProps = {
  attackSuccessProbability: 0.05,
  historyInterval: 3,
  nNodes: 40,
  radius: 7,
  ticksToRecover: 1000,
  velocity: 3.5,
  virusSimulations: [
    {
      title: 'No mask use',
      maskedType: MASK.NON_MEDICAL,
      nInfected: 3,
      percentMasked: 0,
      maskTransmissionReduction: MASK_ATTACK_REDUCTION,
    },
    {
      title: '95% mask use',
      maskedType: MASK.NON_MEDICAL,
      nInfected: 3,
      percentMasked: 95,
      maskTransmissionReduction: MASK_ATTACK_REDUCTION,
    },
  ],
};

export default function Simulation({
  simulationProps = defaultProps,
  height: containerHeight = 400,
  margin = { top: 20, left: 20, bottom: 20, right: 20 },
  width: containerWidth = 400,
}) {
  const [simulationState, setSimulationState] = useState({});

  const [height, width] = useMemo(() => {
    const isMobile = containerWidth > 600;
    const wrapDenom = isMobile ? 2 : 1;
    // make space square
    const min = Math.min(
      containerHeight - margin.top - margin.bottom,
      (containerWidth - (margin.left - margin.right) * wrapDenom) / wrapDenom
    );
    return [min, min];
  }, [containerHeight, containerWidth, margin]);

  const [worker] = useSimulation({ height, width, ...simulationProps }, setSimulationState);

  useEffect(() => {
    if (worker) {
      worker.postMessage({ action: 'RESIZE', height, width });
    }
  }, [height, width, worker]);

  const handleClick = useCallback(() => {
    if (simulationState.isStasisReached) {
      worker.postMessage({ action: 'NEW_SIMULATION', height, width, ...simulationProps });
    } else if (simulationState.isRunning === true) {
      worker.postMessage({ action: 'PAUSE' });
    } else if (simulationState.isRunning === false) {
      worker.postMessage({ action: 'RESUME' });
    }
  }, [worker, height, width, simulationProps, simulationState]);

  return <MultiSimulationContainer
    simulationState={simulationState}
    handleClick={handleClick}
    height={height}
    width={width}
  />;
};
