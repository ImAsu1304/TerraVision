const RunAnalysisButton = ({ disabled, onRun }) => {
    return (
        <div className="flex mt-4 justify-center">
            <button
                onClick={onRun}
                disabled={disabled}
                className={`w-11/12 p-2  text-sm font-medium rounded-2xl bg-blue-600 text-whit ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700 cursor-pointer"}`}
            >
                Run Analysis
            </button>
        </div>
    );
};

export default RunAnalysisButton;