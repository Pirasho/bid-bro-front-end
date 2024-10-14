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

    return (
       <>
<Header />
            <div>{children}</div>
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-10 text-2xl">Sellers Details</h1>
            </div>
            <div className="text-right mb-4 relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-lg pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th> {/* Empty header for checkboxes */}
                        <th>RegNo</th> {/* New column for seller numbers */}
                        <th>Name</th>
                        <th>TelephoneNo</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>NIC</th>
                        <th></th> {/* Empty header for Edit and Remove buttons */}
                    </tr>
                </thead>
                <tbody>
                    {filteredSellers.length > 0 ? (
                        filteredSellers.map((seller, index) => (
                            <tr className="hover" key={seller._id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>{index + 1}</td> {/* Display seller number */}
                                <td>{seller.name}</td>
                                <td>{seller.telephone}</td>
                                <td>{seller.email}</td>
                                <td>{seller.address}</td>
                                <td>{seller.nic}</td>
                                <td>
                                    <Link href={`/editSeller/${seller._id}`}>
                                        <button className="btn btn-primary">Accept</button>
                                    </Link>
                                    <button className="btn btn-danger ml-2">Reject</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No sellers found.
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
