import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MapTooltipProps } from "../types";

const MapTooltip: React.FC<MapTooltipProps> = ({
  mapCenter,
  showMap,
  isLoaded,
}) => {
  if (!mapCenter || !showMap || !isLoaded) {
    return null;
  }
  return (
    <div className=" mt-2 w-full h-64 bg-white border border-gray-300 rounded-lg shadow-lg">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
        center={mapCenter}
        zoom={16}
      >
        <MarkerF position={mapCenter} />
      </GoogleMap>
    </div>
  );
};

export default MapTooltip;
