const CancelAnalysisButton = ({onCancel}) => {
    return (
        <button onClick={onCancel}
        className="mt-3 w-full border border-red-500 text-red-400 text-sm p-2 hover:bg-red-500/10">
            Cancel Analysis
        </button>
    );
};

export default CancelAnalysisButton;