import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import MyTrips from "../pages/MyTrips";
import RateCountry from "../pages/RateCountry";
import CountryPage from "../pages/CountryPage";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import config from "../config";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("traveler");

  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.search || window.location.hash.split("?")[1]
    );
    const code = urlParams.get("code");

    if (code) {
      console.log("Authorization code1:", code);

      const exchangeCodeForTokens = async () => {
        try {
          const getTokenUrl = `${config.domain}/oauth2/token`;
          console.log(getTokenUrl);
          const response = await fetch(getTokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: config.clientId,
              client_secret: config.clientSecret,
              redirect_uri: config.redirectUri,
              code: code,
            }).toString(),
          });

          const data = await response.json();
          console.log("Token response:", data);

          if (data.id_token) {
            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("access_token", data.access_token);
            setIsAuthenticated(true);

            // Decode the id_token to get user email + name
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
            console.log("User email:", decoded.email);
            setUser(decoded.name);
            console.log("User name:", decoded.name);

            // Optionally fetch user details from your protected Lambda API
            const fetchUserDetails = async () => {
              try {
                const idToken = localStorage.getItem("id_token");
                const response = await fetch(
                  "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetUserData",
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${idToken}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error(`HTTP ${response.status}`);
                }

                const userData = await response.json();
                console.log("User from Lambda:", userData);

                // If you want to use that instead of decoded token:
                // setUser(userData.user.name || userData.user.email);
              } catch (err) {
                console.error("Error fetching user details from Lambda:", err);
              }
            };

            fetchUserDetails(); 
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
              <Route path="/" element={<Home userName={user} userType={userType}/>} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/rate-country" element={<RateCountry />} />
              <Route path="/country/:countryName" element={<CountryPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/LandingPage" />} />
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="/signup" element={<Signup userType={userType} setUserType={setUserType}/>} />
              <Route path="*" element={<Navigate to="/LandingPage" />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
