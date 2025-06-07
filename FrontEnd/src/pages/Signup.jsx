import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import config from "../config";
import Login from "./Login";
<<<<<<< HEAD

=======
import { useUser } from "../contexts/UserContext";
>>>>>>> Adi

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  padding: 2rem;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContinueButton = styled.button`
  background: rgb(249, 191, 97); /* צבע כתום */
<<<<<<< HEAD
  background: rgb(249, 191, 97); /* צבע כתום */
=======
>>>>>>> Adi
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 2rem auto 0 auto; /* מרכז את הכפתור */

  &:hover {
    background: rgb(213, 141, 77);
<<<<<<< HEAD
    background: rgb(213, 141, 77);
=======
>>>>>>> Adi
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 1rem;
`;

const UserTypeToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #3498db;
  background: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#3498db")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#f7f9fc")};
  }
`;

<<<<<<< HEAD
function Signup(props) {
=======
function Signup() {
  const [userType, setUserType] = useState("traveler");
  const { setUser } = useUser();

  const handleContinue = () => {
    setUser((prev) => ({ ...prev, type: userType }));
    Login();
  };
>>>>>>> Adi

  return (
    <Container>
      <FormContainer>
        <Title>Next Trip</Title>
        <UserTypeToggle>
          <ToggleButton
            type="button"
<<<<<<< HEAD
            active={props.userType === "traveler"}
            onClick={() => {
              props.setUserType("traveler");
               console.log(props.userType);
=======
            active={userType === "traveler"}
            onClick={() => {
              setUserType("traveler");
              console.log("userType:", "traveler");
>>>>>>> Adi
            }}
          >
            Traveler
          </ToggleButton>
          <ToggleButton
            type="button"
<<<<<<< HEAD
            active={props.userType === "business"}
            onClick={() => {
              props.setUserType("business");
              console.log(props.userType);
=======
            active={userType === "business"}
            onClick={() => {
              setUserType("business");
              console.log("userType:", "business");
>>>>>>> Adi
            }}
          >
            Business
          </ToggleButton>
        </UserTypeToggle>
<<<<<<< HEAD
        <ContinueButton type="button" onClick={()=>{Login()}}>
        <ContinueButton type="button" onClick={()=>{Login()}}>
=======
        <ContinueButton type="button" onClick={handleContinue}>
>>>>>>> Adi
          Continue
        </ContinueButton>
      </FormContainer>
    </Container>
  );
}

export default Signup;
