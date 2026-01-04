import { useEffect, useState } from "react";
import AnalysisProgressPanel from "./AnalysisProgressPanel";
import AnalysisLockOverlay from "./AnalysisLockOverlay";

const AnalysisController = ({ analysisRequest, onComplete, onCancel }) => {
    const [status, setStatus] = useState("queued")
    const [tilesDone, setTilesDone] = useState(0);
    const totalTiles = 20;

    useEffect(() => {
        setStatus("running");

        const interval = setInterval(() => {
            setTilesDone((prev) => {
                if (prev + 1 >= totalTiles) {
                    clearInterval(interval);
                    setStatus("completed");
                    setTimeout(() => {
                        onComplete({ success: true });
                    }, 500);
                    return totalTiles;
                }
                return prev + 1;
            });
        }, 400);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <AnalysisLockOverlay />
            <AnalysisProgressPanel
                status={status}
                tilesDone={tilesDone}
                totalTiles={totalTiles}
                onCancel={onCancel}
            />
        </>
    );
};

export default AnalysisController;