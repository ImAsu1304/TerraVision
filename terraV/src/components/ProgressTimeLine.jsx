const ProgressTimeLine = ({ status }) => {
    const steps = ["queued", "running", "completed"];

    return (
        <div className="flex justify-between text-xs text-gray-400 mb-3">
            {steps.map((step) => (
                <span key={step} className={steps.indexOf(step) <= steps.indexOf(status) ? "text-green-400" : "" }>
                    {step.toUpperCase()}
                </span>
            ))}
        </div>
    );
};

export default ProgressTimeLine;