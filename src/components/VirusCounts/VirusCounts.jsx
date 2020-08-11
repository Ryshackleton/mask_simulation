import React from 'react';

import { COLOR_BY_DISEASE, DISEASE, LABEL_BY_DISEASE } from '../../hooks/useSimulation';
import './VirusCounts.scss';

const diseaseOrdered = Object.values(DISEASE).reverse();

export default function VirusCounts({ virusHistory: fullHistory }) {
  const final = fullHistory && fullHistory.length ? fullHistory[fullHistory.length - 1] : {};
  const totalInfected = (final[DISEASE.RECOVERED] || 0) + (final[DISEASE.INFECTED] || 0);
  const maxR0 = fullHistory.reduce((acc, { r0 }, index) => (
    r0 > acc ? r0 : acc
  ), 0).toFixed(2);

  return <div className="virus-count-container">
    {
      diseaseOrdered.map((id) => (
        <span key={id} style={{ color: COLOR_BY_DISEASE[id] }} className="virus-count-label" >
          {LABEL_BY_DISEASE[id]}: <strong>{final[id]}</strong>
        </span>
      ))
    }
    {
      <span key={'total'} style={{ color: COLOR_BY_DISEASE[DISEASE.INFECTED] }} className="virus-count-label" >
          Total infections: <strong>{totalInfected}</strong>
        </span>
    }
    {
      <span key={'r0'} style={{ color: 'gray' }} className="virus-count-label" >
          Max R0: <strong>{maxR0}</strong>
        </span>
    }
  </div>;
}
