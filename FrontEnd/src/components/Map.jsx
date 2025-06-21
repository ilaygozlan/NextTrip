import React, { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoMercator } from "d3-geo";
import geoData from "../features.json";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import AddTripForm from "../pages/AddTripForm";
import AddBusinessForm from "../components/AddBusinessForm";

const MapComponent = ({ visitedCountries, setVisitedCountries }) => {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [pendingCountry, setPendingCountry] = useState(null);
  const [businessCountries, setBusinessCountries] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const projection = geoMercator()
    .scale(160)
    .translate([900 / 2, 700 / 2]);

  const handleClick = (geo) => {
    if (selected?.geo?.id === geo.id) {
      setSelected(null);
    } else {
      const centroid = geoCentroid(geo);
      const projected = projection(centroid);
      setSelected({ geo, coordinates: centroid, screenPosition: projected });
    }
  };

  const promptTripForm = () => {
    const countryName = selected.geo.properties.name;
    const countryId = selected.geo.id;

    if (!(visitedCountries || []).includes(countryName)) {
      setPendingCountry({ name: countryName, id: countryId });
      if (user.userType === "business") {
        setShowBusinessForm(true);
      } else {
        setShowForm(true);
      }
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

      await markCountryVisited();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save trip:", err);
      alert("Could not save trip. Please try again.");
    }
  };

  const handleAddBusiness = async (businessData) => {
    try {
      const response = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/AddBusinessToCountry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            countryName: pendingCountry.name,
            business: businessData,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      markCountryVisited();
      setShowBusinessForm(false);
    } catch (err) {
      console.error("Failed to save business:", err);
      alert("Could not save business. Please try again.");
    }
  };

  const markCountryVisited = async () => {
    setSelected(null);
    setPendingCountry(null);

    if (user.userType === "business") {
      setBusinessCountries((prev) => [...prev, pendingCountry.name]);
    }
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
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowBusinessForm(false);
    setPendingCountry(null);
  };

  const goToCountryPage = () => {
    navigate(`/country/${selected.geo.properties.name}`);
  };

  if (!user?.Email) {
    return (
      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        Loading user data...
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code = geo.properties.name;
              const isVisited = (visitedCountries || []).includes(code);
              const isBusinessAdded =
                user.userType === "business" &&
                businessCountries.includes(code);

              // Determine fill color
              const fillColor = isBusinessAdded
                ? "#ff9800"
                : isVisited
                ? "#66bb6a"
                : "#D6D6DA";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      fill: fillColor,
                      outline: "none",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: isBusinessAdded
                        ? "#fb8c00"
                        : isVisited
                        ? "#388e3c"
                        : "#3f51b5",
                      outline: "none",
                    },
                    pressed: {
                      fill: isBusinessAdded
                        ? "#ef6c00"
                        : isVisited
                        ? "#2e7d32"
                        : "#3f51b5",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {selected && selected.screenPosition && (
        <div
          style={{
            position: "absolute",
            left: `${selected.screenPosition[0]}px`,
            top: `${selected.screenPosition[1]}px`,
            transform: "translate(-50%, -100%)",
            background: "white",
            border: "1px solid #333",
            borderRadius: "6px",
            padding: "8px",
            fontSize: "12px",
            width: "140px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{selected.geo.properties.name}</strong>
            <span
              onClick={() => setSelected(null)}
              style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
            >
              ×
            </span>
          </div>
          {!(visitedCountries || []).includes(selected.geo.properties.name) &&
          !(businessCountries || []).includes(selected.geo.properties.name) ? (
            <button
              onClick={promptTripForm}
              style={{
                marginTop: "6px",
                fontSize: "11px",
                padding: "4px 6px",
                background:
                  user.userType === "business" ? "#ff9800" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              {user.userType === "business"
                ? "Add Business"
                : "Mark as Visited"}
            </button>
          ) : (
            <p style={{ color: "green", fontSize: "11px", marginTop: "6px" }}>
              {user.userType === "business"
                ? "Business already added"
                : "Already visited"}
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
      )}

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
            <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {pendingCountry.name}
            </h1>
            <AddTripForm
              initialData={null}
              onSubmit={handleAddTrip}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {showBusinessForm && pendingCountry && (
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
            <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {pendingCountry.name}
            </h1>
            <AddBusinessForm
              onSubmit={handleAddBusiness}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
