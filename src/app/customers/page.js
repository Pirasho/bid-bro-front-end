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
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-10 text-2xl">Customers Details</h1>
            </div>
            <div className="text-right">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>NIC</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer, index) => (
                            <tr key={customer._id}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.telephone}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                                <td>{customer.nic}</td>
                                <td>
                                    {/* Replace with your block button implementation */}
                                    <button className="btn btn-danger">Block</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No customers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
        </div>
        </>
    );
}
