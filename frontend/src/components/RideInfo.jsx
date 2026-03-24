import { useState, useEffect, useCallback } from "react";
import { getRideInfo } from "../api/rideApi";
import { reverseGeocode } from "../api/locationApi";
import LocationSearch from "./LocationSearch";
import SurgeCard from "./SurgeCard";
import WaitCard from "./WaitCard";
import TrendCard from "./TrendCard";
import PriceChart from "./PriceChart";

const RideInfo = () => {
  // State
  const [scenario, setScenario] = useState("normal");
  const [rideData, setRideData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");

  // Clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch ride data when scenario changes and both locations are filled
  const bothFilled =
    fromLocation.trim().length > 0 && toLocation.trim().length > 0;

  useEffect(() => {
    if (!bothFilled) {
      setRideData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getRideInfo(scenario);
        setRideData(data);
      } catch (error) {
        console.error("Failed to fetch ride info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [scenario, bothFilled]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // GPS location handler
  const handleGpsClick = useCallback(() => {
    setGpsLoading(true);
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError("GPS not supported");
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await reverseGeocode(latitude, longitude);
          if (result && result.display_name) {
            setFromLocation(result.display_name);
          } else {
            setGpsError("Could not determine address");
          }
        } catch (error) {
          setGpsError("Location lookup failed");
        } finally {
          setGpsLoading(false);
        }
      },
      (error) => {
        setGpsError("GPS access denied. Please enter manually.");
        setGpsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  }, []);

  // Booking handlers
  const handleBookNow = () => {
    if (!rideData?.pricing) return;
    setToast({
      icon: "⚡",
      msg: `Ride booked for ${rideData.pricing.display_price || `₹${rideData.pricing.current_price}`}! Driver arriving in ~4 mins.`,
    });
  };

  const handleWaitAndSave = () => {
    if (!rideData?.prediction) return;
    const { should_wait, wait_minutes, save_amount } = rideData.prediction;

    if (should_wait) {
      setToast({
        icon: "⏳",
        msg: `We'll notify you in ${wait_minutes} mins when price drops by ₹${save_amount}!`,
      });
    } else {
      setToast({
        icon: "✅",
        msg: "Prices are stable now. No need to wait!",
      });
    }
  };

  const scenarios = [
    { id: "rain", label: "Rain + Rush", icon: "🌧️" },
    { id: "normal", label: "Normal", icon: "☀️" },
    { id: "event", label: "Event Nearby", icon: "🎉" },
    { id: "late", label: "Late Night", icon: "🌙" },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdf8] relative overflow-x-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 rounded-full opacity-35 blur-[80px]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-emerald-400 rounded-full opacity-35 blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400 rounded-full opacity-35 blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-10 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute bottom-4 right-20 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 pt-8 pb-32">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Rydence</h1>
              <p className="text-white/80 text-sm">Ride pricing transparency</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-medium">{currentTime}</p>
              <p className="text-white/80 text-sm">{currentDate}</p>
            </div>
          </div>

          {/* Route Card */}
          <div className="glass-strong rounded-3xl p-4 shadow-2xl">
            <div className="space-y-1">
              {/* From */}
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs font-bold">
                  A
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">
                    From
                  </label>
                  <LocationSearch
                    label="From"
                    placeholder="Enter pickup location"
                    value={fromLocation}
                    onChange={setFromLocation}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3" strokeWidth={2} />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 2v4m0 12v4M2 12h4m12 0h4"
                        />
                      </svg>
                    }
                    showGpsButton={true}
                    onGpsClick={handleGpsClick}
                    gpsLoading={gpsLoading}
                    gpsError={gpsError}
                  />
                </div>
              </div>

              {/* To */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">
                  B
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">
                    To
                  </label>
                  <LocationSearch
                    label="To"
                    placeholder="Enter destination"
                    value={toLocation}
                    onChange={setToLocation}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-2xl mx-auto px-4 -mt-20 pb-24">
        {!bothFilled ? (
          /* Empty State */
          <div className="glass rounded-3xl p-12 text-center shadow-xl animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9.553 4.553A1 1 0 009 4.118v.006"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Enter your route
            </h2>
            <p className="text-gray-500">
              Set your pickup and destination to see real-time pricing and surge
              predictions.
            </p>
          </div>
        ) : loading ? (
          /* Skeleton Loading */
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass rounded-3xl p-6 shadow-xl h-32 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : rideData ? (
          /* Content */
          <div className="space-y-4">
            {/* Scenario Switcher */}
            <div className="glass rounded-2xl p-2 shadow-lg mb-6">
              <div className="grid grid-cols-4 gap-1">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScenario(s.id)}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all ${
                      scenario === s.id
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-xs font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <SurgeCard pricing={rideData.pricing} />
              <WaitCard prediction={rideData.prediction} />
              <div className="md:col-span-2">
                <TrendCard trend={rideData.trend} />
              </div>
              <div className="md:col-span-2">
                <PriceChart trend={rideData.trend} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-3xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                Book Now
              </button>
              <button
                onClick={handleWaitAndSave}
                className="flex-1 glass border border-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-3xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>⏳</span>
                Wait & Save
              </button>
            </div>
          </div>
        ) : null}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-toast-in">
          <div className="glass-strong rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3 min-w-max">
            <span className="text-2xl">{toast.icon}</span>
            <p className="text-sm font-medium text-gray-800">{toast.msg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideInfo;
