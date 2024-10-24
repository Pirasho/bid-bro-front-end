"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const getCustomers = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/customers");
        if (!res.ok) {
            throw new Error("Failed to fetch customers");
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error loading customers: ", error);
        return [];
    }
};

export default function CustomerList({ children }) {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersData = await getCustomers();
                console.log(customersData); // Log the data received from the API
                setCustomers(customersData);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchData();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        (customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (customer.telephone && customer.telephone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (customer.address && customer.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (customer.nic && customer.nic.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Header />
            <div>{children}</div>
            <div className="overflow-x-auto p-5">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="font-bold text-2xl">Customers Details</h1>
                    <div className="text-right">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 border">Reg No</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Telephone</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">NIC</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer, index) => (
                                <tr key={customer._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{customer.name}</td>
                                    <td className="px-4 py-2 border">{customer.telephone}</td>
                                    <td className="px-4 py-2 border">{customer.email}</td>
                                    <td className="px-4 py-2 border">{customer.address}</td>
                                    <td className="px-4 py-2 border">{customer.nic}</td>
                                    <td className="px-4 py-2 border">
                                        <button className="px-4 py-2 bg-purple-900 text-white font-bold rounded shadow hover:bg-grey-700 transition duration-200">
                                            Block
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center py-4 mt-6">
                    <p>&copy; 2024 Bid Broo. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
