"use client";
import React, { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [isHydrated, setIsHydrated] = useState(false); // Hydration check

  // Ensure the component is rendered client-side only after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleToggle = () => {
    setDeliveryOption(deliveryOption === 'pickup' ? 'delivery' : 'pickup');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order Placed!');
  };

  if (!isHydrated) {
    return null; // Render nothing on the server
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <header className="flex items-center justify-between pb-4 border-b">
          <div className="text-xl font-semibold">GRADE 2</div>
          <div className="text-green-600">Available</div>
        </header>

        <form onSubmit={handleSubmit} className="mt-6">
          <h2 className="text-xl font-bold text-center mb-4">Customer Details</h2>

          {/* Delivery/Pickup Toggle */}
          <div className="flex justify-center mb-4">
            <label className="mr-4">Pickup</label>
            <input
              type="checkbox"
              checked={deliveryOption === 'delivery'}
              onChange={handleToggle}
              className="toggle-checkbox"
            />
            <label className="ml-4">Delivery</label>
          </div>

          {/* Customer Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Card Details */}
          <h3 className="text-lg font-semibold mb-2 text-green-700">Card Details</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Card expiry (mm/yyyy)"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Card pin (3 digits)"
              value={cardPin}
              onChange={(e) => setCardPin(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Product Summary */}
          <h3 className="text-lg font-semibold mb-2 text-green-700">Total Items</h3>
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Product"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4">
              <p>English</p>
              <p className="font-semibold">Price: Rs.750.00</p>
              <p>Qty: 3</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <p>Sub total</p>
              <p>Rs.750.00</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Delivery Charge</p>
              <p>Rs.0.00</p>
            </div>
            <div className="flex justify-between font-bold text-green-700">
              <p>Total</p>
              <p>Rs.750.00</p>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            PLACE ORDER
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
