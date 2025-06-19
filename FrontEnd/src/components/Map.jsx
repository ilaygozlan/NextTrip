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
import AddTripForm from "../pages/AddTripForm";

const MapComponent = ({ visitedCountries, setVisitedCountries }) => {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [pendingCountry, setPendingCountry] = useState(null);
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

  const promptTripForm = () => {
    const countryName = selected.geo.properties.name;
    const countryId = selected.geo.id;

    if (!visitedCountries.includes(countryName)) {
      setPendingCountry({ name: countryName, id: countryId });
      setShowForm(true);
    }
  };

  const handleAddTrip = async (tripData) => {
    const fullTrip = {
      ...tripData,
      userEmail: user.Email,
      country: pendingCountry.name,
      tripId: Date.now(),
    };

    try {
      const response = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/PostUserTrip",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullTrip),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setVisitedCountries((prev) => [...prev, pendingCountry.name]);

      await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/AddUserCounrty",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.Email,
            newCountry: pendingCountry.name,
          }),
        }
      );

      setShowForm(false);
      setPendingCountry(null);
      setSelected(null);
    } catch (err) {
      console.error("Failed to save trip:", err);
      alert("Could not save trip. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setPendingCountry(null);
  };

  const goToCountryPage = () => {
    navigate(`/country/${selected.geo.properties.name}`);
  };

  if (!user?.Email) {
    return (
      <div
        style={{ textAlign: "center", paddingTop: "40px", fontSize: "18px" }}
      >
        Loading user data...
      </div>
    );
  }

  return (
    <div>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code = geo.properties.name;
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

                {!visitedCountries.includes(selected.geo.properties.name) ? (
                  <button
                    onClick={promptTripForm}
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

      {/* Trip Form Popup */}
      {showForm && pendingCountry && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "2rem",
              maxWidth: "700px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>
              Add a Trip to {pendingCountry.name}
            </h3>
            <AddTripForm
              initialData={{ country: pendingCountry.name }}
              onSubmit={handleAddTrip}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
