const ClassOverlayLayer = ({ className, opacity, color }) => {
  return (
    <div
      className="absolute inset-24 pointer-events-none"
      style={{
        backgroundColor: color,
        opacity: opacity,
        mixBlendMode: "multiply",
      }}
    >
      <span className="absolute top-1 left-1 text-xs text-white">
        {className}
      </span>
    </div>
  );
};

export default ClassOverlayLayer;
