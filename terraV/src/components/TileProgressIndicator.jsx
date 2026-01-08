const TileProgressIndicator = ({ tilesDone, totalTiles }) => {
    return (
        <div className="w-full">
            <progress 
                value={tilesDone} 
                max={totalTiles} 
                className="w-full h-2 accent-blue-600 bg-gray-800"
            />
            <p className="mt-2 text-sm text-gray-400">
                Processing tiles: {tilesDone}/{totalTiles}
            </p>
        </div>
    );
};


// const TileProgressIndicator = ({tilesDone, totalTiles}) => {
//     const percent = Math.round((tilesDone / totalTiles) * 100)

//     return (
//         <div>
//             <div className="h-2 bg-gray-800 mb-2">
//             <div
//             className="h-2 bg-blue-600"
//             style={{width: `${percent}%`}}
//             />
//             </div>
//             <p>
//                 Processing tiles: {tilesDone}/{totalTiles}
//             </p>
//         </div>
//     );
// };

export default TileProgressIndicator;