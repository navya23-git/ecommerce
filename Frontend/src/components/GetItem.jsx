import React, { useState } from "react";
import { getItemById } from "../api";

const GetItem = ({ displayItem }) => {
    const [id, setId] = useState("");

    const handleGet = async () => {
        if (!id) return alert("Enter ID");
        try {
            const res = await getItemById(id);
            displayItem([res.data]);
        } catch (err) {
            console.error(err);
            alert("Item not found");
        }
    };

    return (
        <div>
            <h2>Get Item by ID</h2>
            <input type="number" placeholder="Enter ID" value={id} onChange={e => setId(e.target.value)} />
            <button onClick={handleGet}>Get Item</button>
        </div>
    );
};

export default GetItem;
