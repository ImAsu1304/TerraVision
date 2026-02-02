import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import indiaStates from "../assets/indiaStates.geo.json";

const ResizeHandler = () => {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(map.getContainer());

    return () => {
      observer.disconnect();
    };
  }, [map]);

  return null;
};

const MapUpdater = ({ selectedState }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedState) {
      map.setView([20.5937, 78.9629], 5);
      return;
    }

    const feature = indiaStates.features.find(
      f => f.properties.ST_NM === selectedState
    );
    if (!feature) return;

    const coords =
      feature.geometry.type === "Polygon"
        ? feature.geometry.coordinates.flat(1)
        : feature.geometry.coordinates.flat(2);

    map.fitBounds(
      coords.map(([lng, lat]) => [lat, lng]),
      { padding: [30, 30], maxZoom: 8 }
    );
  }, [selectedState, map]);

  return null;
};

const PostAnalysisZoomLock = ({ enabled, selectedState }) => {
  const map = useMap();

  useEffect(() => {
    if (!enabled) return;

    map.setMinZoom(7);
    map.setMaxZoom(14);

    if (selectedState === "Telangana") {
      map.setView([17.9, 79.1], 13, { animate: true });
    } else {
      map.setZoom(13);
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 400);

  }, [enabled, map, selectedState]);

  return null;
};

const MapPanes = () => {
  const map = useMap();

  useEffect(() => {
    if (!map.getPane("basePane")) {
      map.createPane("basePane");
      map.getPane("basePane").style.zIndex = 200;
    }

    if (!map.getPane("mlPane")) {
      map.createPane("mlPane");
      map.getPane("mlPane").style.zIndex = 650;
      map.getPane("mlPane").style.pointerEvents = "none";
    }
  }, [map]);

  return null;
};

const MapCanvas = ({ selectedState, mapData, analysisDone }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const tileUrl = "https://imasu1304.github.io/Storage/tiles/telangana/{z}/{x}/{y}.png";

  useEffect(() => {
    if (analysisDone) {
      setShowSuccess(true);
    }
  }, [analysisDone]);

  return (
    <div className="flex-1 h-full bg-black relative">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        minZoom={3}
        maxZoom={18}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeHandler />
        <MapPanes />
        <MapUpdater selectedState={selectedState} />

        <TileLayer
          pane="basePane"
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        />

        {analysisDone && (
          <TileLayer
            pane="mlPane"
            url={tileUrl}
            tileSize={256}
            opacity={1}
            tms={true}
          />
        )}

        {selectedState && !analysisDone && (
          <GeoJSON
            key={selectedState}
            data={indiaStates.features.find(f => f.properties.ST_NM === selectedState)}
            style={{ color: "#00ffff", weight: 2, fillOpacity: 0 }}
          />
        )}

        {analysisDone && (
          <PostAnalysisZoomLock 
            enabled={analysisDone} 
            selectedState={selectedState} 
          />
        )}
      </MapContainer>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1000] md:hidden">
          <div className="w-80 p-6 bg-gray-900 border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] rounded-xl pointer-events-auto text-center">
            <h3 className="text-green-500 font-bold mb-2 uppercase tracking-widest">Analysis Complete</h3>
            <p className="text-gray-300 text-sm mb-4">
              Satellite data processed. Zoom in to explore high-resolution analysis results.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg text-xs transition-colors"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapCanvas;