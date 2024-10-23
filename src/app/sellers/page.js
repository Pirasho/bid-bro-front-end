"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const getSellers = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/sellers");
        if (!res.ok) {
            throw new Error("Failed to fetch sellers");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error loading sellers: ", error);
        return [];
    }
};

export default function SellerList({ children }) {
    const [sellers, setSellers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sellersData = await getSellers();
                console.log(sellersData); // Log the data received from the API
                setSellers(sellersData);
            } catch (error) {
                console.error("Error fetching sellers:", error);
            }
        };
        fetchData();
    }, []);

    const filteredSellers = sellers.filter(seller =>
        (seller.name && seller.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (seller.email && seller.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (seller.telephone && seller.telephone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (seller.address && seller.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (seller.nic && seller.nic.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const blockSeller = async (sellerId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/sellers/block/${sellerId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Failed to block seller");
            }
            const data = await res.json();
            console.log(data.message); // Log success message or update state as needed
            // Optionally, refetch the sellers or update the local state to reflect the changes
            setSellers(prevSellers => 
                prevSellers.map(seller => 
                    seller._id === sellerId ? { ...seller, blocked: true } : seller
                )
            );
        } catch (error) {
            console.error("Error blocking seller:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-6 bg-blue-100 min-h-screen">
                <div>{children}</div>
                <h1 className="font-bold text-2xl text-blue-900 mb-6">Sellers Details</h1>
                
                <div className="text-right mb-4 relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border rounded-lg pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                
                <div className="overflow-x-auto rounded-lg shadow-lg mb-6">
                    <table className="table w-full bg-white rounded-lg">
                        <thead className="bg-blue-200">
                            <tr>
                                <th className="p-3"></th>
                                <th className="p-3">RegNo</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Telephone No</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">NIC</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSellers.length > 0 ? (
                                filteredSellers.map((seller, index) => (
                                    <tr className="hover:bg-gray-100" key={seller._id}>
                                        <td className="p-3">
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </td>
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{seller.name}</td>
                                        <td className="p-3">{seller.telephone}</td>
                                        <td className="p-3">{seller.email}</td>
                                        <td className="p-3">{seller.address}</td>
                                        <td className="p-3">{seller.nic}</td>
                                        <td className="p-3">
                                            {/* <Link href={`/editSeller/${seller._id}`}>
                                                <button className="px-4 py-2 bg-blue-900 text-white font-bold rounded shadow hover:bg-blue-700 transition duration-200">
                                                    Edit
                                                </button>
                                            </Link> */}
                                            <button 
                                                className="ml-2 px-4 py-2 bg-purple-950 text-white font-bold rounded shadow hover:bg-red-500 transition duration-200"
                                                onClick={() => blockSeller(seller._id)}
                                            >
                                                Block
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        No sellers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center py-4 mt-6 rounded-lg shadow-md">
                    <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
