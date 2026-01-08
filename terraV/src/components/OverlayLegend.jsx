const OverlayLegend = ({ layers }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">Legend</p>
      <div className="space-y-1">
        {Object.entries(layers).map(([name, data]) => (
          <div key={name} className="flex items-center gap-2 text-xs">
            <span
              className="w-3 h-3 inline-block"
              style={{ backgroundColor: data.color }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverlayLegend;
