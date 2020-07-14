import React, { useMemo } from 'react';
import Canvas2d from '../Canvas/Canvas2d';
import { drawIcons, drawCircles, SIMULATION_RUN_STATE } from '../../hooks/useSimulation';

import './MultiSimlulationContainer.scss';
import { VirusStackedArea } from '../VirusStackedArea';
import { VirusCounts } from '../VirusCounts';

const { STASIS_REACHED, RUNNING, PAUSED } = SIMULATION_RUN_STATE;

export default function MultiSimulationContainer({
  drawNodesAsIcons = false,
  height = 400,
  simulationState: {
    positionNodes = [],
    runState,
    tick,
    virusSimulations,
  } = {},
  handleClick,
}) {
  const interactionMessage = useMemo(() => {
    if (runState === STASIS_REACHED) {
      return '(touch to start a new simulation)';
    } else if (runState === RUNNING) {
      return '(touch to pause simulation)';
    } else if (runState === PAUSED && tick === 0) {
      return '(touch to start simulation)';
    } else if (runState === PAUSED) {
      return '(touch to resume simulation)';
    }
    return '';
  }, [runState, tick]);

  const drawFunction = useMemo(() => {
    return drawNodesAsIcons
      ? ({ positionNodes = [], virusNodes = [] }) => (ctx) =>
          drawIcons(ctx, positionNodes, virusNodes)
      : ({ positionNodes = [], virusNodes = [] }) => (ctx) =>
          drawCircles(ctx, positionNodes, virusNodes);
  }, [drawNodesAsIcons]);

  return <div className="multi-simulation-container" >
    {
      virusSimulations
      && virusSimulations.map(({ title, percentMasked, virusHistory, virusNodes }, index) => (
        <div className="simulation-group-container" key={`sim-canvas-${index}`} >
          <div
            className="simulation-canvas-labels"
            onClick={handleClick}
          >
            <span className="simulation-title">{title || `${percentMasked}% mask use`}</span>
            <span className="interaction-label">{interactionMessage}</span>
          </div>
          <div style={{ width: height, height }} className="simulation-canvas-wrapper">
            <Canvas2d
              className="simulation-canvas"
              drawFunction={drawFunction({ positionNodes, virusNodes })}
              onClick={handleClick}
              ontouchend={handleClick}
              height={height}
              width={height}
            />
          </div>
          <div className="stacked-area-with-labels-container" style={{ width: height }}>
            <VirusCounts
              virusHistory={virusHistory}
              height={60}
            />
            <VirusStackedArea
              nNodes={virusNodes.length}
              virusHistory={virusHistory}
              height={60}
              width={height}
            />
          </div>
        </div>
      ))}
  </div>;
}
