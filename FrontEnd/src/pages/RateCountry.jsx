import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Star = styled.span`
  font-size: 1.5rem;
  color: ${props => props.active ? '#f1c40f' : '#ddd'};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f1c40f;
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
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

function RateCountry() {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    country: '',
    review: '',
    tips: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, rating });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Header>
        <Title>Rate a Country</Title>
        <Subtitle>Share your travel experience and help others discover amazing destinations</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Rating</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                active={star <= rating}
                onClick={() => setRating(star)}
              >
                ★
              </Star>
            ))}
          </RatingContainer>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="review">Review</Label>
          <TextArea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Share your experience..."
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tips">Travel Tips</Label>
          <TextArea
            id="tips"
            name="tips"
            value={formData.tips}
            onChange={handleChange}
            placeholder="Share your travel tips and recommendations..."
          />
        </FormGroup>
        <Button type="submit">Submit Review</Button>
      </Form>
    </Container>
  );
}

export default RateCountry;
