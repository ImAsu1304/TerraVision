const ClassStatsCard = ({ className, area, percentage }) => {
  return (
    <div className="border border-gray-700 p-2 text-sm">
      <p className="text-gray-400">{className}</p>
      <p className="text-white font-medium">{area} km²</p>
      <p className="text-xs text-gray-500">{percentage}%</p>
    </div>
  );
};

export default ClassStatsCard;
