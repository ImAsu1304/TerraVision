import { useState } from "react";
import RegionPreviewOverlay from "./RegionPreviewOverlay";
import ResultOverlayManager from "./ResultOverlayManager";
import StatsPanel from "./StatsPanel";
import ExplainabilityTrigger from "./ExplainabilityTrigger";
import ExplainabilityPanel from "./ExplainabilityPanel";

const MapCanvas = ({ region, analysisResult, analysisMeta }) => {
  const [explainOpen, setExplainOpen] = useState(false);

  return (
    <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
      <p className="text-gray-500">Map Canvas</p>

      {region?.boundary && (
        <RegionPreviewOverlay confirmed={region.confirmed} />
      )}

      {analysisResult && (
        <>
          <ResultOverlayManager analysisResult={analysisResult} />
          <StatsPanel
            analysisResult={analysisResult}
            visibleClasses={Object.keys(analysisResult.stats)}
          />
          <ExplainabilityTrigger onOpen={() => setExplainOpen(true)} />
          <ExplainabilityPanel
            open={explainOpen}
            onClose={() => setExplainOpen(false)}
            meta={analysisMeta}
          />
        </>
      )}
    </div>
  );
};

export default MapCanvas;
