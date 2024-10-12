"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RegistrationModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    zip: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { phone, password, confirmPassword } = registrationDetails;

    if (Object.values(registrationDetails).some((x) => x === "")) {
      alert("Please fill in all the fields.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationDetails),
        });

        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error(errorData.message || 'Registration failed');
        }

        alert('Registration successful!');
        onClose(); 
      } catch (error) {
        console.error('Error:', error.message);
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleBackgroundClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {[{ label: "Name", type: "text", id: "name" },
            { label: "Email", type: "email", id: "email" },
            { label: "Phone", type: "text", id: "phone" },
            { label: "Address", type: "text", id: "address" },
            { label: "City", type: "text", id: "city" },
            { label: "Zip Code", type: "text", id: "zip" },
            { label: "Password", type: "password", id: "password" },
            { label: "Re-enter Password", type: "password", id: "confirmPassword" }]
            .map(({ label, type, id }) => (
              <div key={id} className="form-group mb-4">
                <label htmlFor={id} className="block text-sm font-medium text-black">{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={registrationDetails[id]}
                  onChange={handleInputChange}
                  className="form-control block w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 rounded-3xl shadow-xl border border-gray-300"
                  required
                />
              </div>
            ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
            Register
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <div>Already have an account?</div>
          <Link href="/pages/abc/signin" className="text-primary">
            <span className="font-bold text-purple-900">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
