import PipelineStepList from "./PipelineStepList";
import AnalysisMetaInfo from "./AnalysisMetaInfo";
import ModelInfoBlock from "./ModelInfoBlock";
import DisclaimerNote from "./DisclaimerNote";

const ExplainabilityPanel = ({ open, onClose, meta }) => {
  if (!open) return null;

  return (
    <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center">
      <div className="bg-black border border-gray-700 w-[480px] max-h-[80vh] overflow-y-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">How This Analysis Was Generated</h2>
          <button
            onClick={onClose}
            className="text-xs border border-gray-700 px-2 py-0.5"
          >
            Close
          </button>
        </div>

        <AnalysisMetaInfo meta={meta} />
        <PipelineStepList />
        <ModelInfoBlock />
        <DisclaimerNote />
      </div>
    </div>
  );
};

export default ExplainabilityPanel;
