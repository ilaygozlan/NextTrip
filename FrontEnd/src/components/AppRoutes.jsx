import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import MyTrips from "../pages/MyTrips";
import RateCountry from "../pages/RateCountry";
import CountryPage from "../pages/CountryPage";
import LandingPage from "../pages/LandingPage";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    console.log(code)
    if (code) {
      setIsAuthenticated(true);
    }
  }, [location]);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main style={{ minHeight: "calc(100vh - 64px)", padding: "2rem 0" }}>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/rate-country" element={<RateCountry />} />
              <Route path="/country/:countryName" element={<CountryPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/LandingPage" />} />
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/LandingPage" />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
