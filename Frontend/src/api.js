// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/items";

export const getAllItems = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

export const addItem = async (item) => {
  const res = await axios.post(`${API_URL}/add`, item);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateItem = async (id, item) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

// ✅ Add this function for SearchItem
export const getItemById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};





