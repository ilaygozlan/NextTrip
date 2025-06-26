import React, { useState } from "react";
import styled from "styled-components";
import geoData from "../features.json";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ListBox = styled.div`
  flex: 1;
  min-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const AdminPage = () => {
  const [country, setCountry] = useState("");
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const countryNames = geoData.objects.world.geometries.map(
    (geo) => geo.properties.name
  );

  const fetchData = async () => {
    if (!country) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://6bmdup2xzi.execute-api.us-east-1.amazonaws.com/prod/GetAdminCountryData?countryName=${country}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      
      setUsers(data.users || []);
      setBusinesses(data.businesses || []);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      toast.error("Failed to load data for this country");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Admin Country Overview</Title>
      <InputRow>
        <input
          list="countries"
          placeholder="Select country..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <datalist id="countries">
          {countryNames.map((name, i) => (
            <option key={i} value={name} />
          ))}
        </datalist>
        <button onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </InputRow>

      <ListContainer>
        <ListBox>
          <h3>Users Who Visited</h3>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul>
              {users.map((u, i) => (
                <li key={i}>{u.Email}</li>
              ))}
            </ul>
          )}
        </ListBox>

        <ListBox>
          <h3>Businesses in Country</h3>
          {businesses.length === 0 ? (
            <p>No businesses found.</p>
          ) : (
            <ul>
              {businesses.map((b, i) => (
                <li key={i}>{b.name}</li>
              ))}
            </ul>
          )}
        </ListBox>
      </ListContainer>
    </Container>
  );
};

export default AdminPage;
