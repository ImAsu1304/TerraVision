const RegionConfirmBar = ({onConfirm, onReset, selectedState}) => {
    return (
        <div className="flex justify-around mt-4 gap-4">
            <button onClick={onConfirm} disabled={!selectedState} className={`w-1/2 h-9  ml-2 rounded-2xl bg-green-600 ${selectedState ? "hover:cursor-pointer hover:bg-green-700" : "hover:cursor-not-allowed opacity-50" }`}>Confirm</button>
            <button onClick={onReset} className={`bg-yellow-500 w-1/2 h-9 mr-2 rounded-2xl ${selectedState ? "hover:cursor-pointer hover:bg-yellow-600" : "hover:cursor-not-allowed opacity-50"}`}>Reset</button>
        </div>
    );
}

export default RegionConfirmBar;