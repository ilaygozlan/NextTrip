import React from 'react';
import styled from 'styled-components';

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
  // This is a placeholder for actual trip data
  const trips = [
    { country: 'France', rating: 4.5, date: '2023-05-15', notes: 'Beautiful architecture and amazing food' },
    { country: 'Japan', rating: 5, date: '2023-08-22', notes: 'Incredible culture and hospitality' },
    { country: 'Italy', rating: 4.8, date: '2023-10-05', notes: 'Perfect blend of history and cuisine' },
  ];

  return (
    <Container>
      <Header>
        <Title>My Trips</Title>
        <Subtitle>View and manage your travel experiences and ratings</Subtitle>
      </Header>
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
