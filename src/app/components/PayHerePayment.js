import React, { useEffect } from 'react';
import { loadPayHere } from '../../public/payhere'; // Assuming payhere.js is in the public folder

const PayHerePayment = () => {

  useEffect(() => {
    loadPayHere();


    window.payhere && window.payhere.init("sandbox"); // Set to 'sandbox' for testing


    window.payhere.onCompleted = function (orderId) {
      console.log("Payment completed. OrderID:" + orderId);

    };
    window.payhere.onDismissed = function () {
      console.log("Payment dismissed");

    };


    window.payhere.onError = function (error) {
      console.log("Error occurred during the payment: " + error);

    };
  }, []);

  const handlePayNow = () => {
    const payment = {
      sandbox: true, // For sandbox testing
      merchant_id: "YOUR_MERCHANT_ID", // Replace this with your PayHere Merchant ID
      return_url: undefined, // Optional
      cancel_url: undefined, // Optional
      notify_url: "http://yourdomain.com/notify", // Replace with your server's notify URL
      order_id: "ITEM001",
      items: "Test Item",
      amount: "1000.00", // Amount to be paid
      currency: "LKR", // Currency
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      phone: "0771234567",
      address: "No. 1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };


    window.payhere.startPayment(payment);
  };

  return (
    <div>
      <h2>PayHere Payment Integration</h2>
      <button onClick={handlePayNow} className="btn btn-primary">
        Pay Now
      </button>
    </div>
  );
};

export default PayHerePayment;
