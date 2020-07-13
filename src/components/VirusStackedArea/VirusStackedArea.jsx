import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { area, scaleLinear, select, stack } from 'd3';

import { COLOR_BY_DISEASE, DISEASE } from '../../hooks/useSimulation';
import './VirusStackedArea.scss';

const { INFECTED, SUSCEPTIBLE, RECOVERED, DEAD } = DISEASE;

export default function VirusStackedArea({
  handleMouseMove,
  handleTouchMove,
  handleMouseLeave,
  height: containerHeight,
  margin = { top: 5, left: 5, bottom: 5, right: 5 },
  transitionDuration = 1000,
  virusHistory: fullHistory,
  nNodes,
  width: containerWidth,
}) {
  const [virusHistory] = useMemo(() => {
    const interval = (String(fullHistory.length).length) * 2 || 1;
    const subsampled = [];
    for(let i = 0; i < fullHistory.length; i = i + interval) {
      subsampled.push(fullHistory[i]);
    }
    return [subsampled];
  }, [fullHistory]);
  const [height, width] = useMemo(() => {
    return [
      containerHeight - margin.top - margin.bottom,
      containerWidth - margin.left - margin.right,
    ];
  }, [containerWidth, containerHeight, margin]);

  const xScale = useMemo(() => {
    if (virusHistory.length) {
      const maxTick = Math.max(
        virusHistory[virusHistory.length - 1].tick,
        2000,
      );
      return scaleLinear().domain([0, maxTick]).range([0, width])
    }
    return scaleLinear();
  }, [virusHistory, width]);

  const yScale = useMemo(() => {
    return scaleLinear()
    .domain([0, nNodes])
    .range([height, 0]);
  }, [nNodes, height]);

  const series = useMemo(() => {
    return stack().keys([INFECTED, SUSCEPTIBLE, RECOVERED, DEAD])(virusHistory);
  }, [virusHistory]);

  const areasRef = useRef();

  /* -------- Render Lines/Labels/Areas -------- */
  useLayoutEffect(() => {
    // console.log(xScale.domain(), xScale.range());
    const areaGen = area()
      .x(d => xScale(d.data.tick))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))

    select(areasRef.current)
      .selectAll('path')
      .data(series)
      .join('path')
      .attr('d', areaGen)
      .attr("fill", ({ key }) => COLOR_BY_DISEASE[key])
    }, [series, areasRef, transitionDuration, xScale, yScale]);

  return (
    <div className="stacked-area-chart-wrapper" >
      <svg
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        height="100%"
        width="100%"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
        overflow="hidden">
        <g transform={`translate(${margin.left}, ${margin.top})`} ref={areasRef} />
      </svg>
    </div>
  );
}
