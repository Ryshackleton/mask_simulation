import { COLOR_BY_DISEASE, ICON_BY_DISEASE, ICON_BY_MASK, MASK, STROKE_COLOR_BY_MASK, STROKE_WIDTH_BY_MASK } from './constants';

const defaultFillFunction = ({ disease_status }) => COLOR_BY_DISEASE[disease_status];
const defaultStrokeFunction = ({ mask_status }) => STROKE_COLOR_BY_MASK[mask_status];
const defaultStrokeWidthFunction = ({ mask_status }) =>
  STROKE_WIDTH_BY_MASK[mask_status];

export function drawCircle(ctx, node, fill, stroke, strokeWidth = 2) {
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

export function drawCircles(
  ctx,
  nodes,
  virusNodes,
  fillFunction = defaultFillFunction,
  strokeFunction = defaultStrokeFunction,
  strokeWidthFunction = defaultStrokeWidthFunction,
) {
  nodes.forEach((node, index) =>
    drawCircle(
      ctx,
      node,
      fillFunction(virusNodes[index]),
      strokeFunction(virusNodes[index]),
      strokeWidthFunction(virusNodes[index])
    )
  );
}

export const ICON_FONT = 'Font Awesome 5 Free';
export const ICON_FONT_WEIGHT = 900;
export function drawIcon(ctx, node, fill, icon = '\uf007', radiusScale = 3) {
  const radius = node.radius * radiusScale;
  ctx.font = `${ICON_FONT_WEIGHT} ${radius}px "${ICON_FONT}"`;
  ctx.fillStyle = fill;
  ctx.fillText(icon, node.x - radius / 2, node.y + radius / 2);
}

const defaultIconFunction = ({ disease_status, mask_status }) => (
  mask_status === MASK.NO_MASK ? ICON_BY_DISEASE[disease_status] : ICON_BY_MASK[mask_status]
);
export function drawIcons(
  ctx,
  nodes,
  virusNodes,
  fillFunction = defaultFillFunction,
  iconFunction = defaultIconFunction,
  radiusMultiplier = 3,
) {
  nodes.forEach((node, index) =>
    drawIcon(
      ctx,
      node,
      fillFunction(virusNodes[index]),
      iconFunction(virusNodes[index]),
      radiusMultiplier,
    )
  );
}
