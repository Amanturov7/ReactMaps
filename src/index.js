import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tabs, Tab } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { scaleLinear } from "d3-scale";
import mapData1 from "./mapData.json";
import mapData2 from "./mapData1.json";
import mapData3 from "./mapData2.json";
import area1 from "./area1.json";
import area2 from "./area2.json";
import area3 from "./area3.json";
import area4 from "./area4.json";
import area5 from "./area5.json";
import area6 from "./area6.json";
import area7 from "./area7.json";

// Импортируйте другие JSON-файлы для каждой области

const MapComponent = ({ mapData, colorScale, onRegionClick }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (geo) => {
    setHovered(geo.properties.name_ru);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (geo) => {
    if (onRegionClick) {
      onRegionClick(geo.properties.name_ru);
    }
  };

  return (
    <div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 3200, center: [75, 39.7] }}
      >
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(geo)}
                style={{
                  default: {
                    fill: colorScale(geo.properties.fid),
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none"
                  },
                  hover: {
                    fill: "#1E90FF",
                    stroke: "#ffc101",
                    strokeWidth: 0.75,
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {hovered && (
        <div
          className="tooltip-custom"
          style={{
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10
          }}
        >
          {hovered}
        </div>
      )}
    </div>
  );
};

const RegionMapComponent = ({ areaData, colorScaleRegion, projectionConfig, onRegionClick }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (geo) => {
    setHovered(geo.properties.name);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  // const handleClick = (geo) => {
  //   if (onRegionClick) {
  //     onRegionClick(geo.properties.name);
  //   }
  // };
  return (
    
    <div>
        {!areaData && (
        <div className="notification">
          <h4>Выберите область для просмотра районов</h4>
        </div>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
      >
        <Geographies geography={areaData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                // onClick={() => onRegionClick(geo.properties.name_ru)}
                style={{
                  default: {
                    fill: colorScaleRegion(geo.properties.Color_id),
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none"
                  },
                  hover: {
                    fill: "#1E90FF",
                    stroke: "#ffc101",
                    strokeWidth: 0.75,
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
        
      </ComposableMap>
      {hovered && (
        <div
          className="tooltip-custom"
          style={{
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10
          }}
        >
          {hovered}
        </div>
      )}
      <button className="return-button" onClick={() => onRegionClick(null)}>Вернуться к областям</button>    </div>
    
  );
};

const App = () => {
  const projectionConfigs = {
    'Чуйская область': { scale: 8000, center: [74, 41.8] },
    'Ошская область': { scale: 7000, center: [73, 39.5] },
    'Нарынская область': { scale: 6500, center: [75, 40.6]  },
    'Баткенская область': {scale: 7000, center: [71, 39]  },
    'Джалал-Абадская область': { scale: 7000, center: [72, 41]  },
    'Таласская область': { scale: 8500, center: [72, 42]  },
    'Иссык-Кульская область': { scale: 7000, center: [78, 41.3]  },
  };
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const colorScale = scaleLinear()
  .domain([1,2,3,4,5,6,7,8,9,10])
  .range(["#87ceeb", "#3cb371", "#da70d6", "#ffe4c4","#7a67ee","#00bfff","#4eee94","#cd2626","#ff83fa","#ffa500"]);


    const colorScaleRegion = scaleLinear()
  .domain([1,2,3,4,5,6,7,8,9,10])
  .range(["#87ceeb", "#3cb371", "#da70d6", "#ffe4c4","#7a67ee","#00bfff","#4eee94","#cd2626","#ff83fa","#ffa500"]);

  return (
    <div>
      <h1>Карта Кыргызстана</h1>
      
      <Tabs defaultActiveKey="map1">
        <Tab eventKey="map1" title="Область">
          <MapComponent
            mapData={mapData1}
            colorScale={colorScale}
            
          />
      
        </Tab>
        <Tab eventKey="map2" title="Бассейн">
          <MapComponent mapData={mapData2} colorScale={colorScale} />
        </Tab>




        <Tab eventKey="map3" title="Район">

        {!selectedRegion && (
            <div className="notification">
              <h4>Выберите область для просмотра районов</h4>
            </div>
          )}
      {selectedRegion ? (
            <RegionMapComponent
            areaData={
              selectedRegion === "Чуйская область"
                ? area1
                : selectedRegion === "Ошская область"
                ? area2
                : selectedRegion === "Баткенская область"
                ? area3
                : selectedRegion === "Джалал-Абадская область"
                ? area4
                : selectedRegion === "Нарынская область"
                ? area5
                : selectedRegion === "Таласская область"
                ? area6
                : selectedRegion === "Иссык-Кульская область"
                ? area7
                : null
            }
            colorScaleRegion={colorScaleRegion}
              onRegionClick={handleRegionClick}
              projectionConfig={projectionConfigs[selectedRegion]}
            />
          ) : (
            <MapComponent mapData={mapData3} colorScale={colorScale} onRegionClick={handleRegionClick} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
