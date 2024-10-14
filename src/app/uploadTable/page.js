"use client";
import React, { useEffect, useState } from 'react';

const DetailsTable = () => {
  const [details, setDetails] = useState([]);

  // Fetch the details from the backend when the component loads
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/details');
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submitted Product Details</h2>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">MRP (Rs)</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Brand</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Image</th>
          </tr>
        </thead>
        <tbody>
          {details.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No details found.</td>
            </tr>
          ) : (
            details.map((detail, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{detail.name}</td>
                <td className="px-4 py-2 border">{detail.mrp} Rs</td>
                <td className="px-4 py-2 border">{detail.category}</td>
                <td className="px-4 py-2 border">{detail.brand}</td>
                <td className="px-4 py-2 border">{detail.description}</td>
                <td className="px-4 py-2 border">
                  {detail.imagePath && (
                    <img
                      src={`http://localhost:5000/${detail.imagePath}`}
                      alt="Product"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
