import RegionPreviewOverlay from "./RegionPreviewOverlay";

const MapCanvas = ({region}) =>{
    return (
        <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
            <p className="text-gray-50">Map Canvas</p>

            {region?.boundary && (
                <RegionPreviewOverlay confirmed={region.confirmed}/>
            )}
        </div>
    ); 
};

export default MapCanvas;