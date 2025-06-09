import React, { useEffect } from 'react';
import styled from 'styled-components';
import MapComponent from '../components/Map';
import { useUser } from '../contexts/UserContext';

const Hero = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Home() {
  const { user } = useUser();

  useEffect(() => {
    const postUserType = async () => {
      try {
        const response = await fetch("https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/setUserType", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user?.email,
            userType: user?.type,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update user type: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('User type updated successfully:', data);
      } catch (error) {
        console.error('Error updating user type:', error);
      }
    };

    if (user?.email && user?.type) {
      postUserType();
    }
  }, [user]);

  return (
    <>
      <Hero>
        <Title>Welcome to NextTrip{user?.name ? `, ${user.name}` : ''}!</Title>
        <Subtitle>
          Discover the world, one country at a time. Click on countries you've visited to mark them and start planning your next adventure.
        </Subtitle>
      </Hero>
      <MapContainer>
        <MapComponent />
      </MapContainer>
    </>
  );
}

export default Home;
