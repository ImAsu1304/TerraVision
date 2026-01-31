import { useState } from "react";
import TopBar from "./TopBar";
import MapCanvas from "./MapCanvas";
import RightDocker from "./RightDocker";
import Hamburger from "./Hamburger";
import AnalysisLockOverlay from "./AnalysisLockOverlay";
import AnalysisProgress from "./AnalysisProgress";
import StatsPanel from "./StatsPanel";
import ShowStatsArrow from "./ShowStatsArrow";
import HistoryDrawer from "./HistoryDrawer"
import { analyzeState } from "../api/analyzeState";

const AppShell = () => {
  const [region, setRegion] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [isDockerOpen, setIsDockerOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [stats, setStats] = useState(null);
  const [mapData, setMapData] = useState(null);

  // REAL ANALYSIS ENTRY POINT
  const handleRun = async () => {
    if (!region?.confirmed) return;

    try {
      setIsAnalyzing(true);
      setAnalysisDone(false);

      const data = await analyzeState(region.state);

      setStats(data.stats);
      setMapData({
        geojson: data.geojson,
        tiles: data.tiles
      });

      // Signal completion ONLY
      setAnalysisDone(true);
    } catch (err) {
      setIsAnalyzing(false);
      setAnalysisDone(false);
      alert(err.message || "Backend error");
    }
  };

  return (
    <div className="bg-gray-950 w-screen h-screen flex flex-col text-white overflow-hidden">
      <TopBar regionStatus={region?.confirmed ? region.state : "No region selected"} />

      <div className="flex flex-1 overflow-hidden relative">
        {isAnalyzing && <AnalysisLockOverlay />}

        {isAnalyzing && (
          <div className="fixed inset-0 z-500 flex items-center justify-center pointer-events-none">
            <div className="w-80 p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl pointer-events-auto">
              <AnalysisProgress
                done={analysisDone}
                onCancel={() => {
                  setIsAnalyzing(false);
                  setAnalysisDone(false);
                }}
                onFinish={() => {
                  setIsAnalyzing(false);
                  setAnalysisDone(false);
                  setAnalysisResult(true);
                  setIsStatsOpen(true);
                  setIsDockerOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <Hamburger isOpen={isDockerOpen} onClick={() => setIsDockerOpen(true)} />

        {isDockerOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-401 md:hidden"
            onClick={() => setIsDockerOpen(false)}
          />
        )}


        {/* History Toggle Button */}
        {!isHistoryOpen && (
          <button 
          onClick={() => setIsHistoryOpen(true)}
          className="absolute top-4 left-4 z-[401] bg-gray-900 border border-gray-700 px-3 py-1.5 rounded text-xs hover:bg-gray-800 transition-all"
          >
            HISTORY
          </button>
        )}

        {/* History Drawer Component */}
        {isHistoryOpen && (
          <HistoryDrawer onClose={() => setIsHistoryOpen(false)} />
        )}

        {isHistoryOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-401 md:hidden"
            onClick={() => setIsHistoryOpen(false)}
          />
        )}

        {/* MAP */}
        <MapCanvas
          selectedState={selectedState}
          mapData={mapData}
          analysisDone={analysisResult}
        />


        {!isDockerOpen && (
          <ShowStatsArrow isOpen={isStatsOpen} onClick={() => setIsStatsOpen(true)} />
        )}

        {analysisResult && (
          <>
            <div className={`${isStatsOpen ? "block" : "hidden"} md:hidden`}>
              <div
                className="fixed inset-0 bg-black/60 z-403"
                onClick={() => setIsStatsOpen(false)}
              />
            </div>

            <div className={`${isStatsOpen ? "block" : "hidden"} z-403`}>
              <StatsPanel stats={stats} onClick={() => setIsStatsOpen(false)} />
            </div>
          </>
        )}

        {/* RIGHT DOCKER */}
        <div className={`${isDockerOpen ? "block" : "hidden"} md:block z-402`}>
          <RightDocker
            region={region}
            setRegion={setRegion}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            onRun={handleRun}
            setAnalysisResult={setAnalysisResult}
            setAnalysisDone={setAnalysisDone}
            setIsStatsOpen={setIsStatsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default AppShell;