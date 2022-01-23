import React from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "../styles/Map.css";
import { showDataOnMap } from "../util/util";

const Map = ({ center, zoom, countries, casesType = "cases" }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
