"use client";
import React, { useEffect, useState } from "react";
import retrievePayments from "./api";
import Header from "../components/Header";

export default function PaymentDetails() {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search input

    useEffect(() => {
        retrievePayments()
            .then((data) => {
                console.log(data);
                setPaymentDetails(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "text-blue-600"; // Blue for Pending
            case "Completed":
                return "text-green-600"; // Green for Completed
            case "Refunded":
                return "text-red-600"; // Red for Refunded
            default:
                return "text-gray-600"; // Default color if status is unknown
        }
    };

    // Function to filter payments based on search query
    const filteredPayments = paymentDetails.filter((payment) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            payment.payment_id.toString().includes(lowercasedQuery) || // Filter by Order No
            payment.payment_method.method.toLowerCase().includes(lowercasedQuery) // Filter by Type
        );
    });

    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 p-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4">
                        <h1 className="font-bold text-2xl">Payment Details</h1>
                        <input
                            type="text"
                            placeholder="Search by Order No or Type..."
                            className="px-4 py-2 border border-purple-800 rounded-lg w-1/3" // Adjust width as needed
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-center">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">ORDER NO</th>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">DATE</th>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">ITEM</th>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">TYPE</th>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">STATUS</th>
                                    <th className="py-2 px-4 border-b-2 border-gray-200">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b border-gray-200">{payment.payment_id}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{payment.date}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{payment.description}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{payment.payment_method.method}</td>
                                        <td className={`py-2 px-4 border-b border-gray-200 ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">Rs. {payment.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer className="bg-gray-900 text-white text-center py-4">
                    <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
