import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  text-align: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff5722, #ff9800);
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const TripCard = styled.div`
  background: #1e1e2f;
  color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`;

const BusinessCard = styled.div`
  background: #2a2a3d;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 0 10px #00000030;
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const TripRecommendationPage = ({ userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [saved, setSaved] = useState(false);

  const generateTrip = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const response = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/RecommendTrip?email=${userEmail}`
      );
      const data = await response.json();
      setRecommendations(data || []);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    try {
      await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/SaveRecommendedTrip`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            savedTrip: recommendations,
            timestamp: Date.now(),
          }),
        }
      );
      setSaved(true);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };

  return (
    <Container>
      <h1>🌍 Your Futuristic Travel Plan ✨</h1>
      <Button onClick={generateTrip} disabled={loading}>
        {loading ? "Generating..." : "Generate My Dream Trip"}
      </Button>

      {recommendations.map((rec, i) => (
        <TripCard key={i}>
          <h2>{rec.country}</h2>
          <p>Recommendation Score: {rec.score}</p>
          <h3>Must-Visit Places:</h3>
          {rec.topBusinesses.map((biz, idx) => (
            <BusinessCard key={idx}>
              <span>{biz.name}</span>
              <span>⭐ {biz.score}</span>
            </BusinessCard>
          ))}
        </TripCard>
      ))}

      {recommendations.length > 0 && !saved && (
        <SaveButton onClick={saveTrip}>Save This Trip</SaveButton>
      )}

      {saved && <p style={{ color: "#4caf50", marginTop: "1rem" }}>Trip saved successfully! ✔️</p>}
    </Container>
  );
};

export default TripRecommendationPage;
