const AreaBreakdownChart = ({ data }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">Area Distribution</p>
      <div className="space-y-1">
        {data.map((item) => (
          <div key={item.className}>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{item.className}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-800">
              <div
                className="h-2 bg-blue-600"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaBreakdownChart;
