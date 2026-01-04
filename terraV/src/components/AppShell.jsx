import { useState } from "react";
import TopBar from "./TopBar";
import MapCanvas from "./MapCanvas";
// import RightDockPlaceholder from "./RightDockPlaceholder";
import RegionSelector from "./RegionSelector";
import ClassControlDock from "./ClassControlDock";

const AppShell = () => {

    const [region, setRegion] = useState(null);

    return (
        <div className="h-screen w-screen flex flex-col bg-black text-white">
            <TopBar regionStatus = {region?.confirmed ? region.state : "No region selected"} />

            <div className="flex flex-1 overflow-hidden">
                <MapCanvas region={region}/>
                {/* <RightDockPlaceholder/> */}
                {region?.confirmed ? (<ClassControlDock region={region}/>) : (<RegionSelector region={region} setRegion={setRegion} />)}
            </div>
        </div>
    );
};

export default AppShell;