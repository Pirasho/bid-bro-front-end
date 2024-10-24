// pages/profile/change-password/page.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Header from "../../components/Header";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear success message on new submission

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Logic to change password goes here
    console.log('Password changed:', { currentPassword, newPassword });

    // Clear form fields after successful change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccess('Password changed successfully!'); // Set success message
  };

  return (
    <>
            <Header />
    <div className="min-h-screen flex flex-col">
      {/* Container for form and image */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
          
          {/* Left side - Image */}
          <div className="w-1/2 relative">
            <Image
              src="/Images/la.jpg" // Ensure the image path is correct
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>

          {/* Right side - Change Password Form */}
          <div className="w-1/2 p-8 bg-[#d7d1e6] flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">Change Password</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>} {/* Success message */}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="current-password" className="block text-gray-700 mb-2">Current Password:</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`px-4 py-2 border rounded-lg w-full ${error && !currentPassword ? 'border-red-500' : ''}`} // Highlight error
                />
              </div>
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-gray-700 mb-2">New Password:</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`px-4 py-2 border rounded-lg w-full ${error && !newPassword ? 'border-red-500' : ''}`} // Highlight error
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`px-4 py-2 border rounded-lg w-full ${error && !confirmPassword ? 'border-red-500' : ''}`} // Highlight error
                />
              </div>
              <button
                type="submit"
                className="btn p-2 btn-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-6">
                    <p>&copy; 2024 Bid Broo. All rights reserved.</p>
                </footer>
    </div>
    </>
  );
};

export default ChangePasswordPage;
