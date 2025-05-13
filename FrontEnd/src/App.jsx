import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyTrips from "./pages/MyTrips";
import RateCountry from "./pages/RateCountry";
import CountryPage from "./pages/CountryPage";
import LandingPage from "./pages/LandingPage";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    function useQuery() {
      const { search } = useLocation();
      return new URLSearchParams(search);
    }
  
    const query = useQuery();
  
    useEffect(() => {
      const token = query.get("id_token");
  
      if (token) {
        setIsAuthenticated(true);
      }
    }, [query]);

  return (
    <Router>
      <GlobalStyle />
      {isAuthenticated && <Navbar />}
      <MainContent>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/rate-country" element={<RateCountry />} />
              <Route path="/country/:countryName" element={<CountryPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/LandingPage" />} />
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/LandingPage" />} />
            </>
          )}
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
