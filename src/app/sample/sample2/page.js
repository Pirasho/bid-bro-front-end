"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

const Home = () => {
  const router = useRouter(); // Initialize the Next.js router

  const handleRegisterClick = () => {
    // Navigate to the /auth/register page
    router.push('/auth/register');
  };

  const handleSignInClick = () => {
    // Navigate to the /auth/signin page
    router.push('/auth/signin');
  };

  // Sample data for products
  const products = [
    { id: 1, name: 'Smartphone Pro', price: '999 RS', image: '/images/New-i.jpg' },
    { id: 2, name: 'Ultra HD Smart TV', price: '1,200 RS', image: '/images/tab.jpg' },
    { id: 3, name: 'High-Performance Laptop', price: '1,500 RS', image: '/images/hp.jpg' },
    { id: 4, name: 'Noise Cancelling Headphones', price: '$300', image: '/images/headphone.jpg' },
    { id: 5, name: '4K Action Camera', price: '$450', image: '/images/camera.jpg' },
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white">
        {/* Sign In / Register Links */}
        <div className="absolute top-4 right-4 flex space-x-4 z-20">
          <button onClick={handleSignInClick} className="text-white font-bold hover:underline">Sign In</button>
          <button onClick={handleRegisterClick} className="text-white font-bold hover:underline">Register</button>
        </div>

        <div className="absolute inset-0 opacity-50">
          <img src="/images/fr.jpg" alt="Hero Background" className="object-cover w-full h-full" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[600px] text-center">
          <h1 className="text-5xl font-bold">Unveil the Future of Electronics</h1>
          <p className="mt-4 text-lg">Explore our exclusive Summer Collection of cutting-edge electronics at unbeatable prices!</p>
          <button className="mt-6 bg-white text-purple-700 font-semibold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </header>

      {/* Product Categories */}
<section className="py-10 px-4 text-center">
  <h2 className="text-3xl font-semibold mb-6">Categories</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* SmartPhones Category */}
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src="/images/ic.jpg" alt="SmartPhones" className="w-full h-49 object-cover mb-4" />
      <h3 className="font-semibold text-xl">SmartPhones</h3>
    </div>

    {/* Laptops Category */}
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src="/images/hp.jpg" alt="Laptops" className="w-full h-49 object-cover mb-4" />
      <h3 className="font-semibold text-xl">Laptops</h3>
    </div>

    {/* Cameras Category */}
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src="/images/camera.jpg" alt="Cameras" className="w-full h-49 object-cover mb-4" />
      <h3 className="font-semibold text-xl">Cameras</h3>
    </div>

    {/* HeadPhones Category */}
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src="/images/headphone.jpg" alt="HeadPhones" className="w-full h-50 object-cover mb-4" />
      <h3 className="font-semibold text-xl">HeadPhones</h3>
    </div>
  </div>
</section>


      {/* Product Categories - Companies Section */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">Top Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Apple */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img src="/images/apple.webp" alt="Apple" className="w-full h-49 object-cover mb-4" />
            <h3 className="font-semibold">Apple</h3>
          </div>
          {/* Other brands */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img src="/images/samsung.webp" alt="Apple" className="w-full h-49 object-cover mb-4" />
            <h3 className="font-semibold">samsung</h3>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <img src="/images/hp.jpg" alt="Apple" className="w-full h-49 object-cover mb-4" />
            <h3 className="font-semibold">Hp</h3>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <img src="/images/sony.jpg" alt="Apple" className="w-full h-49 object-cover mb-4" />
            <h3 className="font-semibold">Sony</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg text-purple-700 font-bold">{product.price}</p>
                <button className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
