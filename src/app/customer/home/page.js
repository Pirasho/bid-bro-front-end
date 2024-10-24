"use client";
import Navbar from '../../widgets/navbar/navbar';
import Footer from '../../widgets/footer/footer';
import Image from 'next/image';
import Chatbot from '../../widgets/chatbot/page';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetProductDetails } from '../../../../redux/action/product';

function HomePage() {
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    useEffect(() => {
        GetProductDetails((response) => {
            if (response.status === 200) {
                setProduct(response.data);
            } else {
                console.error("Failed to fetch products", response);
            }
        });
    }, []);
    const filteredProducts = product.filter((pro) => {
        const matchesCategory = selectedCategory === 'All' || pro.category === selectedCategory;
        const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()); // Check if name matches search term
        return matchesCategory && matchesSearch;
    });
    const categories = ['All', 'Phone', 'Laptop', 'Other'];

    return (
        <div className=''>
            <Navbar />
            <Chatbot />
            <div className="container mx-auto">
                <div className="py-8">
                    <div className="flex space-x-4 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'text-white' : 'bg-gray-200 text-black'}`}
                                style={selectedCategory === category ? { backgroundColor: '#8006be' } : {}}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search product by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 m-9 gap-4 ">
                        {filteredProducts.map((pro, index) => (
                            <div key={index} className="flex flex-col items-center justify-center shadow-lg border p-4">
                                {pro.image && (
                                    <img
                                        src={pro.image.startsWith("http") ? pro.image : `http://localhost:5000/${pro.image}`}
                                        alt={pro.name}
                                        className="w-full h-64 object-cover"
                                    />
                                )}
                                <h2 className="text-xl font-bold">{pro.name}</h2>
                                <p className="text-black-500 font-bold">{pro.category}</p>
                                <p className="text-red-500 font-bold">MRP : {pro.price}</p>
                                <button
                                    className='btn p-2 btn-primary text-white font-bold py-2 px-4 rounded'
                                    onClick={() => router.push(`/customer/product_details/${pro._id}`)}
                                >
                                    BiD
                                </button>
                                <br />
                                <button
                                    className='p-2 bg-white text-[#8006BE] border-2 border-[#8006BE] font-bold rounded-[20px]'
                                    onClick={() => router.push(`/customer/---/${pro._id}`)}
                                >
                                    Add to Card
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;