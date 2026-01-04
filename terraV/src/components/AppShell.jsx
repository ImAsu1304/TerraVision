import { useState } from "react";
import TopBar from "./TopBar";
import MapCanvas from "./MapCanvas";
// import RightDockPlaceholder from "./RightDockPlaceholder";
import RegionSelector from "./RegionSelector";
import ClassControlDock from "./ClassControlDock";
import AnalysisController from "./AnalysisContoller";

const AppShell = () => {

    const [region, setRegion] = useState(null);
    const [analysisRequest, setAnalysisRequest] = useState(null)

    return (
        <div className="h-screen w-screen flex flex-col bg-black text-white">
            <TopBar regionStatus = {region?.confirmed ? region.state : "No region selected"} />

            <div className="flex flex-1 overflow-hidden">
                <MapCanvas region={region}/>
                {/* <RightDockPlaceholder/> */}
                
                {region?.confirmed ? (<ClassControlDock region={region} onRun={setAnalysisRequest} />) : (<RegionSelector region={region} setRegion={setRegion} />)}

                {analysisRequest && (
                    <AnalysisController
                    analysisRequest={analysisRequest}
                    onComplete={() => setAnalysisRequest(null)}
                    onCancel={() => setAnalysisRequest(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default AppShell;