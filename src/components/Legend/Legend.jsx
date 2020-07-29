import React from 'react';
import { COLOR_BY_DISEASE, DISEASE } from '../../hooks/useSimulation';
import './Legend.scss';

const HEALTHY_COLOR = COLOR_BY_DISEASE[DISEASE.SUSCEPTIBLE];
const INFECTED_COLOR = COLOR_BY_DISEASE[DISEASE.INFECTED];
const RECOVERED_COLOR = COLOR_BY_DISEASE[DISEASE.RECOVERED];

export default function Legend({ isMasked }) {
  return isMasked
    ? (
      <ul className="legend-text">
        <li>Healthy (no mask): <i
          style={{ color: HEALTHY_COLOR }}
          className="fas fa-user legend-icon"
          />
          , (masked): <i
            style={{ color: HEALTHY_COLOR }}
            className="fas fa-head-side-mask legend-icon"
          />
        </li>
        <li>Infected (no mask): <i
          style={{ color: INFECTED_COLOR }}
          className="fas fa-head-side-cough legend-icon"
          />
          , (masked): <i
            style={{ color: INFECTED_COLOR }}
            className="fas fa-head-side-mask legend-icon"
          />
        </li>
        <li>Recovered (no mask): <i
          style={{ color: RECOVERED_COLOR }}
          className="fas fa-user legend-icon"
          />
          , (masked): <i
            style={{ color: RECOVERED_COLOR }}
            className="fas fa-head-side-mask legend-icon"
          />
        </li>
      </ul>
    )
    : (
      <ul className="legend-text">
        <li>Healthy (susceptible): <i
          style={{color: HEALTHY_COLOR }}
          className="fas fa-user legend-icon"
        />
        </li>
        <li>Infected (contagious): <i
          style={{ color: INFECTED_COLOR }}
          className="fas fa-head-side-cough legend-icon"
        />
        </li>
        <li>Recovered (immune & not contagious): <i
          style={{ color: RECOVERED_COLOR }}
          className="fas fa-user legend-icon"
        />
        </li>
      </ul>
    );
}
