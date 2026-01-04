import {  useEffect, useState } from "react";
import StateSelector from "./StateSelector";
import BoundarySelector from "./BoundarySelector";
import RegionConfirmBar from "./RegionConfirmBar";

const RegionSelector = ({ region, setRegion }) => {

    const [selectedState, setSelectedState] = useState(null);
    const [boundary, setBoundary] = useState(null);

    useEffect(() => {
        if (selectedState || boundary) {
            setRegion({
                state: selectedState,
                boundary: boundary,
                confirmed: false 
            });
        }
    }, [selectedState, boundary]);

    const confirmRegion = () => {
        setRegion({
            state: selectedState,
            boundary,
            confirmed: true,
        });
    };

    const resetRegion = () => {
        setSelectedState(null);
        setBoundary(null);
        setRegion(null);
    };

    return (
        <div className="w-80 border-l border-gray-800 bg-gray-950 p-4 space-y-4">
            <StateSelector
                selectedState={selectedState}
                onSelect={setSelectedState}
            />

            {selectedState && (
                <BoundarySelector boundary={boundary} setBoundary={setBoundary} />
            )}

            {selectedState && boundary && (
                <RegionConfirmBar
                    onConfirm={confirmRegion}
                    onReset={resetRegion}
                />
            )}
        </div>
    );
};

export default RegionSelector;