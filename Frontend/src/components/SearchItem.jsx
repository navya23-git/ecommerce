// src/components/SearchItem.jsx
import React, { useState } from "react";
import { getItemById } from "../api";
import ItemList from "./ItemList";
import './SearchItem.css';

const SearchItem = ({ setItems }) => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult([]);
    
    if (!id || parseInt(id) <= 0) {
      setError("Please enter a valid ID (greater than 0)");
      return;
    }

    setLoading(true);
    try {
      const item = await getItemById(id);
      if (item) {
        setResult([item]); // wrap in array to reuse ItemList
      } else {
        setError("Item not found");
      }
    } catch (err) {
      console.error("Error fetching item:", err);
      if (err.response && err.response.status === 404) {
        setError("Item not found");
      } else {
        setError("Failed to fetch item from server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Search Item by ID</h2>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="Enter Item ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="update" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <ItemList items={result} setItems={setItems} />
        </div>
      )}
    </div>
  );
};

export default SearchItem;







