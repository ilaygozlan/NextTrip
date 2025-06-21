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
  margin-right: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  color: #e74c3c;
  border: none;
  font-size: 1.2rem;
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;
`;

const TripGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

const TripCard = styled.div`
  position: relative;
  flex: 0 0 400px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

function MyTrips() {
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
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
      }
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
      userEmail: user.Email,
      tripId: Date.now(),
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
      setTrips((prev) => [...prev, savedTrip.trip]);
      setShowForm(false);
    } catch (err) {
      console.error("Error adding trip:", err);
      alert("An error occurred while saving the trip.");
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleSaveEdit = async (index, updatedTrip) => {
    try {
      const fullTrip = {
        ...updatedTrip,
        userEmail: user.Email,
        tripId: trips[index].tripId,
      };

      const res = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/UpdateUserTrip",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullTrip),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const newTrips = [...trips];
      newTrips[index] = fullTrip;
      setTrips(newTrips);
      setEditIndex(null);
    } catch (err) {
      console.error("Error updating trip:", err);
      alert("Failed to update trip.");
    }
  };

  const handleDeleteTrip = async (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmed) return;

    const tripId = trips[index].tripId;

    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/DeleteUserTrip`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.Email, tripId }),
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      const newTrips = trips.filter((_, i) => i !== index);
      setTrips(newTrips);
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Failed to delete trip.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>My Trips</Title>
        <Subtitle>View and manage your travel experiences and ratings</Subtitle>
      </Header>

      <TripGrid>
        {trips.map((trip, index) => (
          <TripCard key={index}>
            <DeleteButton onClick={() => handleDeleteTrip(index)}>×</DeleteButton>
            <CountryName>{trip.country}</CountryName>
            <TripDetails>
              <div><strong>Travel Type:</strong> {trip.travelType}</div>
              <div><strong>Dates:</strong> {trip.startDate} - {trip.endDate}</div>
              <div><strong>Rating:</strong> <Rating>★ {trip.rating}/5</Rating></div>
              {trip.highlight && <div><strong>Highlight:</strong> {trip.highlight}</div>}
              {trip.review && <div><strong>Review:</strong> {trip.review}</div>}
              {trip.tip && <div><strong>Tip:</strong> {trip.tip}</div>}
            </TripDetails>
            <Button onClick={() => handleEditClick(index)}>Edit Trip ✏️</Button>
          </TripCard>
        ))}
      </TripGrid>

      {editIndex !== null && (
        <ModalOverlay>
          <ModalContent>
            <AddTripForm
              initialData={trips[editIndex]}
              onCancel={handleCancelEdit}
              onSubmit={(updated) => handleSaveEdit(editIndex, updated)}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default MyTrips;