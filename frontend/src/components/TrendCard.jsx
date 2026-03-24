const TrendCard = ({ trend }) => {
  if (!trend) return null;

  const { direction, label, description } = trend;

  const getTrendConfig = (dir) => {
    switch (dir) {
      case "INCREASING":
        return {
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          ),
          bg: "bg-red-50 border-red-200",
          iconBg: "bg-red-100 text-red-600",
          text: "text-red-700",
        };
      case "DECREASING":
        return {
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          ),
          bg: "bg-teal-50 border-teal-200",
          iconBg: "bg-teal-100 text-teal-600",
          text: "text-teal-700",
        };
      case "STABLE":
        return {
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14"
              />
            </svg>
          ),
          bg: "bg-blue-50 border-blue-200",
          iconBg: "bg-blue-100 text-blue-600",
          text: "text-blue-700",
        };
      default:
        return {
          icon: null,
          bg: "bg-gray-50 border-gray-200",
          iconBg: "bg-gray-100 text-gray-600",
          text: "text-gray-700",
        };
    }
  };

  const config = getTrendConfig(direction);

  return (
    <div
      className={`glass rounded-3xl p-6 shadow-xl animate-fade-up delay-300 border ${config.bg}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.iconBg}`}
        >
          {config.icon}
        </div>

        <div>
          <p className={`text-sm font-medium ${config.text} mb-0.5`}>{label}</p>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
