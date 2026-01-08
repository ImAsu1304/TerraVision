const ExplainabilityTrigger = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="absolute bottom-6 left-4 bg-black border border-gray-700 px-3 py-1 text-sm"
    >
      How this analysis works
    </button>
  );
};

export default ExplainabilityTrigger;
