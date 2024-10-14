"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import RemoveBtn from "./RemoveBtn";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log("Error loading products: ", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-10 text-2xl">Product Details</h1>
            </div>
            <div className="text-right mb-4">
                <Link href="/addProduct">
                    <button className="btn btn-primary">Add Product</button>
                </Link>
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-lg ml-4"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>MRP</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <tr className="hover" key={product._id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {/* {product.image ? (
                                                    <Image
                                                        src={product.image.startsWith("http") ? product.image : `/${product.image}`}
                                                        alt={product.name || "Product Image"}
                                                        width={80}
                                                        height={80}
                                                        className="rounded-lg"
                                                        objectFit="cover" // Ensure proper image cropping
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/default-image.jpg" // Fallback image
                                                        alt="Default Image"
                                                        width={80}
                                                        height={80}
                                                        className="rounded-lg"
                                                        objectFit="cover"
                                                    />
                                                )} */}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.price} Rs</td>
                                <td>{product.category}</td>
                                <td>
                                    <Link href={`/editProduct/${product._id}`}>
                                        <button className="btn btn-primary mr-2">Edit</button>
                                    </Link>
                                    <RemoveBtn id={product._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
