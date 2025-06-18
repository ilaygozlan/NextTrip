import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTripForm from "./AddTripForm";
import { useUser } from "../contexts/UserContext";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const TripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TripCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CountryName = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const TripDetails = styled.div`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f1c40f;
  font-weight: 500;
`;

function MyTrips() {
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const { user } = useUser();

  const fetchUserTrips = async (email) => {
    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/getUserTrips?email=${email}`
      );
      const data = await res.json();
      setTrips(data);
      if (!res.ok) {
        console.error("Failed to fetch trips:", data);
        return;
      }

      console.log("User trips:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    if (user?.Email) {
      fetchUserTrips(user.Email);
    }
  }, [user]);

  const handleAddTrip = async (newTrip) => {
    if (!user?.Email) {
      alert("User not logged in");
      return;
    }

    const tripWithEmail = {
      ...newTrip,
      userEmail: user.Email, // Attach user's email
    };

    try {
      const response = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/PostUserTrip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripWithEmail),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add trip:", errorData);
        alert("Failed to save trip. Please try again.");
        return;
      }

      const savedTrip = await response.json();
      console.log("Trip added:", savedTrip);

      // Update state
      setTrips((prev) => [...prev, savedTrip]);
      setShowForm(false);
    } catch (err) {
      console.error("Error adding trip:", err);
      alert("An error occurred while saving the trip.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>My Trips</Title>
        <Subtitle>View and manage your travel experiences and ratings</Subtitle>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add New Trip"}
        </Button>
      </Header>

      {showForm && <AddTripForm onSubmit={handleAddTrip} />}

      <TripGrid>
        {trips.map((trip, index) => (
          <TripCard key={index}>
            <CountryName>{trip.country}</CountryName>

            <TripDetails>
              <div>
                <strong>Travel Type:</strong> {trip.travelType}
              </div>
              <div>
                <strong>Dates:</strong> {trip.startDate} - {trip.endDate}
              </div>
              <div>
                <strong>Rating:</strong> <Rating>★ {trip.rating}/5</Rating>
              </div>
              {trip.highlight && (
                <div>
                  <strong>Highlight:</strong> {trip.highlight}
                </div>
              )}
              {trip.review && (
                <div>
                  <strong>Review:</strong> {trip.review}
                </div>
              )}
              {trip.tip && (
                <div>
                  <strong>Tip:</strong> {trip.tip}
                </div>
              )}
            </TripDetails>
          </TripCard>
        ))}
      </TripGrid>
    </Container>
  );
}

export default MyTrips;
