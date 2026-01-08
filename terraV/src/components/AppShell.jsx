import { useState } from "react";
import TopBar from "./TopBar";
import MapCanvas from "./MapCanvas";
// import RightDockPlaceholder from "./RightDockPlaceholder";
import RegionSelector from "./RegionSelector";
import ClassControlDock from "./ClassControlDock";
import AnalysisController from "./AnalysisContoller";
import HistoryDrawer from "./HistoryDrawer"

const AppShell = () => {

    const [region, setRegion] = useState(null);
    const [analysisRequest, setAnalysisRequest] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [history, setHistory] = useState([]);


    const handleAnalysisComplete = (result) => {
        const historyItem = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            region,
            classes: analysisRequest.classes,
            analysisResult: result,
            source: "cached",
        };

        setHistory((prev) => [historyItem, ...prev]);
        setAnalysisResult(result);
        setAnalysisRequest(null);
    };

    const reloadFromHistory = (item) => {
        setRegion(item.region);
        setAnalysisResult(item.analysisResult);
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-black text-white">
            <TopBar regionStatus={region?.confirmed ? region.state : "No region selected"} />

            <HistoryDrawer
            history={history}
            onReload={reloadFromHistory}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <MapCanvas region={region} 
                analysisResult={analysisRequest}/>
                {/* <RightDockPlaceholder/> */}

                {region?.confirmed ? (<ClassControlDock region={region} onRun={setAnalysisRequest} />) : (<RegionSelector region={region} setRegion={setRegion} />)}

                {analysisRequest && (
                    <AnalysisController
                        analysisRequest={analysisRequest}
                        onComplete={handleAnalysisComplete}
                        onCancel={() => setAnalysisRequest(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default AppShell;