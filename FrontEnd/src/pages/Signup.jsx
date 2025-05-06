import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#3498db'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#2980b9' : '#f7f9fc'};
  }
`;

function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userType, setUserType] = useState('traveler');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Here you would typically make an API call to create the account
    // For now, we'll just simulate a successful signup
    if (formData.name && formData.email && formData.password) {
      onLogin();
      navigate('/');
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <FormContainer>
        <Title>Create Account</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <UserTypeToggle>
          <ToggleButton
            type="button"
            active={userType === 'traveler'}
            onClick={() => setUserType('traveler')}
          >
            Traveler
          </ToggleButton>
          <ToggleButton
            type="button"
            active={userType === 'business'}
            onClick={() => setUserType('business')}
          >
            Business
          </ToggleButton>
        </UserTypeToggle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">{userType === 'business' ? 'Business Name' : 'Full Name'}</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={userType === 'business' ? 'Enter business name' : 'Enter your full name'}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
        <LoginLink>
          Already have an account? <Link to="/login">Log in</Link>
        </LoginLink>
      </FormContainer>
    </Container>
  );
}

export default Signup; 