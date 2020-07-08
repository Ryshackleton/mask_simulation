import React from 'react';

import { COLOR_BY_DISEASE, DISEASE, LABEL_BY_DISEASE } from '../../hooks/useSimulation';
import './VirusCounts.scss';

const diseaseOrdered = Object.values(DISEASE).reverse();

export default function VirusCounts({
  height: containerHeight,
  virusHistory: fullHistory,
}) {
  const final = fullHistory && fullHistory.length ? fullHistory[fullHistory.length - 1] : {};

  return <div className="virus-count-container" style={{ height: containerHeight }} >
    {
      diseaseOrdered.map((id) => (
        <span key={id} style={{ color: COLOR_BY_DISEASE[id] }} className="virus-count-label" >
          {LABEL_BY_DISEASE[id]}: <strong>{final[id]}</strong>
        </span>
      ))
    }
  </div>;
}
