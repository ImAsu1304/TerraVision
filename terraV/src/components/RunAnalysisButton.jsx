const RunAnalysisButton = ({disabled, onRun}) => {
    return (
        <button
         onClick={onRun}
         disabled={disabled}
         className={`w-full mt-2 p-2 text-sm font-medium ${disabled ? "bg-gray-800 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
            Run Analysis
        </button>
    );
};

export default RunAnalysisButton;