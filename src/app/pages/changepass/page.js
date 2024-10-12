"use client";
import React, { useState } from 'react';
import Header from "../../components/Header";

const ChangePasswordForm = () => {
  const [email, setEmail] = useState(''); // Adjust based on the actual requirement
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Prepare request data
    const data = {
      email,
      oldPassword: currentPassword,
      newPassword,
    };

    try {
      // API request to change password
      const response = await fetch('http://localhost:5000/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message);
        setError('');
      } else {
        setError(responseData.error || 'An error occurred');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to connect to the server');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
        {/* Footer */}
      
      </div>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ChangePasswordForm;
