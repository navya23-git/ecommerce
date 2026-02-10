// src/components/SearchAll.jsx
import React from "react";
import ItemList from "./ItemList";
import './SearchAll.css';

const SearchAll = ({ items, setItems }) => {
  return (
    <div className="container">
      <h2>All Items</h2>
      {items.length > 0 ? (
        <ItemList items={items} setItems={setItems} />
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default SearchAll;
