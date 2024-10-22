"use client"; // Ensure this is at the top and correct

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductForm() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({ name: "", image: "", price: "", category: "" });
  const [loading, setLoading] = useState(true);

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
      price: parseFloat(product.price),
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
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />

{/* <input
  type="file" // Change the input type to file
  accept="image/*" // Restrict the file selection to image files
  className="input input-bordered input-accent w-full max-w-xs"
  value={product.image}
  onChange={(e) =>
    setProduct({ ...product, image: URL.createObjectURL(e.target.files[0]) })
  } */}

  {/* <div>
  {/* Display the current image if it exists */}
  {/* {product.image && (
    <img src={product.image} alt="Selected" className="mb-4 w-32 h-32 object-cover" />
  )} */}

  {/* File input for selecting a new image */}
  {/* <input
    type="file"
    accept="image/*"
    className="input input-bordered input-accent w-full max-w-xs"
    onChange={(e) => {
      if (e.target.files[0]) {
        // Update the image state with the new file
        setProduct({ ...product, image: URL.createObjectURL(e.target.files[0]) });
      }
    }}
  />
</div> */} 



        <input
          type="text"
          placeholder="Price"
          value={product.price}
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={product.category}
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full max-w-xs">
          Update Product
        </button>
      </form>
    </div>
  );
}
