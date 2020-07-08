import React from 'react';
import './App.css';
import { MaskSimulation } from './components';
import { DEFAULT_SIMULATION_PROPS, DEFAULT_VIRUS_SIMULATION_PROPS } from './hooks/useSimulation';

function App() {
  return (
    <div className="App">
        <MaskSimulation simulationProps={{
          ...DEFAULT_SIMULATION_PROPS,
          virusSimulations: [
            {
              ...DEFAULT_VIRUS_SIMULATION_PROPS,
              title: '5% transmission, no masks',
              percentMasked: 0,
            },
          ],
        }} />
    </div>
  );
}

export default App;
