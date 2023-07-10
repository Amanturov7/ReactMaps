import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import mapData from "./mapData.json";
const MapComponent = () => {
  return (
    <div>
      <ComposableMap>
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} 
              />
              
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
