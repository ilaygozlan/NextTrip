import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #27ae60;
  }
`;

const BusinessCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const MyBusinesses = () => {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    phone: "",
    email: user?.Email || "",
    website: "",
    openingHours: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBusinesses = async () => {
    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetUserBusinesses?email=${user.Email}`
      );
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    }
  };

  useEffect(() => {
    if (user?.Email) fetchBusinesses();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      countryName: "MyBusinesses",
      business: {
        ...formData,
        submittedAt: new Date().toISOString(),
      },
    };

    try {
      const res = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/AddBusinessToCountry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Business added!");
      fetchBusinesses();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting business:", err);
      alert("Failed to add business");
    }
  };

  return (
    <Container>
      <Title>My Businesses</Title>
      <ToggleButton onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Business"}
      </ToggleButton>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Business Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Type</Label>
            <Select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Hotel">Hotel</option>
              <option value="Tour">Tour</option>
              <option value="Shop">Shop</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Website</Label>
            <Input name="website" value={formData.website} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Opening Hours</Label>
            <Input
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      )}

      {businesses.map((b, i) => (
        <BusinessCard key={i}>
          <h3>{b.name}</h3>
          <p><strong>Type:</strong> {b.type}</p>
          <p>{b.description}</p>
          <p><strong>📍</strong> {b.address}</p>
          <p><strong>📞</strong> {b.phone}</p>
          <p><strong>✉️</strong> {b.email}</p>
          {b.website && <p><strong>🌐</strong> {b.website}</p>}
          <p><strong>🕒</strong> {b.openingHours}</p>
        </BusinessCard>
      ))}
    </Container>
  );
};

export default MyBusinesses;
