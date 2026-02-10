import React, { useState } from "react";
import { updateItem } from "../api";
import './UpdateItem.css';

const UpdateItem = ({ item, onUpdate, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category || "");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // --- Frontend validations ---
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.length > 100) newErrors.name = "Name cannot exceed 100 characters";

    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.length > 500) newErrors.description = "Description cannot exceed 500 characters";

    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price) || parseFloat(price) <= 0) newErrors.price = "Price must be greater than 0";
    else if (parseFloat(price) > 10000) newErrors.price = "Price cannot exceed 10,000";

    if (!category.trim()) newErrors.category = "Category is required";
    else if (category.length > 50) newErrors.category = "Category cannot exceed 50 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedItem = { name, description, price: parseFloat(price), category };

    try {
      const result = await updateItem(item.id, updatedItem);
      onUpdate(result);
      setSuccess("Item updated successfully!");
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === "object") {
          setErrors(err.response.data); // Backend validation errors
        } else {
          setErrors({ general: err.response.data }); // Runtime error
        }
      } else {
        setErrors({ general: "Failed to update item" });
      }
    }
  };

  return (
    <div className="update-item-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}

        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        {errors.description && <p style={{color:"red"}}>{errors.description}</p>}

        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
        />
        {errors.price && <p style={{color:"red"}}>{errors.price}</p>}

        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
        />
        {errors.category && <p style={{color:"red"}}>{errors.category}</p>}

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      </form>

      {errors.general && <p style={{color:"red"}}>{errors.general}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}
    </div>
  );
};

export default UpdateItem;
