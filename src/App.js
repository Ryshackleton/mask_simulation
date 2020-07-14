import React from 'react';
import './App.css';
import { MaskSimulation } from './components';
import {
  COLOR_BY_DISEASE,
  DEFAULT_SIMULATION_PROPS,
  DEFAULT_VIRUS_SIMULATION_PROPS,
  DISEASE,
} from './hooks/useSimulation';

const PERCENT_SOCIALLY_DISTANT = 75;
const HEALTHY_COLOR = COLOR_BY_DISEASE[DISEASE.SUSCEPTIBLE];
const INFECTED_COLOR = COLOR_BY_DISEASE[DISEASE.INFECTED];
const RECOVERED_COLOR = COLOR_BY_DISEASE[DISEASE.RECOVERED];
function App() {
  return (
    <div className="App">
      <div className="section">
        <h2 className="title">Basic probability based transmission model</h2>
        <div className="editorial-text">This simulation demonstrates the concepts that mask use in the general population helps
          flatten the curve by lowering the overall rate of virus transmission.  If we take a base
          transmission rate of 5% probability of virus transmission in nodes that come in contact,
          we see the following scenario. Healthy, Infected, and Recovered individuals are denoted as follows:
          <ul>
            <li>Healthy (susceptible): <i style={{ color: HEALTHY_COLOR }} className="fas fa-user editorial-icon"></i></li>
            <li>Infected (contagious): <i style={{ color: INFECTED_COLOR }} className="fas fa-head-side-cough editorial-icon"></i></li>
            <li>Recovered (immune & not contagious): <i style={{ color: RECOVERED_COLOR }} className="fas fa-user editorial-icon"></i></li>
          </ul>
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
        <h2 className="title">No masks vs 95% mask use</h2>
        <div className="editorial-text">Now lets run two simulations like the one above that have
          the same contacts for each node and the same transmission probabilities, but now we'll
          add masks to one simulation. <strong>Masked individuals are denoted by the{' '}
          <i className="fas fa-head-side-mask editorial-icon"></i> icon</strong>, while their color
          denotes infection status as above:
          <ul>
            <li>Healthy (no mask): <i style={{ color: HEALTHY_COLOR }} className="fas fa-user editorial-icon"></i>
              , (masked): <i style={{ color: HEALTHY_COLOR }}className="fas fa-head-side-mask editorial-icon"></i></li>
            <li>Infected (no mask): <i style={{ color: INFECTED_COLOR }} className="fas fa-head-side-cough editorial-icon"></i>
              , (masked): <i style={{ color: INFECTED_COLOR }}className="fas fa-head-side-mask editorial-icon"></i></li>
            <li>Recovered (no mask): <i style={{ color: RECOVERED_COLOR }} className="fas fa-user editorial-icon"></i>
              , (masked): <i style={{ color: RECOVERED_COLOR }}className="fas fa-head-side-mask editorial-icon"></i></li>
          </ul>
        </div>
        <div className="editorial-text">Here we assume that the masks reduce the probability of virus
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
      <div className="section">
        <h2 className="title">Masks with Social Distancing really flattens the curve</h2>
        <div className="editorial-text">Partial social distancing can be mimicked by requiring
          certain nodes to stay fixed, resulting in fewer contacts with other nodes. Here's a
          scenario where, <strong>in both cases, {PERCENT_SOCIALLY_DISTANT}% of the nodes are
          socially distant</strong>. Although the motions of still-moving nodes are different for
          the simulations above, the curves should generally be flatter for the socially distant
          simulations than for simulations where all nodes are moving.
        </div>
        <MaskSimulation simulationProps={{
          ...DEFAULT_SIMULATION_PROPS,
          percentSociallyDistant: PERCENT_SOCIALLY_DISTANT,
          virusSimulations: [
            {
              ...DEFAULT_VIRUS_SIMULATION_PROPS,
              title: `No mask use, ${PERCENT_SOCIALLY_DISTANT}% social distancing`,
              percentMasked: 0,
            },
            {
              ...DEFAULT_VIRUS_SIMULATION_PROPS,
              title: `95% mask use, ${PERCENT_SOCIALLY_DISTANT}% social distancing`,
              percentMasked: 95,
            }
          ],
        }}/>
      </div>
    </div>
  );
}

export default App;
