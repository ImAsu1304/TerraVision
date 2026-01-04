const RegionPreviewOverlay = ({confirmed}) => {
    return  (
        <div className={`absolute inset-20 border-2 ${confirmed ? "border-green-500" : "border-yellow-400"} pointer-events-none`}>
            <p className="absolute top-1 left-1 text-xs text-white">
                {confirmed ? "Region Confirmed" : "Region Preview"}
            </p>
        </div>
    );
};

export default RegionPreviewOverlay;