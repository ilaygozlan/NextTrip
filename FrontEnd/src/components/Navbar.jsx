import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  &:hover {
    color: #3498db;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #fde8e8;
  }
`;

function Navbar(props) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    props.setAuthentication(false);
    setUser(null);
    navigate("/LandingPage");
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">NextTrip</Logo>
        <NavLinks>
           <NavLink to="/">Home</NavLink>
          {user.userType === "admin" ? (
            
            <NavLink to="/admin">Admin Page</NavLink>
          ) : user.userType === "business" ? (
            <NavLink to="/my-businesses">My Businesses</NavLink>
          ) : (
            <>
              <NavLink to="/my-trips">My Trips</NavLink>
              <NavLink to="/trip-recommendation">AI - Trip Generator</NavLink>
            </>
          )}
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
