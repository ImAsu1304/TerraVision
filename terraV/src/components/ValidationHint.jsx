const ValidationHint = ({regionConfirmed, selectedClasses}) => {
    let message = "";

    if (!regionConfirmed) {
        message = "Confirm a region to continue.";
    } else if (selectedClasses.length === 0) {
        message = "Select at least one class.";
    }

    return (
        <p className="text-xs text-yellow-400">
            {message}
        </p>
    );
};

export default ValidationHint;