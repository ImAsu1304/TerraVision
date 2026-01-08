import PipelineStepItem from "./PipelineStepItem";

const STEPS = [
  "Satellite imagery was fetched for the selected region",
  "Large images were split into smaller tiles",
  "Each tile was processed using a segmentation model",
  "Predictions were merged into a single classification map",
  "Area statistics were computed from pixel data",
];

const PipelineStepList = () => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">Processing Pipeline</p>
      <div className="space-y-2">
        {STEPS.map((step, idx) => (
          <PipelineStepItem key={idx} step={step} index={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default PipelineStepList;
