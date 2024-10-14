// pages/profile/change-password/page.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/widgets/navbar/navbar';
import Footer from '@/app/widgets/footer/footer';
import Chatbot from '@/app/widgets/chatbot/page';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
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
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
<div className="absolute top-0 left-0 w-1/3 h-2/3"> {/* Adjust the width and height as needed */}
<Chatbot />

  <Image
    src="/bb.jpg" // Ensure the image path is correct
    alt="Profile"
    layout="fill"
    objectFit="cover"
    className="w-full h-full"
  />
</div>

      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="bg-[#d7d1e6] p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Change Password</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="current-password" className="block text-gray-700 mb-2">Current Password:</label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="new-password" className="block text-gray-700 mb-2">New Password:</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm New Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full"
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
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
