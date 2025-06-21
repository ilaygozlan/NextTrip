import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

const FormWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  font-size: 1.5rem;
  border: none;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
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

const AddBusinessForm = ({ onSubmit, onCancel, initialData = null }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      imageLink: "",
      address: "",
      phone: "",
      website: "",
      openingHours: "",
      type: "Restaurant",
      description: "",
      userEmail: user?.Email,
    }
  );
  const [isImageLinkValid, setIsImageLinkValid] = useState(false);

  useEffect(() => {
    if (formData.imageLink) {
      setIsImageLinkValid(isValidImageLink(formData.imageLink));
    }
  }, [formData.imageLink]);

  const isValidImageLink = (url) => {
    return (
      typeof url === "string" &&
      /^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(url)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <Title>{initialData ? "Edit Business" : "Add New Business"}</Title>

          {formData.imageLink && isImageLinkValid && (
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <img
                src={formData.imageLink}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  height: "250px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <FormGroup>
            <Label>Business Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>Image Link</Label>
            <Input
              type="url"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Website</Label>
            <Input name="website" value={formData.website} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Opening Hours</Label>
            <Input name="openingHours" value={formData.openingHours} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Type</Label>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="Restaurant">Restaurant</option>
              <option value="Hotel">Hotel</option>
              <option value="Tour">Tour</option>
              <option value="Shop">Shop</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea name="description" value={formData.description} onChange={handleChange} />
          </FormGroup>

          <Button type="submit">{initialData ? "Save Changes" : "Add Business"}</Button>
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              style={{ backgroundColor: "#ccc", color: "#333", marginLeft: "1rem" }}
            >
              Cancel
            </Button>
          )}
        </form>
      </FormContainer>
    </FormWrapper>
  );
};

export default AddBusinessForm;
