import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useSimulation,
  DEFAULT_SIMULATION_PROPS,
  DEFAULT_VIRUS_SIMULATION_PROPS,
  SIMULATION_RUN_STATE,
} from '../../hooks';
import { MultiSimulationContainer } from '../MultiSimulationContainer';

export default function Simulation({
  simulationProps = {
    ...DEFAULT_SIMULATION_PROPS,
    virusSimulations: [{ ...DEFAULT_VIRUS_SIMULATION_PROPS,  title: 'No mask use' }],
  },
  height: containerHeight = 400,
  margin = { top: 0, left: 0, bottom: 0, right: 0 },
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
    if (simulationState.runState === SIMULATION_RUN_STATE.STASIS_REACHED) {
      worker.postMessage({ action: 'NEW_SIMULATION', height, width, ...simulationProps });
    } else if (simulationState.runState === SIMULATION_RUN_STATE.RUNNING) {
      worker.postMessage({ action: 'PAUSE' });
    } else if (simulationState.runState === SIMULATION_RUN_STATE.PAUSED) {
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
