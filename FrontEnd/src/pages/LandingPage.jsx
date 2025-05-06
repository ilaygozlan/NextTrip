import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
`;

const Nav = styled.nav`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background: white;
    color: #3498db;
    &:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    border: 2px solid white;
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const Hero = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const Features = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

const CTA = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CTASubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CTACard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const CTACardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CTACardDescription = styled.p`
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

function LandingPage() {
  return (
    <Container>
      <Nav>
        <Logo>NextTrip</Logo>
        <NavButtons>
          <Button to="/login" className="secondary">Log In</Button>
          <Button to="/signup" className="primary">Sign Up</Button>
        </NavButtons>
      </Nav>

      <Hero>
        <Title>Discover Your Next Adventure</Title>
        <Subtitle>
          Explore countries, share experiences, and connect with fellow travelers.
          Your journey begins here.
        </Subtitle>
        <Button to="/signup" className="primary">Get Started</Button>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🗺️</FeatureIcon>
          <FeatureTitle>Explore Countries</FeatureTitle>
          <FeatureDescription>
            Discover detailed information about countries, including attractions,
            local businesses, and travel tips from experienced travelers.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⭐</FeatureIcon>
          <FeatureTitle>Share Experiences</FeatureTitle>
          <FeatureDescription>
            Rate and review countries you've visited, share your travel stories,
            and help others plan their perfect trip.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🏢</FeatureIcon>
          <FeatureTitle>Local Businesses</FeatureTitle>
          <FeatureDescription>
            Find and connect with local businesses, from restaurants to hotels,
            and discover authentic experiences in your destination.
          </FeatureDescription>
        </FeatureCard>
      </Features>

      <CTA>
        <CTATitle>Ready to Start Your Journey?</CTATitle>
        <CTASubtitle>
          Join our community of travelers and start exploring the world today.
        </CTASubtitle>
        <CTAGrid>
          <CTACard>
            <CTACardTitle>For Travelers</CTACardTitle>
            <CTACardDescription>
              Discover new destinations, read reviews, and plan your next adventure.
            </CTACardDescription>
            <Button to="/signup" className="primary">Sign Up as Traveler</Button>
          </CTACard>

          <CTACard>
            <CTACardTitle>For Businesses</CTACardTitle>
            <CTACardDescription>
              List your business, reach travelers, and grow your customer base.
            </CTACardDescription>
            <Button to="/signup" className="primary">Register Business</Button>
          </CTACard>
        </CTAGrid>
      </CTA>
    </Container>
  );
}

export default LandingPage; 