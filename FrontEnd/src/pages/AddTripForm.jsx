import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 80px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const AddTripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    country: '',
    startDate: '',
    endDate: '',
    review: '',
    tip: '',
    rating: '',
    highlight: '',
    travelType: 'Solo',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    alert("Trip added successfully!");
    setFormData({
      country: '',
      startDate: '',
      endDate: '',
      review: '',
      tip: '',
      rating: '',
      highlight: '',
      travelType: 'Solo',
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormTitle>Add New Trip</FormTitle>

        <FormGroup>
          <Label>Country</Label>
          <Input
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>End Date</Label>
          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Review</Label>
          <TextArea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="What did you think about this trip?"
          />
        </FormGroup>

        <FormGroup>
          <Label>Tip for Travelers</Label>
          <TextArea
            name="tip"
            value={formData.tip}
            onChange={handleChange}
            placeholder="Useful tip for future travelers"
          />
        </FormGroup>

        <FormGroup>
          <Label>Rating (0–5)</Label>
          <Input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Highlight</Label>
          <Input
            name="highlight"
            value={formData.highlight}
            onChange={handleChange}
            placeholder="Favorite moment or place"
          />
        </FormGroup>

        <FormGroup>
          <Label>Travel Type</Label>
          <Select
            name="travelType"
            value={formData.travelType}
            onChange={handleChange}
          >
            <option value="Solo">Solo</option>
            <option value="Couple">Couple</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Business">Business</option>
          </Select>
        </FormGroup>

        <Button type="submit">Add Trip</Button>
      </form>
    </FormContainer>
  );
};

export default AddTripForm;
