import React, { useState } from "react";
import UpdateItem from "./UpdateItem";
import { deleteItem } from "../api";
import './ItemList.css';

const ItemList = ({ items, setItems }) => {
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async (id) => {
    setError(""); setSuccess("");
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
      setSuccess("Item deleted successfully!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Failed to delete item.");
      }
    }
  };

  return (
    <div>
      {error && <p style={{color:"red"}}>{error}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}

      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            {editingId === item.id ? (
              <UpdateItem
                item={item}
                onUpdate={(updated) => {
                  setItems(items.map((i) => (i.id === updated.id ? updated : i)));
                  setEditingId(null);
                  setSuccess("Item updated successfully!");
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <h2>ID: {item.id}</h2>
                <h3>Name: {item.name}</h3>
                <p>Description: {item.description}</p>
                <p>Category: {item.category}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <div>
                  <button className="update" onClick={() => setEditingId(item.id)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;





