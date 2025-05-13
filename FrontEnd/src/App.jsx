import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import AppRoutes from "../src/components/AppRoutes"; // 👈 We'll create this next

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
  return (
    <Router>
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
}

export default App;
