const ClassToggleItem = ({label, active, onClick, disabled}) => {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`w-full text-left p-2 text-sm border transition ${active ? "border-green-500 bg-green-500/10" : "border-gray-700" }
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-800"} `}
        >
            {label}
        </button>
    );
};

export default ClassToggleItem;