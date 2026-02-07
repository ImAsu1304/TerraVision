import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HistoryDrawer = ({ onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("History fetch failed:", err));
  }, []);

  return (
    <div
      className="fixed top-12 left-0 h-[calc(100%-3rem)] w-80
                 bg-gray-950 border-r border-gray-800 z-402
                 p-4 overflow-y-auto scrollbar-hide"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-blue-400 uppercase">
          Analysis History
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl font-bold leading-none"
          aria-label="Close history"
        >
          ✕
        </button>
      </div>

      {history.length === 0 && (
        <p className="text-xs text-gray-500">No history available</p>
      )}

      {history.map((item) => (
        <div
          key={item._id}
          className="mb-3 p-3 bg-gray-900 border border-gray-800 rounded-lg"
        >
          <p className="text-[10px] text-gray-400">
            {new Date(item.updatedAt || item.createdAt).toLocaleString()}
          </p>
          <p className="text-sm font-semibold">{item.state}</p>
          <div className="mt-2 text-[10px] text-gray-500 italic">
            Area: {item.totalArea ? item.totalArea.toLocaleString() : 0} sq km
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryDrawer;