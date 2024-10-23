// pages/sellerNotificationPage.js
"use client";

import React, { useState } from 'react';
// import NotificationBar from '../../../components/NotificationBar';
import { BellIcon } from '@heroicons/react/outline'; // Import notification icon from Heroicons
// import Footer from '@/app/widgets/footer/footer';
// import Navbar from '@/app/widgets/navbar/navbar';

const sampleNotifications = [
  {
    id: '1',
    productName: 'mac',
    imageUrl: '/mac.jpg',
    expectedPrice: 50000,
    bidDetails: [
      { sellerName: 'Electro World', bidAmount: 48000, rating: 4.5 },
      { sellerName: 'Karan Electronics', bidAmount: 49000, rating: 4.2 },
      { sellerName: 'Alia ShowRoom', bidAmount: 50000, rating: 4.7 },
    ],
  },
  {
    id: '2',
    productName: 'Product B',
    imageUrl: '/headphone.jpg',
    expectedPrice: 20000,
    bidDetails: [
      { sellerName: 'Seller 4', bidAmount: 19000, rating: 4.8 },
      { sellerName: 'Seller 5', bidAmount: 20000, rating: 4.5 },
    ],
  },
  // Add more sample notifications as needed
];

const SellerNotificationPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleViewMore = (notification) => {
    setSelectedNotification(notification);
  };

  const handleAcceptBid = (sellerName) => {
    console.log(`Accepted bid from ${sellerName}`);
    // Logic to accept bid (e.g., update status via API)
  };

  const handlePendingBid = (sellerName) => {
    console.log(`Marked bid from ${sellerName} as pending`);
    // Logic to mark bid as pending (e.g., update status via API)
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* <Navbar  /> */}
      <main className="pt-16 flex-grow flex">
        <div className="w-1/5 p-4">
          {/* <NotificationBar notifications={sampleNotifications} onViewMore={handleViewMore} /> */}
        </div>
        <div className="flex-grow p-4">
          {selectedNotification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <BellIcon className="w-6 h-6 mr-2 text-gray-600" /> Notification Details
                </h2>
                <img
                  src={selectedNotification.imageUrl}
                  alt={selectedNotification.productName}
                  className="w-48 h-auto rounded-lg mb-4 mx-auto" // Center image and adjust size
                />
                <p><strong>Product Name:</strong> {selectedNotification.productName}</p>
                <p><strong>Expected Price:</strong> LKR {selectedNotification.expectedPrice}</p>
                <h3 className="text-xl font-semibold mb-2">Bid Rankings:</h3>
                {selectedNotification.bidDetails.map((bid, index) => (
                  <div key={index} className="mb-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                    <div className="flex-1 mb-2 md:mb-0">
                      <p><strong>{bid.sellerName}</strong></p>
                      <p>LKR {bid.bidAmount}</p>
                      <p>Rating: {bid.rating}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600"
                        onClick={() => handleAcceptBid(bid.sellerName)}
                        aria-label={`Accept bid from ${bid.sellerName}`}
                      >
                        Accept Bidding
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600"
                        onClick={() => handlePendingBid(bid.sellerName)}
                        aria-label={`Mark bid from ${bid.sellerName} as pending`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedNotification(null)}
                  aria-label="Close notification details"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default SellerNotificationPage;
