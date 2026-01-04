const STATES = ["Telangana", "Karnataka", "Maharastra"];

const StateSelector = ({ selectedState, onSelect }) => {
    return (
        <div>
            <p className="text-sm text-gray-400 mb-2">Select State</p>
            <select className="w-full bg-black border border-gray-700 p-2 text-sm" value={selectedState || ""} onChange={(e) => onSelect(e.target.value)}>
                <option value="" disabled>
                    Choose a state
                </option>
                {STATES.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StateSelector;