"use client";
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [details, setDetails] = useState([]);

  // Fetch the product data from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/details');
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <header className="bg-purple-700 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to Electro Bid Hub</h1>
        <p className="mt-4 text-lg">Discover high-profit margin electronic items!</p>
        <button className="mt-6 bg-white text-purple-700 font-semibold py-2 px-4 rounded">
          Shop Now
        </button>
      </header>

      {/* Product Showcase */}
      <main className="py-10 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Products</h2>
        {details.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {details.map((detail, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Assuming detail.imagePath is the URL to the image */}
                {detail.imagePath && (
                  <img
                    src={`http://localhost:5000/${detail.imagePath}`}
                    alt={detail.name}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{detail.name}</h3>
                  <p className="text-lg text-purple-700 font-bold">{detail.mrp} Rs</p>
                  <button className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 text-white text-center py-4">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
