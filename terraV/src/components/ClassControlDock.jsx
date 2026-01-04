import { useState } from "react";
import ClassToggleGroup from "./ClassToggleGroup";
import AnalysisSummary from "./AnalysisSummary";
import RunAnalysisButton from "./RunAnalysisButton";
import ValidationHint from "./ValidationHint";

const ClassControlDock = ({region}) => {
    const [selectedClasses, setSelectedClasses] = useState([])

    const regionConfirmed = region?.confirmed === true;
    const canRunAnalysis = regionConfirmed && selectedClasses.length >0;

    const handleRun = () => {
        const d = new Date();
        const analysisRequest = {
            region,
            classes: selectedClasses,
            timestamp: d.toString(),
        };

        console.log("Analysis Request:", analysisRequest);
    };

    return (
        <div>
            <ClassToggleGroup
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            disabled={!regionConfirmed}
            />

            <AnalysisSummary
            region={region}
            selectedClasses={selectedClasses}
            />

            {!canRunAnalysis && (
                <ValidationHint
                regionConfirmed={regionConfirmed}
                selectedClasses={selectedClasses}
                />
            )}

            <RunAnalysisButton
            disabled={!canRunAnalysis}
            onRun={handleRun}
            />
        </div>
    );
};

export default ClassControlDock;