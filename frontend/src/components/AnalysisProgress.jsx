import { useState, useEffect } from "react";

const AnalysisProgress = ({ done, onCancel, onFinish }) => {
  const [progress, setProgress] = useState(0);

  // Animate till 99 while backend runs
  useEffect(() => {
    if (done) return;

    const timer = setInterval(() => {
      setProgress(prev => (prev < 99 ? prev + 1 : prev));
    }, 30);

    return () => clearInterval(timer);
  }, [done]);

  // When backend finishes
  useEffect(() => {
    if (!done) return;

    setProgress(100);

    const timeout = setTimeout(() => {
      onFinish();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [done, onFinish]);

  return (
    <div className="flex flex-col items-center w-full p-2">
      <label className="text-white text-xs font-medium mb-2 self-start uppercase tracking-wider">
        Running Analysis
      </label>

      <div className="relative w-full h-6">
        <progress
          value={progress}
          max="100"
          className="absolute inset-0 w-full h-full appearance-none overflow-hidden rounded-full
            [&::-webkit-progress-bar]:bg-gray-800
            [&::-webkit-progress-value]:bg-blue-600
            [&::-webkit-progress-value]:transition-all
            [&::-webkit-progress-value]:duration-75"
        />

        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white pointer-events-none">
          {progress}%
        </span>
      </div>

      <button
        onClick={onCancel}
        className="mt-6 w-20 border-2 border-red-800 font-extrabold text-xs p-2
          text-black bg-red-500 hover:bg-red-700 rounded-2xl"
      >
        Cancel
      </button>
    </div>
  );
};

export default AnalysisProgress;
