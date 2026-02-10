import React, { useState } from "react";
import { addItem } from "../api";
import './AddItem.css';

const AddItem = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // Category field
  const [errors, setErrors] = useState({}); // For field-specific errors
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

    // --- Prepare item object ---
    const newItem = { name, description, price: parseFloat(price), category };

    try {
      const result = await addItem(newItem);
      setSuccess("Item added successfully!");
      onAdd(result);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
    } catch (error) {
      // Handle backend validation errors
      if (error.response && error.response.data) {
        if (typeof error.response.data === "object") {
          // Field-specific errors from backend
          setErrors(error.response.data);
        } else {
          // General runtime errors (like duplicate name)
          setErrors({ general: error.response.data });
        }
      } else {
        setErrors({ general: "Something went wrong!" });
      }
    }
  };

  return (
    <div className="container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}

        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
        {errors.description && <p style={{color:"red"}}>{errors.description}</p>}

        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
        />
        {errors.price && <p style={{color:"red"}}>{errors.price}</p>}

        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
        />
        {errors.category && <p style={{color:"red"}}>{errors.category}</p>}

        <button type="submit" className="add">Add</button>
      </form>

      {errors.general && <p style={{color:"red"}}>{errors.general}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}
    </div>
  );
};

export default AddItem;

