"use client";
import React, { useState } from 'react';
import RegisterCustomer from '../../components/RegisterCustomer'; // Adjust the import path as necessary
import SignInModal from '../../components/SignInModal1'; // Adjust the import path for the Sign In modal

const Home = () => {
  // State to control the modal visibility
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false); // State for Sign In modal

  const openRegister = () => {
    setRegisterModalOpen(true);
    setSignInModalOpen(false); // Close Sign In modal
  };

  const openSignIn = () => {
    setSignInModalOpen(true);
    setRegisterModalOpen(false); // Close Register modal
  };

  const closeModal = () => {
    setSignInModalOpen(false);
    setRegisterModalOpen(false);
  };

  // Sample data for products
  const products = [
    { id: 1, name: 'Smartphone Pro', price: '99990 RS', image: '/images/New-i.jpg' },
    { id: 2, name: 'Ultra HD Smart TV', price: '120000 RS', image: '/images/tab.jpg' },
    { id: 3, name: 'High-Performance Laptop', price: '150000 RS', image: '/images/hp.jpg' },
    { id: 4, name: 'Noise Cancelling Headphones', price: '30000 Rs', image: '/images/headphone.jpg' },
    { id: 5, name: '4K Action Camera', price: '45000 Rs', image: '/images/lap.jpg' },
    { id: 6, name: 'iPhone 14', price: '75000 Rs', image: '/images/huwa.jpg' },
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white">
        {/* Sign In / Register Links */}
        <div className="absolute top-4 right-4 flex space-x-4 z-20">
          <button onClick={openSignIn} className="text-white font-bold hover:underline">
            Sign In
          </button>
          <button onClick={openRegister} className="text-white font-bold hover:underline">
            Register
          </button>
        </div>

        <div className="absolute inset-0 opacity-50">
          <img src="/la.jpg" alt="Hero Background" className="object-cover w-full h-full" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[600px] text-center">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
          <h2 className="text-5xl font-bold">Bid Broo</h2>

          <button className="mt-6 bg-white text-purple-700 font-semibold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </header>

      {/* Featured Products */}
      <section className="py-10 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
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

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <RegisterCustomer
          isOpen={isRegisterModalOpen}
          onClose={closeModal} // Close both modals
        />
      )}

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={closeModal} // Close both modals
        />
      )}
    </div>
  );
};

export default Home;
