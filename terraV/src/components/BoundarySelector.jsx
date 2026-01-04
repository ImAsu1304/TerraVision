const BoundarySelector = ({boundary, setBoundary}) => {
    return (
        <div>
            <p className="text-sm text-gray-400 mb-2">Define Area Boundary</p>

            <button className="w-full border border-gray-700 p-2 text-sm hover:bg-gray-800" onClick={() =>
                setBoundary({
                    type: "bbox",
                    coords: [78.2, 17.3, 78.6, 17.6] // mock coords
                })
            }>
                Draw Boundary (Mock)
            </button>

            {boundary && (
                <p className="text-xs text-green-400 mt-2">Boundary Selected</p>
            )}
        </div>
    );
};

export default BoundarySelector;