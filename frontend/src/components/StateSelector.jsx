import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import geoData from "../assets/indiaStates.geo.json";

const StateSelector = ({ selectedState, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Get list of states
    const states = geoData.features.map(feature => feature.properties.ST_NM).sort();

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (state) => {
        onSelect(state);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col m-2" ref={dropdownRef}>
            <p className="mb-2 text-amber-500 font-medium text-sm uppercase tracking-wider">
                Select State
            </p>

            {/* The "Select Box" Trigger */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-2 flex items-center justify-between bg-gray-950 text-stone-100 border-2 border-blue-500 outline-none transition-colors ${isOpen ? "border-blue-400" : ""
                        }`}
                >
                    <span className="truncate">
                        {selectedState || "No State Selected"}
                    </span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-xs ml-2 text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {/* The Custom Dropdown List */}
                {isOpen && (
                    <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-gray-900 border border-gray-700 scrollbar-hide">

                        {/* State Options */}
                        {states.map((state) => (
                            <li
                                key={state}
                                onClick={() => handleSelect(state)}
                                className={`px-4 py-2 cursor-pointer text-sm truncate transition-colors
                                    ${selectedState === state
                                        ? "bg-blue-900/40 text-blue-300"
                                        : "text-stone-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                title={state} // Tooltip for full name if truncated
                            >
                                {state}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <p className="mt-3 text-xs text-stone-500">
                Classes: <span className="text-stone-400">Vegetation, Water, Build Area, Bare Ground, Snow</span>
            </p>
            <p className="mt-1 text-xs text-stone-500">
                Region: <span className="text-stone-300 font-mono">{selectedState || "—"}</span>
            </p>
        </div>
    );
};

export default StateSelector;