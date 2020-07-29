import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Legend, MaskSimulation } from './components';
import {
  NO_MASKS_PROPS,
  NO_MASKS_VS_MASKS_PROPS,
  NO_MASKS_VS_MASKS_WITH_SOCIAL_DISTANCING_PROPS,
  PERCENT_SOCIALLY_DISTANT,
} from './constants';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/mask_simulation/no_masks" >
          <div className="embed-wrapper">
            <MaskSimulation simulationProps={NO_MASKS_PROPS} />
          </div>
        </Route>
        <Route path="/mask_simulation/no_masks_vs_masks" >
          <div className="embed-wrapper">
            <MaskSimulation simulationProps={NO_MASKS_VS_MASKS_PROPS} />
          </div>
        </Route>
        <Route path="/mask_simulation/no_masks_vs_masks_with_social_distancing" >
          <div className="embed-wrapper">
            <MaskSimulation simulationProps={NO_MASKS_VS_MASKS_WITH_SOCIAL_DISTANCING_PROPS} />
          </div>
        </Route>
        <Route path="/mask_simulation/masks_legend" >
          <div className="embed-wrapper">
            <Legend isMasked={true} />
          </div>
        </Route>
        <Route path="/mask_simulation/no_masks_legend" >
          <div className="embed-wrapper">
            <Legend isMasked={false} />
          </div>
        </Route>
        <Route
          path="/"
        >
          <div className="App">
            <div className="section">
              <h2 className="title">Basic probability based transmission model</h2>
              <div className="editorial-text">This simulation demonstrates the concepts that mask use in the general population helps
                flatten the curve by lowering the overall rate of virus transmission.  If we take a base
                transmission rate of 5% probability of virus transmission in nodes that come in contact,
                we see the following scenario. Healthy, Infected, and Recovered individuals are denoted as follows:
                <Legend isMasked={false} />
              </div>
              <div className="editorial-text"><strong>Click/touch the gray box to start/stop/reset simulations</strong></div>
              <MaskSimulation simulationProps={NO_MASKS_PROPS} />
            </div>
            <div className="section">
              <h2 className="title">No masks vs 95% mask use</h2>
              <div className="editorial-text">Now lets run two simulations like the one above that have
                the same contacts for each node and the same transmission probabilities, but now we'll
                add masks to one simulation. <strong>Masked individuals are denoted by the{' '}
                  <i className="fas fa-head-side-mask editorial-icon"></i> icon</strong>, while their color
                denotes infection status as above:
                <Legend isMasked={true} />
              </div>
              <div className="editorial-text">Here we assume that the masks reduce the probability of virus
                transmission by 33% for both the infected person and the healthy person. See how the model
                changes.
              </div>
              <MaskSimulation simulationProps={NO_MASKS_VS_MASKS_PROPS}/>
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
              <MaskSimulation simulationProps={NO_MASKS_VS_MASKS_WITH_SOCIAL_DISTANCING_PROPS}/>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
