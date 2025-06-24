import React, { useEffect } from "react";
import styled from "styled-components";
import MapComponent from "../components/Map";
import { useUser } from "../contexts/UserContext";


const HeroTraveler = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #43cea2, #3498db);
  color: white;
  margin-bottom: 2rem;
`;

const HeroBusiness = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f39c12, #d35400);
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

function Home(props) {
  const { user } = useUser();

  return (
    <>
      {user?.userType === "business" ? (
        <HeroBusiness>
          <Title>
            Welcome to NextTrip{user?.name ? `, ${user.name}` : ""}!
          </Title>
          <Subtitle>
            Promote your business to global travelers. Add your services, track
            engagement, and reach new customers around the world.
          </Subtitle>
        </HeroBusiness>
      ) : (
        <HeroTraveler>
          <Title>
            Welcome to NextTrip{user?.name ? `, ${user.name}` : ""}!
          </Title>
          <Subtitle>
            Discover the world, one country at a time. Click on countries you've
            visited to mark them and start planning your next adventure.
          </Subtitle>
        </HeroTraveler>
      )}

      <MapContainer>
        <MapComponent
          visitedCountries={user.visitedCountries}
          setVisitedCountries={props.setVisitedCountries}
        />
      </MapContainer>
    </>
  );
}

export default Home;
