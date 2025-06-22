// components/MapLoading.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGlobeAmericas, FaMapMarkerAlt } from "react-icons/fa";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const GlobeWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
`;

const RotatingGlobe = styled.div`
  font-size: 60px;
  animation: ${spin} 4s linear infinite;
  color: #1976d2;
`;

const bounce = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-8px); }
`;

const Marker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  color: #ff9800;
  animation: ${bounce} 1.5s infinite;
`;
const LoadingText = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #555;
`;

const MapLoading = () => (
  <LoaderWrapper>
    <GlobeWrapper>
      <RotatingGlobe>
        <FaGlobeAmericas />
      </RotatingGlobe>
      <Marker>
        <FaMapMarkerAlt />
      </Marker>
    </GlobeWrapper>
    <LoadingText>Exploring new destinations for you...</LoadingText>
  </LoaderWrapper>
);

export default MapLoading;
