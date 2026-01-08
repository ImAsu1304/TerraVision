const OverlayVisibilityToggle = ({
  classes,
  visibleClasses,
  toggleClass,
}) => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">Visible Layers</p>
      <div className="space-y-1">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => toggleClass(cls)}
            className={`w-full text-left text-sm p-1 border
              ${
                visibleClasses.includes(cls)
                  ? "border-green-500 text-green-400"
                  : "border-gray-700 text-gray-400"
              }
            `}
          >
            {cls}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OverlayVisibilityToggle;
