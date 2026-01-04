const AnalysisSummary = ({region, selectedClasses}) => {
    return (
        <div className="text-sm text-gray-400 border-t border-gray-800 pt-3">
            <p className="mb-1">
                <span className="text-gray-500">Region:</span>{" "}
                {region?.confirmed ? region.state : "Not selected"}
            </p>

            <p>
                <span className="text-gray-500">Classes:</span>{" "}
                {selectedClasses.length > 0 ? selectedClasses.join(", ") : "None"}
            </p>
        </div>
    );
};

export default AnalysisSummary;