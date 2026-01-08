const TotalAreaSummary = ({ totalArea }) => {
  return (
    <div className="text-sm border-b border-gray-700 pb-2">
      <p className="text-gray-400">Analyzed Area</p>
      <p className="text-white font-semibold">{totalArea} km²</p>
    </div>
  );
};

export default TotalAreaSummary;
