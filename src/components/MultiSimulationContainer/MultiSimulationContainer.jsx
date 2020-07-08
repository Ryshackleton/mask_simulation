import React, { useMemo } from 'react';
import Canvas2d from '../Canvas/Canvas2d';
import { drawNodes } from '../../hooks/useSimulation';

import './MultiSimlulationContainer.scss';
import { VirusStackedArea } from '../VirusStackedArea';
import { VirusCounts } from '../VirusCounts';

const drawFunction = ({
  positionNodes = [],
  virusNodes = []
}) => ((ctx) => drawNodes(ctx, positionNodes, virusNodes));

export default function MultiSimulationContainer({
  height = 400,
  simulationState: {
    isRunning,
    isStasisReached,
    positionNodes = [],
    tick,
    virusSimulations,
  } = {},
  handleClick,
}) {
  const interactionMessage = useMemo(() => {
    if (isStasisReached) {
      return '(touch to start a new simulation)';
    } else if (isRunning === true) {
      return '(touch to pause simulation)';
    } else if (isRunning === false && tick === 0) {
      return '(touch to start simulation)';
    } else if (isRunning === false) {
      return '(touch to resume simulation)';
    }
    return '';
  }, [isRunning, isStasisReached, tick]);

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
          <div className="stacked-area-with-labels-container">
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
