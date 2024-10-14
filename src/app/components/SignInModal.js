"use effect";
import React, { useState, useEffect } from 'react';

const SignInModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInDetails),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error response if available
        throw new Error('Login failed');
      }

      alert('Login successful!');
      onClose(); // Close the modal after successful sign-in
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking outside the modal content
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]); // Correct dependency array

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleBackgroundClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signInDetails.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signInDetails.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Do you have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-blue-500 underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
