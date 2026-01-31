import { useEffect } from "react";
import StateSelector from "./StateSelector";
import RegionConfirmBar from "./RegionConfirmBar";
import RunAnalysisButton from "./RunAnalysisButton";
import UnderDevErr from "./UnderDevErr";
import { useState } from "react";

const RightDocker = ({
  region,
  setRegion,
  selectedState,
  setSelectedState,
  onRun,
  setAnalysisResult,
  setAnalysisDone,
  setIsStatsOpen
}) => {
  const canRunAnalysis = region?.confirmed === true;
  const [devError, setDevError] = useState(false);

  useEffect(() => {
    if (selectedState) {
      setRegion({
        state: selectedState,
        confirmed: false
      });
    }
  }, [selectedState, setRegion]);

  const confirmRegion = () => {
    if (selectedState !== "Telangana") {
      setDevError(true);
      return;
    }

    setRegion({
      state: selectedState,
      confirmed: true
    });
  };

  const resetRegion = () => {
    setSelectedState(null);
    setRegion(null);
    setAnalysisDone(false);
    setAnalysisResult(false);
    setIsStatsOpen(false);
  };

  return (
    <div className="w-80 md:w-96 h-full border-4 border-gray-800 bg-gray-950">
      <StateSelector selectedState={selectedState} onSelect={setSelectedState} />

      <RegionConfirmBar
        onConfirm={confirmRegion}
        onReset={resetRegion}
        
        selectedState={selectedState}
      />

      <RunAnalysisButton disabled={!canRunAnalysis} onRun={onRun} />

      {/* THE UI OVERLAY */}
      {devError && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 p-6 bg-gray-900 border-2 border-red-900 shadow-2xl rounded-xl pointer-events-auto text-center">
            <h3 className="text-red-500 font-bold mb-2 uppercase">Under Development</h3>
            <p className="text-gray-300 text-sm mb-4">TerraVision analysis is currently optimized for Telangana only.</p>
            <button
              onClick={() => setDevError(false)}
              className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RightDocker;
