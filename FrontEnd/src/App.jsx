import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyTrips from './pages/MyTrips';
import RateCountry from './pages/RateCountry';
import CountryPage from './pages/CountryPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f8f9fa;
    color: #2c3e50;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
`;

const MainContent = styled.main`
  min-height: calc(100vh - 64px);
  padding: 2rem 0;
`;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <GlobalStyle />
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <MainContent>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Home /> : <LandingPage />
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/" /> : <Signup onLogin={handleLogin} />
          } />
          <Route path="/my-trips" element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          } />
          <Route path="/rate-country" element={
            <ProtectedRoute>
              <RateCountry />
            </ProtectedRoute>
          } />
          <Route path="/country/:countryName" element={
            <ProtectedRoute>
              <CountryPage />
            </ProtectedRoute>
          } />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
