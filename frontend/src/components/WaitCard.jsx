const WaitCard = ({ prediction }) => {
  if (!prediction) return null;

  const {
    should_wait,
    wait_minutes,
    save_amount,
    confidence,
    confidence_pct,
    message,
  } = prediction;

  const getConfidenceColor = (conf) => {
    switch (conf) {
      case "HIGH":
        return "bg-teal-500";
      case "MEDIUM":
        return "bg-amber-500";
      case "LOW":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getConfidenceBg = (conf) => {
    switch (conf) {
      case "HIGH":
        return "bg-teal-50 border-teal-200";
      case "MEDIUM":
        return "bg-amber-50 border-amber-200";
      case "LOW":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getIcon = () => {
    if (!should_wait) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 animate-float">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    }

    if (confidence === "LOW") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 animate-float">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 animate-float">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`glass rounded-3xl p-6 shadow-xl animate-fade-up delay-200 border ${getConfidenceBg(confidence)}`}
    >
      <div className="flex items-start gap-4">
        {getIcon()}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {should_wait
              ? `Wait ${wait_minutes} mins → Save ₹${save_amount}`
              : "Great time to book now!"}
          </h3>

          {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}

          {/* Confidence Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Prediction Confidence</span>
              <span className="font-medium text-gray-700">
                {confidence} ({confidence_pct}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getConfidenceColor(confidence)} rounded-full transition-all duration-1000`}
                style={{ width: `${confidence_pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitCard;
