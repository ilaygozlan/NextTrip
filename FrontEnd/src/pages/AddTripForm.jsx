import React, { useState, useEffect } from "react";
import styled from "styled-components";
import geoData from "../features.json";

const FormWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #eee;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #ccc;
    transform: scale(1.1);
  }
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const SuggestionList = styled.ul`
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.5rem;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  z-index: 10;
  width: 100%;
`;

const SuggestionItem = styled.li`
  padding: 0.6rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f1f1f1;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Star = styled.span`
  font-size: 1.5rem;
  color: ${(props) => (props.active ? "#f1c40f" : "#ddd")};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f1c40f;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const AddTripForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      country: "",
      startDate: "",
      endDate: "",
      review: "",
      tip: "",
      rating: 0,
      highlight: "",
      travelType: "Solo",
    }
  );

  const [suggestions, setSuggestions] = useState([]);
  const [rating, setRating] = useState(formData.rating || 0);

  const countryNames = geoData.objects.world.geometries.map(
    (geo) => geo.properties.name
  );

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, country: value }));

    const matches = countryNames
      .filter((name) => name.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, 5);
    setSuggestions(matches);
  };

  const selectSuggestion = (name) => {
    setFormData((prev) => ({ ...prev, country: name }));
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <FormWrapper>
      {onCancel && <CloseButton onClick={onCancel}>×</CloseButton>}
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormTitle>{initialData ? "Edit Trip" : "Add New Trip"}</FormTitle>

          {initialData && (
            <FormGroup>
              <Label>Country</Label>
              <div
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  background: "#f9f9f9",
                }}
              >
                {formData.country}
              </div>
            </FormGroup>
          )}

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
            />
          </FormGroup>

          <FormGroup>
            <Label>Tip</Label>
            <TextArea name="tip" value={formData.tip} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Rating</Label>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  active={star <= rating}
                  onClick={() => {
                    const newRating = star === rating ? 0 : star;
                    setRating(newRating);
                    setFormData((prev) => ({
                      ...prev,
                      rating: newRating,
                    }));
                  }}
                >
                  ★
                </Star>
              ))}
            </RatingContainer>
          </FormGroup>

          <FormGroup>
            <Label>Highlight</Label>
            <Input
              name="highlight"
              value={formData.highlight}
              onChange={handleChange}
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

          <Button type="submit">
            {initialData ? "Save Changes" : "Add Trip"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              style={{
                backgroundColor: "#ccc",
                color: "#333",
                marginLeft: "1rem",
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </FormContainer>
    </FormWrapper>
  );
};

export default AddTripForm;
