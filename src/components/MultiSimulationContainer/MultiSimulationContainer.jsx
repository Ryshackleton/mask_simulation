import React, { useMemo } from 'react';
import Canvas2d from '../Canvas/Canvas2d';
import { drawNodes } from '../../hooks/useSimulation';

import './MultiSimlulationContainer.scss';

const drawFunction = ({
  positionNodes = [],
  virusNodes = []
}) => ((ctx) => drawNodes(ctx, positionNodes, virusNodes));

export default function MultiSimulationContainer({
  simulationState: {
    isRunning,
    isStasisReached,
    positionNodes = [],
    virusSimulations,
  } = {},
  handleClick,
  height,
  width,
}) {
  const interactionMessage = useMemo(() => {
    if (isStasisReached) {
      return '(touch to start a new simulation)';
    } else if (isRunning === true) {
      return '(touch to pause)';
    } else if (isRunning === false) {
      return '(touch to resume)';
    }
    return '';
  }, [isRunning, isStasisReached]);

  return <div className="multi-simulation-container" >
    {
      virusSimulations
      && virusSimulations.map(({ title, percentMasked, virusNodes }, index) => (
        <div className="simulation-group-container" key={`sim-canvas-${index}`} >
          <div
            className="simulation-canvas-labels"
            onClick={handleClick}
          >
            <span className="simulation-title">{title || `${percentMasked}% mask use`}</span>
            <span className="interaction-label">{interactionMessage}</span>
          </div>
          <Canvas2d
            className="simulation-canvas"
            drawFunction={drawFunction({ positionNodes, virusNodes })}
            onClick={handleClick}
            ontouchend={handleClick}
            height={height}
            width={width}
          />
        </div>
      ))}
  </div>;
}
