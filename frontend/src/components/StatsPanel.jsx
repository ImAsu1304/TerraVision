import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const StatsPanel = ({ stats, onClick }) => {

    const classes = [
        { name: "Vegetation", color: "bg-green-600", key: "vegetation" },
        { name: "Water", color: "bg-blue-600", key: "water" },
        { name: "Build Area", color: "bg-red-600", key: "build_area" },
        { name: "Bare Ground", color: "bg-yellow-500", key: "bare_ground" },
        { name: "Snow", color: "bg-white", key: "snow" },
    ];

    const totalArea = stats?.totalArea || 0;

    return (
        <div className="flex h-full bg-gray-950 border-2 border-gray-800 rounded-lg text-white">

            <button className="h-full border border-gray-800 mr-2" onClick={onClick}>
                <div>
                    <FontAwesomeIcon icon={faAnglesRight} className='p-2' />
                </div>
            </button>

            <div className='flex flex-col p-4'>

            <div className="border-b border-gray-800 pb-9">
                <h2 className="text-lg font-bold tracking-tight text-blue-400 uppercase pb-2">
                    Land Cover Distribution
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                    Total Area: <span className="text-white font-mono">{totalArea} km²</span>
                </p>
            </div>

            <div className="grid gap-3">
                {classes.map((cls) => {
                    const classArea = stats?.breakdown?.[cls.key] || 0;
                    const percentage = totalArea > 0 ? (classArea / totalArea) * 100 : 0;
                    
                    return (
                        <div key={cls.name} className="bg-gray-900/50 p-3 rounded border border-gray-800">

                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    {/* Color Indicator Box */}
                                    <div className={`w-3 h-3 rounded-sm ${cls.color}`} />
                                    <span className="text-sm font-medium">{cls.name}</span>
                                </div>

                                <span className="text-xs font-mono text-gray-300">
                                    {classArea} km²
                                </span>
                            </div>

                            {/* Logic-ready Percentage Bar */}
                            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${cls.color} transition-all duration-1000`}
                                    style={{ width: `${percentage}%` }}
                                    />
                            </div>

                            <p className="text-[10px] text-right mt-1 text-gray-500">
                                {percentage.toFixed(1)}%
                            </p>
                        </div>
                    );
                })}
            </div>
            {/*  */}
            </div>
        </div>
    );
};

export default StatsPanel;