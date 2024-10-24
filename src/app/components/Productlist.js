"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import RemoveBtn from "./RemoveBtn";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Name and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.imageFilename) {
          setPreview(`http://localhost:5000/uploads/${data.imageFilename}`);
        } else {
          setPreview(null); // Clear preview if no imageFilename is available
        }

        // Close the modal
        const modalElement = document.getElementById('addProductModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }

        // Reset form fields
        setName("");
        setImage(null);
        setPreview(null);
        setPrice("");
        setCategory("");
        setDescription("");

        // Optionally refresh the product list or redirect
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
    }
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
        <button
          type="button"
          className="bg-purple-800 text-white py-1 px-3 rounded-lg hover:bg-purple-900"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Add Product
        </button>
        <input
  type="text"
  placeholder="Search..."
  className="px-4 py-2 border border-black-800 rounded-lg ml-4" // Added border-purple-800 for dark purple border
  value={searchQuery}
  onChange={handleSearch}
  style={{ flex: "0 0 300px" }}
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
                            style={{ objectFit: "cover" }} // Updated here
                          />
                        ) : (
                          <Image
                            src="/default-image.jpg"
                            alt="Default Image"
                            width={80}
                            height={80}
                            style={{ objectFit: "cover" }} // Updated here
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
                    <button className="bg-purple-800 text-white py-1 px-3 rounded-lg hover:bg-purple-900">
                      Edit
                    </button>
                  </Link>
                  <RemoveBtn id={product._id} />
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

      {/* Add Product Modal */}
      <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProductModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="form-control"
                    type="text"
                    placeholder="Enter Product Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="form-control"
                    type="file"
                    accept="image/*"
                    required
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Image Preview"
                      className="mt-2"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="form-control"
                    type="number"
                    placeholder="Enter Product Price"
                  />
                </div>
                <div className="mb-3">
  <label className="form-label">Category</label>
  <select
    onChange={(e) => setCategory(e.target.value)} // Update category state on selection
    value={category} // Controlled component with value set from state
    className="form-control"
  >
    <option value="" disabled>Select Product Category</option> {/* Placeholder option */}
    <option value="Laptop">Laptop</option>
    <option value="SmartPhones">SmartPhones</option>
    <option value="Headphones">Headphones</option>
    <option value="Headphones">Camera</option>
  </select>
</div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                    rows="3"
                    placeholder="Enter Product Description"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Bid Broo. All rights reserved.</p>
      </footer>
    </div>
  );
}
