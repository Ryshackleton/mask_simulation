import { useState, useEffect } from 'react';
import useInterval from '../useInterval';
import SimulationWorker from 'workerize-loader!./simulation.worker'; // eslint-disable-line import/no-webpack-loader-syntax

export * from './renderUtils';
export * from './constants';

function noop() {}

export default function useSimulation(simulationProps, onSimulationTicked = noop, tickInterval = 10)  {
  const [worker, setWorker] = useState(null);

  useInterval(() => {
    if (worker) {
      worker.postMessage({ action: 'TICK' });
    }
  }, tickInterval);

  useEffect(() => {
    if (!worker) {
      const sim = new SimulationWorker();
      sim.postMessage({
        action: 'NEW_SIMULATION',
        ...simulationProps,
      });
      sim.addEventListener('message', event => {
        onSimulationTicked(event.data);
      });
      setWorker(sim);
    }
  }, [worker, setWorker, onSimulationTicked, simulationProps]);

  return [worker, setWorker];
}
