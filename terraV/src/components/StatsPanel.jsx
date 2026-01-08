import { useMemo } from "react";
import ClassStatsCard from "./ClassStatsCard";
import AreaBreakdownChart from "./AreaBreakdownChart";
import TotalAreaSummary from "./TotalAreaSummary";

const StatsPanel = ({ analysisResult, visibleClasses }) => {
  const stats = useMemo(() => {
    const totalArea = analysisResult.totalAreaSqKm;

    const classStats = Object.entries(analysisResult.stats)
      .filter(([cls]) => visibleClasses.includes(cls))
      .map(([cls, data]) => ({
        className: cls,
        area: data.areaSqKm,
        percentage: ((data.areaSqKm / totalArea) * 100).toFixed(1),
      }));

    return { totalArea, classStats };
  }, [analysisResult, visibleClasses]);

  return (
    <div className="absolute bottom-6 right-4 w-96 bg-black border border-gray-700 p-4 space-y-4">
      <TotalAreaSummary totalArea={stats.totalArea} />

      <div className="grid grid-cols-2 gap-3">
        {stats.classStats.map((item) => (
          <ClassStatsCard key={item.className} {...item} />
        ))}
      </div>

      <AreaBreakdownChart data={stats.classStats} />
    </div>
  );
};

export default StatsPanel;
