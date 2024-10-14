"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null); // Store the image file
const [preview, setPreview] = useState(null); // Store the image preview URL
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            alert("Name and image are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image, price, category, description }),
            });

            if (res.ok) {
                router.push("/products");
            } else {
                throw new Error("Failed to create a Product");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-10 text-2xl">Add New Product</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="input input-bordered input-accent w-full max-w-xs"
                    type="text"
                    placeholder="Product Name"
                />
                {/* <input
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    className="input input-bordered input-accent w-full max-w-xs"
                    type="text"
                    placeholder="Choose an image"
                /> */}

<input
                    onChange={(e) => setImage(e.target.files[0])} // Capture the selected file
                    className="input input-bordered input-accent w-full max-w-xs"
                    type="file"
                    accept="image/*"
                />

                <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="input input-bordered input-accent w-full max-w-xs"
                    type="number"
                    placeholder="1"
                />
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="select select-bordered select-accent w-full max-w-xs"
                >
                    <option value="" disabled hidden></option>
                    <option value="Laptop">Laptop</option>
                    <option value="Phone">Phone</option>
                </select>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="textarea textarea-bordered textarea-accent w-full max-w-xs"
                    placeholder="Product Description"
                />
                <button
                    type="submit"
                    className="btn btn-primary w-full max-w-xs"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
