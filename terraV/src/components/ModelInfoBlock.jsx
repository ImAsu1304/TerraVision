const ModelInfoBlock = () => {
  return (
    <div className="text-xs text-gray-400">
      <p className="font-medium mb-1">Model Information</p>
      <p>Type: Semantic Segmentation (U-Net)</p>
      <p>Resolution: ~10 meters per pixel</p>
      <p>Inference Mode: On-demand</p>
    </div>
  );
};

export default ModelInfoBlock;
