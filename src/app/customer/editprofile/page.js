// pages/profile/edit/page.js
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../widgets/navbar/navbar.js'; 
import Footer from '../../widgets/footer/footer.js';
import Chatbot from '../../widgets/chatbot/page.js';

const sampleProfile = {
  profilePicture: '/images/1.jpg',
  email: ' broo1998@gmail.com',
  phone: '+94-123456789',
  address: '48A , passera road, Badulla',
  city: 'Badulla',
  zipCode: '20000'
};

const ProfileEditPage = () => {
  const [profile, setProfile] = useState(sampleProfile);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [zipCode, setZipCode] = useState(profile.zipCode);

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save the updated profile details
    console.log('Profile updated:', { email, phone, address, city, zipCode });
  };

  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center p-6">
      <Chatbot/>

        <div className="bg-[#ffffff] p-6 rounded-3xl shadow-lg flex w-full max-w-2xl">

          <div className="w-1/3 pr-6 flex items-center justify-center">
            <Image
              src={profile.profilePicture}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div className="w-2/3">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">Edit Profile</h1>
            <div className="mb-4 flex">
              <label htmlFor="name" className="block mb-2"><b> Name: </b></label>
              <div>Jacky</div>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 mb-2">Address:</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 mb-2">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zipCode" className="block text-gray-700 mb-2">Zip Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary text-white px-4 py-2 p-2 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <div className=" ">
          <Image
            src="/images/editpro.jpg" // Replace with dynamic image if available
            alt={"n"}
            width={650}
            height={800}
            className=' '
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProfileEditPage;
