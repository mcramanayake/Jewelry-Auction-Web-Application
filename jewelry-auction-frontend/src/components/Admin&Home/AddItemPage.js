// src/components/AddItemPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddItemPage.css';

const AddItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://localhost:7137/api/auction', {
        name: itemName,
        description,
        startingPrice: parseFloat(startingPrice),
      });

      setSuccessMessage('Item added successfully!');
      setItemName('');
      setDescription('');
      setStartingPrice('');
    } catch (error) {
      console.error('Error adding item:', error);
      setErrorMessage('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="add-item-page">
      <h1>Add New Auction Item</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startingPrice">Starting Price:</label>
          <input
            type="number"
            id="startingPrice"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-item-btn">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;
