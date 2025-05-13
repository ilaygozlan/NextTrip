import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import MyTrips from "../pages/MyTrips";
import RateCountry from "../pages/RateCountry";
import CountryPage from "../pages/CountryPage";
import LandingPage from "../pages/LandingPage";
import config from "../config";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.search || window.location.hash.split("?")[1]
    );
    const code = urlParams.get("code");

    if (code) {
      console.log("Authorization code:", code);
      const url = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret:
          "1hphf4hi8ljs6qtcnjkeijthha3bqai7bas1s909vk0m046t1scd",
        redirect_uri: config.redirectUri,
        code: code,
      }).toString();
      console.log(url);
      const exchangeCodeForTokens = async () => {
        console.log(142)
        try {
            console.log("ff")
          const url = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: config.clientId,
            client_secret:
              "1hphf4hi8ljs6qtcnjkeijthha3bqai7bas1s909vk0m046t1scd",
            redirect_uri: config.redirectUri,
            code: code,
          }).toString();
          console.log(url);

          const response = await fetch(`${config.domain}/oauth2/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: url,
          });

          const data = await response.json();
          console.log("Token response:", data);

          if (data.id_token) {
            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("access_token", data.access_token);
            setIsAuthenticated(true);

            // Decode the id_token to get user email
            const base64Url = data.id_token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(
                  (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
            );
            const decoded = JSON.parse(jsonPayload);
            console.log("User email:", decoded.email); // 👈 Here’s the email!
          } else {
            console.error("No ID token received.");
          }
        } catch (err) {
          console.error("Failed to exchange code for tokens:", err);
        }
      };

      exchangeCodeForTokens();
    }
  }, []);

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
