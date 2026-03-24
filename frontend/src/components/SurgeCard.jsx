const SurgeCard = ({ pricing }) => {
  if (!pricing) return null;

  const {
    current_price,
    base_price,
    surge_pct,
    surge_level,
    reasons,
    display_price,
  } = pricing;

  const getSurgeColor = (level) => {
    switch (level) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-amber-500";
      case "LOW":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSurgeBadgeColor = (level) => {
    switch (level) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";
      case "MEDIUM":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "LOW":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getBarWidth = (level) => {
    switch (level) {
      case "HIGH":
        return "w-[82%]";
      case "MEDIUM":
        return "w-[55%]";
      case "LOW":
        return "w-[22%]";
      default:
        return "w-[10%]";
    }
  };

  return (
    <div className="glass rounded-3xl p-6 shadow-xl animate-fade-up delay-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Current Price
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              {display_price || `₹${current_price}`}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₹{base_price}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getSurgeBadgeColor(surge_level)}`}
        >
          {surge_level} SURGE
        </span>
      </div>

      {/* Surge Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getSurgeColor(surge_level)} rounded-full transition-all duration-1000 ease-out ${getBarWidth(surge_level)}`}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-gray-500">
          <span>Base</span>
          <span className="font-medium text-gray-700">+{surge_pct}% surge</span>
        </div>
      </div>

      {/* Reasons */}
      {reasons && reasons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {reasons.map((reason, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {reason}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurgeCard;
