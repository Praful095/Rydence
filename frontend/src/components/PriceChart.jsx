const PriceChart = ({ trend }) => {
  if (!trend || !trend.price_points || trend.price_points.length === 0)
    return null;

  const { price_points, direction } = trend;

  // Chart dimensions
  const width = 400;
  const height = 160;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const minPrice = Math.min(...price_points);
  const maxPrice = Math.max(...price_points);
  const priceRange = maxPrice - minPrice || 1;

  const xScale = (index) =>
    padding.left + (index / (price_points.length - 1)) * chartWidth;
  const yScale = (price) =>
    padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  // Generate path
  const linePath = price_points
    .map((price, i) => {
      const x = xScale(i);
      const y = yScale(price);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Area path (for gradient fill)
  const areaPath = `${linePath} L ${xScale(price_points.length - 1)} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

  // Color based on trend
  const strokeColor =
    direction === "INCREASING"
      ? "#EF4444"
      : direction === "DECREASING"
        ? "#14B8A6"
        : "#3B82F6";
  const fillColor =
    direction === "INCREASING"
      ? "rgba(239, 68, 68, 0.1)"
      : direction === "DECREASING"
        ? "rgba(20, 184, 166, 0.1)"
        : "rgba(59, 130, 246, 0.1)";

  // Y-axis labels (3 steps)
  const yLabels = [
    Math.round(maxPrice),
    Math.round(minPrice + priceRange / 2),
    Math.round(minPrice),
  ];

  // Time labels
  const timeLabels = ["Now", "5m", "10m", "15m", "20m", "25m", "30m"];

  return (
    <div className="glass rounded-3xl p-6 shadow-xl animate-fade-up delay-400">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Price Forecast
      </h3>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[0, 1, 2].map((i) => {
          const y = padding.top + (i * chartHeight) / 2;
          return (
            <line
              key={`grid-${i}`}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(0,0,0,0.05)"
              strokeDasharray="4,4"
            />
          );
        })}

        {/* Y-axis labels */}
        {yLabels.map((label, i) => (
          <text
            key={`y-label-${i}`}
            x={padding.left - 10}
            y={padding.top + (i * chartHeight) / 2 + 4}
            textAnchor="end"
            className="text-xs fill-gray-400 font-mono"
          >
            ₹{label}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={fillColor} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {price_points.map((price, i) => (
          <circle
            key={`point-${i}`}
            cx={xScale(i)}
            cy={yScale(price)}
            r={i === 0 ? 5 : 3}
            fill={i === 0 ? strokeColor : "white"}
            stroke={strokeColor}
            strokeWidth="2"
          />
        ))}

        {/* Animated dot at "Now" */}
        <circle
          cx={xScale(0)}
          cy={yScale(price_points[0])}
          r="8"
          fill={strokeColor}
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="8;12;8"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* X-axis labels */}
        {timeLabels.map((label, i) => (
          <text
            key={`x-label-${i}`}
            x={xScale(
              (i * (price_points.length - 1)) / (timeLabels.length - 1),
            )}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-gray-400 font-mono"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default PriceChart;
