import React from 'react';
import MaskSimulation from './MaskSimulation';
import './MaskSimulationContainer.scss';

export default function MaskSimulationContainer({ simulationProps }) {
  return (
    <div className="mask-simulation-container" >
      <MaskSimulation simulationProps={simulationProps} />
    </div>
  );
}

