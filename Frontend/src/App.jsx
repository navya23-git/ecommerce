import React, { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import SearchAll from "./components/SearchAll";
import { getAllItems } from "./api";
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(""); // "add", "search", "all"
  const [items, setItems] = useState([]);

  // Fetch all items on initial load
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data); // replace array to avoid duplicates
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>My E-Commerce App</h1>
      </header>

      {/* ===== Top Buttons ===== */}
      <div className="top-buttons">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Item
        </button>
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          Search by ID
        </button>
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={async () => {
            setActiveTab("all");
            try {
              const data = await getAllItems();
              setItems(data); // replace array to avoid duplicates
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Search All
        </button>
      </div>

      {/* ===== Tab Content ===== */}
      <div className="tab-content">
        {activeTab === "add" && (
          <AddItem
            onAdd={(newItem) =>
              setItems((prevItems) => [newItem, ...prevItems])
            }
          />
        )}
        {activeTab === "search" && (
          <SearchItem
            setItems={(result) =>
              setItems(result) // replace with searched item
            }
          />
        )}
        {activeTab === "all" && <SearchAll items={items} setItems={setItems} />}
      </div>
    </div>
  );
}

export default App;
















