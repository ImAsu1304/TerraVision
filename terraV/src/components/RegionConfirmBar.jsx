const RegionConfirmBar = ({ onConfirm, onReset }) => {
    return (
        <div className="flex gap-2 pt-4">
            <button onClick={onConfirm} className="flex-1 bg-green-600 text-black text-sm p-2" >
                Confirm
            </button>
            <button onClick={onReset} className="flex-1 border border-gray-700 text-sm p-2">
                Reset
            </button>
        </div>
    );
};

export default RegionConfirmBar;