"use client"; // Ensure this is at the top and correct

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image"; // Import Image component

export default function EditProductForm() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${id}`); // Debug log
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        console.log("Fetched product data:", data); // Debug log
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price), // Ensure price is a float
    };

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        router.push("/products");
      } else {
        console.log("Failed to update product");
        setError("Failed to update product. Please try again."); // Set error message
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again."); // Set error message
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="font-bold text-2xl mb-6 text-center">Edit Product</h1>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <label className="font-semibold">Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={product.name}
              className="input input-bordered input-accent w-full"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="font-semibold">Product Image URL</label>
            <input
              type="text"
              placeholder="Enter Image URL"
              value={product.image}
              className="input input-bordered input-accent w-full"
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
            />
          </div>

          {/* Image Preview */}
          {product.image && (
            <div>
              <label className="font-semibold">Image Preview</label>
              <Image
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://localhost:5000/${product.image}`
                }
                alt={product.name || "Product Image"}
                width={80}
                height={80}
                className="rounded-md mx-auto" // Center the image
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          {/* Price */}
          <div>
            <label className="font-semibold">Product Price</label>
            <input
              type="number" // Change to number input
              placeholder="Enter Product Price"
              value={product.price}
              className="input input-bordered input-accent w-full"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          </div>

          {/* Category */}
<div>
  <label className="font-semibold">Product Category</label>
  <select
    onChange={(e) => setProduct({ ...product, category: e.target.value })} // Update category state on selection
    value={product.category} // Controlled component with value set from state
    className="input input-bordered input-accent w-full" // Maintain the same styling
  >
    <option value="" disabled>Select Product Category</option> {/* Placeholder option */}
    <option value="Laptop">Laptop</option>
    <option value="SmartPhones">SmartPhones</option>
    <option value="Headphones">Headphones</option>
    <option value="Headphones">Camera</option>
  </select>
</div>


          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
