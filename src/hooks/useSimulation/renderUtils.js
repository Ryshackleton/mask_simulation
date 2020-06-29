import { COLOR_BY_DISEASE, STROKE_COLOR_BY_MASK, STROKE_WIDTH_BY_MASK } from './constants';

const defaultFillFunction = ({ disease_status }) => COLOR_BY_DISEASE[disease_status];
const defaultStrokeFunction = ({ mask_status }) => STROKE_COLOR_BY_MASK[mask_status];
const defaultStrokeWidthFunction = ({ mask_status }) =>
  STROKE_WIDTH_BY_MASK[mask_status];

export function drawNode(ctx, node, fill, stroke, strokeWidth = 2) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.radius - (strokeWidth ? strokeWidth / 2 : 0), 0, Math.PI * 2, false);

  if (strokeWidth > 0) {
    ctx.save();
    ctx.strokeStyle = stroke || 'none';
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke || 'none';
  ctx.fill();
}

export function drawNodes(
  ctx,
  nodes,
  virusNodes,
  fillFunction = defaultFillFunction,
  strokeFunction = defaultStrokeFunction,
  strokeWidthFunction = defaultStrokeWidthFunction,
) {
  nodes.forEach((node, index) =>
    drawNode(
      ctx,
      node,
      fillFunction(virusNodes[index]),
      strokeFunction(virusNodes[index]),
      strokeWidthFunction(virusNodes[index])
    )
  );
}
