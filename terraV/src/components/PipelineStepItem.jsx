const PipelineStepItem = ({ step, index }) => {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-500">{index}.</span>
      <span>{step}</span>
    </div>
  );
};

export default PipelineStepItem;
