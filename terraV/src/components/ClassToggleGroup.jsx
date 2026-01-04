import ClassToggleItem from "./ClassToggleItem";

const CLASSES = [
    { id: "vegetation", label : "Vegetation" },
    { id: "buildings", label : "Buildings" },
    { id: "water", label : "Water" },
    { id: "roads", label : "Roads" },
];

const ClassToggleGroup = ({selectedClasses, setSelectedClasses, disabled}) => {
    const toggleClass = (id) => {
        setSelectedClasses((prev) => 
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
};

return (
    <div>
        <p className="text-sm text-gray-400 mb-2">Selected Classes</p>
        <div className="space-y-2">
            {CLASSES.map((cls) => (
                <ClassToggleItem 
                key={cls.id}
                label={cls.label}
                active={selectedClasses.includes(cls.id)}
                onClick={() => toggleClass(cls.id)}
                disabled={disabled}
                />
            ))}
        </div>
    </div>
);
};

export default ClassToggleGroup;