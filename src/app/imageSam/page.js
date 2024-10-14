"use client";
import React, { useState } from 'react';

const ImageUpload = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mrp, setMrp] = useState('');
  const [category, setCategory] = useState('Laptop');
  const [brand, setBrand] = useState('Apple'); // Default category
  const [description, setDescription] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image URL
    }
  };
  const handleMrpChange = (e) => setMrp(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('mrp', mrp);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/details', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload details');
      }

      const result = await response.json();
      console.log('Upload Success:', result);
      alert('Form submitted successfully!');

      // Display the submitted data
      setSubmittedData({
        name,
        image: preview,
        mrp,
        category,
        brand,
        description,
      });

      // Reset the form
      setName('');
      setImage(null);
      setPreview(null);
      setMrp('');
      setCategory('Laptop');
      setBrand('Apple');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Product Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">Image Upload</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="mt-2 rounded w-full h-auto" />
          </div>
        )}

        {/* MRP Price Field */}
        <div className="mb-4">
          <label htmlFor="mrp" className="block text-sm font-medium">MRP Price (Rs)</label>
          <input
            type="number"
            id="mrp"
            value={mrp}
            onChange={handleMrpChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium">Brand</label>
          <select
            id="brand"
            value={brand}
            onChange={handleBrandChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="Laptop">Apple</option>
            <option value="Phone">Sumsung</option>
            <option value="Phone">Sony</option>
            <option value="Phone">Nikon</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
          Submit
        </button>
      </form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Submitted Details</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>MRP:</strong> {submittedData.mrp} Rs</p>
          <p><strong>Category:</strong> {submittedData.category}</p>
          <p><strong>Brand:</strong> {submittedData.brand}</p>
          <p><strong>Description:</strong> {submittedData.description}</p>
          {submittedData.image && <img src={submittedData.image} alt="Uploaded" className="mt-2 rounded w-full h-auto" />}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
