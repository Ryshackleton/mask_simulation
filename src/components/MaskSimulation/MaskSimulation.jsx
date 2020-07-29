import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useSimulation,
  DEFAULT_SIMULATION_PROPS,
  DEFAULT_VIRUS_SIMULATION_PROPS,
  ICON_FONT,
  SIMULATION_RUN_STATE, ICON_FONT_WEIGHT,
} from '../../hooks';
import { MultiSimulationContainer } from '../MultiSimulationContainer';
import { useAsync } from 'react-use';

const { STASIS_REACHED, RUNNING, PAUSED } = SIMULATION_RUN_STATE;

export default function Simulation({
  simulationProps: {
    drawNodesAsIcons,
    ...simulationProps
  } = {
    ...DEFAULT_SIMULATION_PROPS,
    virusSimulations: [{ ...DEFAULT_VIRUS_SIMULATION_PROPS,  title: 'No mask use' }],
  },
  height: containerHeight = 350,
  margin = { top: 0, left: 0, bottom: 0, right: 0 },
  width: containerWidth = 350,
}) {
  const [simulationState, setSimulationState] = useState({});
  const { loading: fontLoading } = useAsync(async () => (drawNodesAsIcons
    ? document.fonts.load(`${ICON_FONT_WEIGHT} 14px "${ICON_FONT}"`)
    : { loading: false }
  ), [ICON_FONT, drawNodesAsIcons]);

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
    if (simulationState.runState === STASIS_REACHED) {
      worker.postMessage({ action: 'NEW_SIMULATION', height, width, ...simulationProps });
    } else if (simulationState.runState === RUNNING) {
      worker.postMessage({ action: 'PAUSE' });
    } else if (simulationState.runState === PAUSED) {
      worker.postMessage({ action: 'RESUME' });
    }
  }, [worker, height, width, simulationProps, simulationState]);

  return !fontLoading && <MultiSimulationContainer
    drawNodesAsIcons={drawNodesAsIcons}
    simulationState={simulationState}
    handleClick={handleClick}
    height={height}
    width={width}
  />;
};
