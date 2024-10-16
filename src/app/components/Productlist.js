"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RemoveBtn from "./RemoveBtn";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProducts = products.filter(
    (product) =>
      (product.name &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.category &&
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="overflow-x-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-purple-900 text-3xl">Product Details</h1>
      </div>

      {/* Search and Add Product Section */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/addProduct">
          <button className="bg-purple-800 text-white py-1 px-3 rounded-lg hover:bg-purple-900">Add Product</button>
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg ml-4"
          value={searchQuery}
          onChange={handleSearch}
          style={{ flex: "0 0 300px" }} // Ensures the search input has a fixed width
        />
      </div>

      {/* Products Table */}
      <table className="table-auto w-full mb-10">
        <thead>
          <tr className="border-b-2">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">MRP</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr className="hover border-b" key={product._id}>
                <td className="px-4 py-4">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {product.image ? (
                          <Image
                            src={
                              product.image.startsWith("http")
                                ? product.image
                                : `http://localhost:5000/${product.image}`
                            }
                            alt={product.name || "Product Image"}
                            width={80}
                            height={80}
                            className="rounded-lg"
                            objectFit="cover"
                          />
                        ) : (
                          <Image
                            src="/default-image.jpg"
                            alt="Default Image"
                            width={80}
                            height={80}
                            className="rounded-lg"
                            objectFit="cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">{product.name}</td>
                <td className="px-4 py-4">{product.price} Rs</td>
                <td className="px-4 py-4">{product.category}</td>
                <td className="px-4 py-4 flex gap-2">
                  <Link href={`/editProduct/${product._id}`}>
                    <button className="bg-purple-800 text-white py-1 px-3 rounded-lg hover:bg-purple-900">Edit</button>
                  </Link>
                  <RemoveBtn id={product._id}  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-4 py-4">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-6">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
