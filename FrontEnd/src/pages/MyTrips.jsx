import React, { useState } from 'react';
import styled from 'styled-components';
import AddTripForm from './AddTripForm'; 

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

  const fetchUserTrips = async (email) => {
  try {
    const res = await fetch(`https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/getUserTrips?email=${email}`);
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch trips:", data);
      return;
    }

    console.log("User trips:", data);
   
  } catch (err) {
    console.error("Error:", err);
  }
};



  const handleAddTrip = (newTrip) => {
    console.log('Trip added:', newTrip);
    setShowForm(false);
    // To fully implement, update the trip list dynamically from state
  };

  return (
    <Container>
      <Header>
        <Title>My Trips</Title>
        <Subtitle>View and manage your travel experiences and ratings</Subtitle>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add New Trip'}
        </Button>
      </Header>

      {showForm && <AddTripForm onSubmit={handleAddTrip} />}

      <TripGrid>
        {trips.map((trip, index) => (
          <TripCard key={index}>
            <CountryName>{trip.country}</CountryName>
            <TripDetails>
              <div>Date: {trip.date}</div>
              <div>{trip.notes}</div>
            </TripDetails>
            <Rating>
              <span>★</span>
              <span>{trip.rating}/5</span>
            </Rating>
          </TripCard>
        ))}
      </TripGrid>
    </Container>
  );
}

export default MyTrips;
