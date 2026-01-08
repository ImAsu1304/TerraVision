import { useState } from "react";
import ClassOverlayLayer from "./ClassOverlayLayer";
import OverlayLegend from "./OverlayLegend";
import OverlayOpacityControl from "./OverlayOpacityControl";
import OverlayVisibilityToggle from "./OverlayVisibilityToggle";
import ResultReadyBanner from "./ResultReadyBanner";

const ResultOverlayManager = ({ analysisResult }) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0.6);
  const [visibleClasses, setVisibleClasses] = useState(
    Object.keys(analysisResult.layers)
  );

  const toggleClass = (cls) => {
    setVisibleClasses((prev) => {
      const updated =
        prev.includes(cls)
          ? prev.filter((c) => c !== cls)
          : [...prev, cls];

      onVisibilityChange?.(updated);
      return updated;
    });
  };

  return (
    <>
      <ResultReadyBanner />

      {visibleClasses.map((cls) => (
        <ClassOverlayLayer
          key={cls}
          className={cls}
          opacity={overlayOpacity}
          color={analysisResult.layers[cls].color}
        />
      ))}

      <div className="absolute top-16 right-4 bg-black border border-gray-700 p-3 space-y-3 w-64">
        <OverlayOpacityControl
          opacity={overlayOpacity}
          setOpacity={setOverlayOpacity}
        />

        <OverlayVisibilityToggle
          classes={Object.keys(analysisResult.layers)}
          visibleClasses={visibleClasses}
          toggleClass={toggleClass}
        />

        <OverlayLegend layers={analysisResult.layers} />
      </div>
    </>
  );
};

export default ResultOverlayManager;
