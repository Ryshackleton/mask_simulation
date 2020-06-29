import React from 'react';
import { useCanvas } from '../../hooks';

export default function Canvas2d({
  onClick,
  className,
  drawFunction = () => {},
  height = 500,
  width = 500,
  canvasPixelRatio = 2,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  style = {},
  onTouchEnd,
  onTouchMove,
  onTouchStart,
}) {
  const canvasRef = useCanvas(drawFunction, canvasPixelRatio);
  const sizeInPixels = { width: `${width}px`, height: `${height}px` };
  return <canvas
    className={className}
    width={width * canvasPixelRatio}
    height={height * canvasPixelRatio}
    style={{ ...sizeInPixels, ...style }}
    ref={canvasRef}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
    onMouseMove={onMouseMove}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onClick={onClick}
  />;
}

