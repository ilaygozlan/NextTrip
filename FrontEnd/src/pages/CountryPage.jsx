import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  padding: 3rem 2rem;
  border-radius: 8px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
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
  color: ${(props) => (props.active ? "#f1c40f" : "#ddd")};
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
  align-self: flex-start;

  &:hover {
    background: #2980b9;
  }
`;

const ReviewsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewItem = styled.li`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const ReviewRating = styled.div`
  color: #f1c40f;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ReviewText = styled.p`
  color: #2c3e50;
  line-height: 1.6;
`;

const CountryInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

const InfoTitle = styled.h3`
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.p`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  padding: 0.75rem 1.5rem;
  border: 2px solid #3498db;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#f8f9fa")};
  }
`;

const BusinessForm = styled(Form)`
  max-width: 800px;
  margin: 0 auto;
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const BusinessList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BusinessCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BusinessImage = styled.div`
  height: 180px;
  border-radius: 12px;
  margin: 10px;
  background-image: url(${(props) => props.image});
  background-size: contain;  
  background-repeat: no-repeat;
  background-position: center;
`;

const BusinessContent = styled.div`
  padding: 1.5rem;
`;

const BusinessName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const BusinessType = styled.span`
  color: #3498db;
  font-size: 0.9rem;
  font-weight: 500;
`;

const BusinessDescription = styled.p`
  color: #7f8c8d;
  margin: 1rem 0;
  line-height: 1.6;
`;

const BusinessContact = styled.div`
  color: #2c3e50;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const LikeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.liked ? "#e74c3c" : "#ccc")};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const CountryPage = () => {
  const { countryName } = useParams();
  const { user } = useUser();
  const [isBusinessView, setIsBusinessView] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [likedBusinesses, setLikedBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    review: "",
    tips: "",
  });
  const [rating, setRating] = useState(0);
  const [businessFormData, setBusinessFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    openingHours: "",
    image: null,
  });

  const fetchCountryReviews = async () => {
    try {
      const response = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetCountryReviews?countryName=${encodeURIComponent(
          countryName
        )}`
      );

      const data = await response.json();
      setReviews(data.reviews || []);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reviews");
      }

      console.log("Reviews:", data.reviews);
      return data.reviews;
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
    fetchCountryReviews();
    setIsBusinessView(user.userType === "business");
    if (user?.Email) fetchLikedBusinesses();
  }, [countryName]);

  const handleBusinessChange = (e) => {
    setBusinessFormData({
      ...businessFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.review && rating > 0) {
      const newReview = {
        userName: user.name,
        countryName: countryName,
        rating: rating,
        review: formData.review,
        tips: formData.tips,
      };

      try {
        const response = await fetch(
          "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/AddCountryReview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to submit review:", data);
          alert("Error: " + (data.message || "Failed to submit review"));
          return;
        }

        // Update frontend state
        setReviews([...reviews, { ...formData, rating }]);
        setFormData({ review: "", tips: "" });
        setRating(0);

        alert("Review submitted successfully!");
      } catch (err) {
        console.error("Error submitting review:", err);
        alert("Error submitting review. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessFormData((prevData) => ({
        ...prevData,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // This would typically come from an API
  const countryData = {
    averageRating: 4.5,
    totalReviews: 128,
    popularAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    bestTimeToVisit: "April - June",
    currency: "Euro (€)",
    language: "French",
  };


  const getCountryBusinesses = async (countryName) => {
    try {
      const response = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetCountryBusinesses?countryName=${encodeURIComponent(
          countryName
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch businesses");
      }

      setBusinesses(data.businesses);
    } catch (err) {
      console.error("Fetch businesses error:", err);
      return [];
    }
  };

  useEffect(() => {
    getCountryBusinesses(countryName);
  }, [countryName]);

  const fetchLikedBusinesses = async () => {
    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetUserLikedBusinesses?email=${user.Email}`
      );
      const data = await res.json();
      if (Array.isArray(data.likes)) {
        setLikedBusinesses(data.likes);
      }
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };

  const toggleLike = async (businessId) => {
    try {
      const isLiked = likedBusinesses.includes(businessId);
      const method = isLiked ? "DELETE" : "POST";
      const endpoint = isLiked ? "RemoveBusinessLike" : "LikeBusiness";

      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/${endpoint}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.Email, businessId: businessId, countryName: countryName }),
        }
      );
      console.log("Parsed data:",  user.Email , businessId, countryName );

      if (res.ok) {
        setLikedBusinesses((prev) =>
          isLiked
            ? prev.filter((id) => id !== businessId)
            : [...prev, businessId]
        );
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>{countryName}</Title>
        <Subtitle>Discover the beauty and culture of {countryName}</Subtitle>
      </Header>

      {!isBusinessView ? (
        // Regular user view
        <>
          <ContentGrid>
            <Section>
              <SectionTitle>Share Your Experience</SectionTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Your Review</Label>
                  <TextArea
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Share your experience..."
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Travel Tips</Label>
                  <TextArea
                    name="tips"
                    value={formData.tips}
                    onChange={handleChange}
                    placeholder="Share your travel tips and recommendations..."
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
                <Button type="submit">Submit Review</Button>
              </Form>
            </Section>

            <Section>
              <SectionTitle>Country Information</SectionTitle>
              <CountryInfo>
                <InfoCard>
                  <InfoTitle>Average Rating</InfoTitle>
                  <InfoValue>{countryData.averageRating}/5</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoTitle>Total Reviews</InfoTitle>
                  <InfoValue>{countryData.totalReviews}</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoTitle>Best Time to Visit</InfoTitle>
                  <InfoValue>{countryData.bestTimeToVisit}</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoTitle>Currency</InfoTitle>
                  <InfoValue>{countryData.currency}</InfoValue>
                </InfoCard>
              </CountryInfo>
            </Section>
          </ContentGrid>

          <Section style={{ marginTop: "2rem" }}>
            <SectionTitle>Local Businesses</SectionTitle>
            <BusinessList>
              {businesses.map((business) => (
                <BusinessCard key={business.id}>
                  <BusinessImage image={business.imageLink} />
                  <BusinessContent>
                    <BusinessName>{business.name}</BusinessName>
                    {!isBusinessView && (
                      <LikeButton
                        liked={likedBusinesses.includes(business.id)}
                        onClick={() => toggleLike(business.id)}
                      >
                        ♥
                      </LikeButton>
                    )}
                    <BusinessType>{business.type}</BusinessType>
                    <BusinessDescription>
                      {business.description}
                    </BusinessDescription>
                    <BusinessContact>
                      <div>📍 {business.address}</div>
                      <div>📞 {business.phone}</div>
                      <div>✉️ {business.email}</div>
                      <div>🌐 {business.website}</div>
                      <div>🕒 {business.openingHours}</div>
                    </BusinessContact>
                  </BusinessContent>
                </BusinessCard>
              ))}
            </BusinessList>
          </Section>

          <Section style={{ marginTop: "2rem" }}>
            <SectionTitle>Recent Reviews</SectionTitle>
            <ReviewsList>
              {reviews.map((review, idx) => (
                <ReviewItem key={idx}>
                  <ReviewText>{review.userName}</ReviewText>
                  <ReviewRating>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </ReviewRating>
                  <ReviewText>{review.review}</ReviewText>
                  {review.tips && (
                    <>
                      <InfoTitle style={{ marginTop: "1rem" }}>
                        Travel Tips
                      </InfoTitle>
                      <ReviewText>{review.tips}</ReviewText>
                    </>
                  )}
                </ReviewItem>
              ))}
            </ReviewsList>
          </Section>
        </>
      ) : (
        // Business registration view
        <>
          <Section style={{ marginTop: "2rem" }}>
            <SectionTitle>Local Businesses </SectionTitle>
            <BusinessList>
              {businesses.map((business) => (
                <BusinessCard key={business.id}>
                  <BusinessImage image={business.imageLink} />
                  <BusinessContent>
                    <BusinessName>{business.name}</BusinessName>
                    <BusinessType>{business.type}</BusinessType>
                    <BusinessDescription>
                      {business.description}
                    </BusinessDescription>
                    <BusinessContact>
                      <div>📍 {business.address}</div>
                      <div>📞 {business.phone}</div>
                      <div>✉️ {business.email}</div>
                      <div>🌐 {business.website}</div>
                      <div>🕒 {business.openingHours}</div>
                    </BusinessContact>
                  </BusinessContent>
                </BusinessCard>
              ))}
            </BusinessList>
          </Section>
        </>
      )}
    </Container>
  );
};

export default CountryPage;
