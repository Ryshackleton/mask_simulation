import React from 'react';
import './App.css';
import { MaskSimulation } from './components';
import { DEFAULT_SIMULATION_PROPS, DEFAULT_VIRUS_SIMULATION_PROPS } from './hooks/useSimulation';

function App() {
  return (
    <div className="App">
      <div className="section">
        <h2 className="title">Basic probability based transmission model</h2>
        <div className="editorial-text">This simulation demonstrates the concepts that mask use in the general population helps
          flatten the curve by lowering the overall rate of virus transmission.  If we take a base
          transmission rate of 5% probability of virus transmision in nodes that come in contact,
          we see the following scenario.
        </div>
        <div className="editorial-text"><strong>Click/touch the gray box to start/stop/reset simulations</strong></div>
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
      <div className="section">
        <h2 className="title">Masks vs no masks</h2>
        <div className="editorial-text">Now lets run two simulations like the one above that have
          the same contacts for each node and the same transmission probabilities, but now we'll
          add masks to one simulation. <strong>Masked individuals are denoted by the black outlined
          circles.</strong> Here we assume that the masks reduce the probability of virus
          transmission by 33% for both the infected person and the healthy person. See how the model
          changes.
        </div>
        <MaskSimulation simulationProps={{
          ...DEFAULT_SIMULATION_PROPS,
          virusSimulations: [
            {
              ...DEFAULT_VIRUS_SIMULATION_PROPS,
              title: 'No mask use',
              percentMasked: 0,
            },
            {
              ...DEFAULT_VIRUS_SIMULATION_PROPS,
              title: '95% mask use',
              percentMasked: 95,
            }
          ],
        }}/>
      </div>
    </div>
  );
}

export default App;
