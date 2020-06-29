import React from 'react';
import { useMeasure } from 'react-use';
import MaskSimulation from './MaskSimulation';
import './MaskSimulationContainer.scss';

export default function MaskSimulationContainer() {
  const [containerRef, { height, width }] = useMeasure();
  return (
    <div className="mask-simulation-container" ref={containerRef} >
      <MaskSimulation height={height} width={width} />
    </div>
  );
}

