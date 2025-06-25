import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import AddBusinessForm from "../components/AddBusinessForm";
import MapLoading from "../components/Loader";
import { toast } from "react-toastify";

const BusinessGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  margin-top: 2rem;
  margin-left: 1rem;
  padding-bottom: 1rem;
`;

const BusinessCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex: 0 0 400px;
  position: relative;
  padding-top: 1.5rem; /* extra space for the X button */
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
  padding: 1rem;
`;

const BusinessName = styled.h3`
  margin: 0;
  color: #2c3e50;
`;

const BusinessType = styled.p`
  margin: 0.3rem 0;
  color: #7f8c8d;
  font-weight: bold;
`;

const BusinessDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const BusinessContact = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.5rem;
`;

const DeleteXButton = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 1rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.delete ? "#e74c3c" : "#3498db")};
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => (props.delete ? "#c0392b" : "#2980b9")};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

function MyBusinesses({ setVisitedCountries }) {
  const { user } = useUser();
  const [businesses, setBusinesses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [discountPopupIndex, setDiscountPopupIndex] = useState(null);
  const [discountData, setDiscountData] = useState({
    percent: "",
    message: "",
  });

  const fetchBusinesses = async () => {
    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetUserBusinesses?email=${user.Email}`
      );
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
    }
  };

  useEffect(() => {
    if (user?.Email) fetchBusinesses();
  }, [user]);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this business?"
    );
    if (!confirmed) return;

    const businessId = businesses[index].id;
    const countryName = businesses[index].countryName;

    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/DeleteBusiness`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: businessId, countryName }),
        }
      );

      if (!res.ok) throw new Error("Failed to delete");
          toast.success("Business deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
      const updated = businesses.filter((_, i) => i !== index);
      setBusinesses(updated);
      setVisitedCountries((prev) =>
        prev.filter((c) => c !== countryName)
      );
    } catch (err) {
      console.error("Error deleting business:", err);
          toast.error("Failed to delete business.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
    }
  };

  const handleSave = async (index, updated) => {
    const original = businesses[index];
    const updatedBusiness = { ...original, ...updated };

    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/UpdateBusiness`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBusiness),
        }
      );

      if (!res.ok) throw new Error("Failed to update");
      const copy = [...businesses];
      copy[index] = updatedBusiness;
      setBusinesses(copy);
      setEditIndex(null);
      
    toast.success("Business updated successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
    } catch (err) {
      console.error("Error updating business:", err);
         toast.error("Failed to update business.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
    }
  };

  const sendDiscount = async (businessId, countryName) => {
    try {
      console.log(
        businessId,
        countryName,
        discountData.percent,
        discountData.message
      );
      const response = await fetch(
        "https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/SendDiscount",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            countryName,
            businessId,
            percent: discountData.percent,
            message: discountData.message,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send discount");

      alert("Discount sent successfully!");
      setDiscountPopupIndex(null);
      setDiscountData({ percent: "", message: "" });
    } catch (err) {
      console.error("Error sending discount:", err);
      alert("Failed to send discount.");
    }
  };

    if(businesses.length == 0)
    return( <MapLoading massage={"Loading your businesses..."}/>);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>My Businesses</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
          color: "#555",
        }}
      >
        On this page, you can manage all the businesses you've added — edit
        their details, delete them if needed, or send special discounts to users
        who follow your business.
      </p>
      <BusinessGrid>
        {businesses.map((business, index) => (
          <BusinessCard key={business.id}>
            <DeleteXButton onClick={() => handleDelete(index)}>X</DeleteXButton>
            <BusinessImage image={business.imageLink} />
            <BusinessContent>
              <BusinessName>{business.name}</BusinessName>
              <BusinessType>{business.type}</BusinessType>
              <BusinessDescription>{business.description}</BusinessDescription>
              <BusinessContact>
                <div>📍 {business.address}</div>
                <div>📞 {business.phone}</div>
                <div>✉️ {business.email}</div>
                <div>🌐 {business.website}</div>
                <div>🕒 {business.openingHours}</div>
              </BusinessContact>
            </BusinessContent>
            <ButtonGroup>
              <Button onClick={() => handleEdit(index)}>Edit ✏️</Button>
              <Button onClick={() => setDiscountPopupIndex(index)}>
                Send Discount 📢
              </Button>
            </ButtonGroup>
          </BusinessCard>
        ))}
      </BusinessGrid>

      {editIndex !== null && (
        <ModalOverlay>
          <ModalContent>
            <AddBusinessForm
              initialData={businesses[editIndex]}
              onCancel={() => setEditIndex(null)}
              onSubmit={(updated) => handleSave(editIndex, updated)}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {discountPopupIndex !== null && (
        <ModalOverlay>
          <ModalContent>
            <h3>Send Discount</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const biz = businesses[discountPopupIndex];
                await sendDiscount(biz.id, biz.countryName);
              }}
            >
              <label>Discount (%):</label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={discountData.percent}
                onChange={(e) =>
                  setDiscountData({ ...discountData, percent: e.target.value })
                }
                style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
              />
              <label>Message:</label>
              <textarea
                required
                value={discountData.message}
                onChange={(e) =>
                  setDiscountData({ ...discountData, message: e.target.value })
                }
                style={{ width: "100%", padding: "8px", height: "100px" }}
              />
              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <Button type="submit">Send</Button>
                <Button
                  onClick={() => {
                    setDiscountPopupIndex(null);
                    setDiscountData({ percent: "", message: "" });
                  }}
                  delete
                >
                  Cancel
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

export default MyBusinesses;
