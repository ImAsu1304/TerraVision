const OverlayOpacityControl = ({ opacity, setOpacity }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">Overlay Opacity</p>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default OverlayOpacityControl;
