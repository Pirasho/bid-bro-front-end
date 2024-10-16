"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null); // Store the image file
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    useEffect(() => {
        // Dynamically import Bootstrap JS for modals to work
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            alert("Name and image are required.");
            return;
        }

        // Create FormData object to send the image and other data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image); // Append the image file
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                body: formData, // Send form data (not JSON)
            });

            if (res.ok) {
                router.push("/products");
            } else {
                throw new Error("Failed to create a Product");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            {/* Button to trigger modal */}
            <button type="button" className="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#addProductModal">
                Add New Product
            </button>

            {/* Modal */}
            <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">Add New Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="form-control"
                                        type="text"
                                        id="productName"
                                        placeholder="Enter Product Name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productImage" className="form-label">Choose an Image</label>
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="form-control"
                                        type="file"
                                        id="productImage"
                                        accept="image/*"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productPrice" className="form-label">Price</label>
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                        className="form-control"
                                        type="number"
                                        id="productPrice"
                                        placeholder="Enter Price"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productCategory" className="form-label">Category</label>
                                    <select
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
                                        className="form-select"
                                        id="productCategory"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="Phone">Phone</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">Description</label>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        className="form-control"
                                        id="productDescription"
                                        placeholder="Enter Product Description"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
