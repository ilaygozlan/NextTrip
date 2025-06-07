import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import geoData from "../features.json";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const MapComponent = () => {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClick = (geo) => {
    if (selected?.geo?.id === geo.id) {
      setSelected(null);
    } else {
      const centroid = geoCentroid(geo);
      setSelected({ geo, coordinates: centroid });
    }
  };

  const markAsVisited = async () => {
    const code = selected.geo.id;
    const countryName = selected.geo.properties.name;
   if (!visitedCountries.includes(code)) {
      setVisitedCountries([...visitedCountries, code]);
      try {
        const response = await fetch("https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/AddUserCounrty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            newCountry: countryName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to update country:", data);
          alert("Error: " + data.message);
        } else {
          console.log("Successfully updated:", data);
        }
      } catch (err) {
        console.error("Request failed:", err);
        alert("An error occurred while marking the country.");
      }
    }
  };

  const goToCountryPage = () => {
    navigate(`/country/${selected.geo.properties.name}`);
  };

  return (
    <div>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code = geo.id;
              const isVisited = visitedCountries.includes(code);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      fill: isVisited ? "#66bb6a" : "#D6D6DA",
                      outline: "none",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: isVisited ? "#388e3c" : "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: isVisited ? "#2e7d32" : "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {selected && selected.coordinates && (
          <Marker coordinates={selected.coordinates}>
            <foreignObject x={-60} y={-60} width={150} height={100}>
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  background: "white",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  padding: "8px",
                  fontSize: "12px",
                  width: "120px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{selected.geo.properties.name}</strong>
                  <span
                    onClick={() => setSelected(null)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    ×
                  </span>
                </div>

                {!visitedCountries.includes(selected.geo.id) ? (
                  <button
                    onClick={markAsVisited}
                    style={{
                      marginTop: "6px",
                      fontSize: "11px",
                      padding: "4px 6px",
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Mark as Visited
                  </button>
                ) : (
                  <p
                    style={{
                      color: "green",
                      fontSize: "11px",
                      marginTop: "6px",
                    }}
                  >
                    Already visited
                  </p>
                )}
                <button
                  onClick={goToCountryPage}
                  style={{
                    marginTop: "6px",
                    fontSize: "11px",
                    padding: "4px 6px",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            </foreignObject>
          </Marker>
        )}
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
