function polygonPoints(sides, size, strokeWidth = 2) {
  // const s = Math.max(5, Math.min(10, Math.round(sides || 6)));
  const s = Math.round(sides);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth - 1;
  const points = [];
  const angleOffset = -Math.PI / 2;
  for (let i = 0; i < s; i++) {
    const theta = (i / s) * Math.PI * 2 + angleOffset;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

export function IconWrapper({ size = 24, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      cursor="pointer"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function LineIcon({
  size = 24,
  stroke = "currentColor",
  strokeWidth = 2,
  style,
  ...rest
}) {
  return (
    <IconWrapper size={size} style={style} {...rest}>
      <line
        x1={size * 0.2}
        y1={size * 0.8}
        x2={size * 0.8}
        y2={size * 0.2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </IconWrapper>
  );
}

export function ArrowIcon({
  size = 24,
  stroke = "currentColor",
  strokeWidth = 2,
  fill = "none",
  rotation = 270,
  style,
  ...rest
}) {
  const tipX = size * 0.72;
  const tipY = size * 0.28;

  const head = [
    `${tipX},${tipY}`,
    `${size * 0.58},${size * 0.28}`,
    `${size * 0.72},${size * 0.14}`,
  ].join(" ");

  return (
    <IconWrapper size={size} style={style} {...rest}>
      <line
        x1={size * 0.18}
        y1={size * 0.82}
        x2={size * 0.58}
        y2={size * 0.42}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <polygon
        points={head}
        fill={stroke}
        stroke={stroke}
        strokeWidth={strokeWidth * 0.2}
        transform={`rotate(${rotation}, ${tipX}, ${tipY})`}
      />
    </IconWrapper>
  );
}

export function CircleIcon({
  size = 24,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 2,
  style,
  ...rest
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth - 1;
  return (
    <IconWrapper size={size} style={style} {...rest}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
      />
    </IconWrapper>
  );
}

export function TriangleIcon({
  size = 24,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 2,
  style,
  ...rest
}) {
  const points = polygonPoints(3, size, strokeWidth);
  return (
    <IconWrapper size={size} style={style} {...rest}>
      <polygon
        points={points}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
}

export function RectangleIcon({
  size = 24,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 2,
  rx = 2,
  style,
  ...rest
}) {
  const pad = strokeWidth + 1;
  const w = size - pad * 2;
  const h = size - pad * 2;
  return (
    <IconWrapper size={size} style={style} {...rest}>
      <rect
        x={pad}
        y={pad}
        width={w}
        height={h}
        rx={rx}
        ry={rx}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
      />
    </IconWrapper>
  );
}

export function PolygonIcon({
  sides = 6,
  size = 24,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 2,
  style,
  ...rest
}) {
  const pts = polygonPoints(sides, size, strokeWidth);
  return (
    <IconWrapper size={size} style={style} {...rest}>
      <polygon
        points={pts}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
}
