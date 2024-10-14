"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Footer from '@/app/widgets/footer/footer';
import Navbar from '@/app/widgets/navbar/navbar';

const Advertisement = () => (
  <div className="bg-[#f5f5f5] p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Advertisement</h2>
    <p className="mb-4">Check out our latest offers and deals!</p>
    <Image
      src="/add.jpg" // Replace with your advertisement image path
      alt="Advertisement"
      width={300}
      height={250}
      className="object-cover rounded-lg"
    />
    <a href="#" className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700">Learn More</a>
  </div>
);

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null); // Added state for error messages
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [expectedPrice, setExpectedPrice] = useState('');
  const [expectation, setExpectation] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products.');
      }
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    // Fetch comments for the selected product if needed
  };

  const handleRatingChange = (newRating) => setRating(newRating);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // Logic to submit the rating and comment, e.g., POST request to API
    // For now, just add to local state
    setComments([...comments, { rating, comment }]);
    setRating(0);
    setComment('');
  };

  const handleBiddingClick = (product) => {
    setPopupProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupProduct(null);
  };

  const handleExpectedPriceChange = (e) => setExpectedPrice(e.target.value);
  const handleExpectationChange = (e) => setExpectation(e.target.value);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    // Logic to submit the bid, e.g., POST request to API
    console.log(`Bidding for product ${popupProduct._id}: Expected Price - ${expectedPrice}, Expectation - ${expectation}`);
    handleClosePopup(); // Close popup after submission
  };

  return (
    <div className="">
      <Navbar />

    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Product Details</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product._id}
                  className="bg-[#e7e4ed] p-4 rounded-lg shadow-lg h-[300px] w-[200px] relative cursor-pointer"
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="relative flex flex-col items-center">
                    <Image
                      src={`/${product.image || 'default.jpg'}`} // Use the actual image path
                      alt={product.name || "Default Image"}
                      width={200}
                      height={200}
                      className="rounded-lg mb-2 object-cover"
                    />
                    {/* New badge for the first 3 products */}
                    {index < 3 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                        New
                      </span>
                    )}
                    <h2 className="text-md font-semibold mb-1">{product.name}</h2>
                    <p className="text-red-600 text-md font-bold mb-2">LKR {product.price}</p>
                    <div className="flex flex-col space-y-1">
                      <button
                        className="bg-purple-600 text-white px-2 py-1 rounded-lg shadow-md hover:bg-purple-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from selecting the product
                          handleBiddingClick(product);
                        }}
                      >
                        Bidding
                      </button>
                      <button
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg shadow-md hover:bg-gray-300"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from selecting the product
                          // Handle Buy Now action
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <Advertisement />
        </div>
      </div>

      {selectedProduct && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Review {selectedProduct.name}</h2>
          <form onSubmit={handleSubmitReview} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating:</label>
              <StarRating rating={rating} onChange={handleRatingChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                rows="4"
                className="px-4 py-2 border rounded-lg w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit Review</button>
          </form>

          <div>
            <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
            {comments.length > 0 ? (
              comments.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
                  <p className="font-semibold">Rating: {review.rating}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      )}

      {isPopupOpen && popupProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <Image
              src={`/${popupProduct.image || 'default.jpg'}`}
              alt={popupProduct.name || "Default Image"}
              width={300}
              height={300}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2">{popupProduct.name}</h2>
            {/* <p className="text-gray-700 mb-2"><strong>Model:</strong> {popupProduct.name}</p> */}
            {/* <p className="text-gray-700 mb-2"><strong>Category:</strong> {popupProduct.category}</p> */}
            <p className="text-red-600 text-lg font-bold mb-4"><strong>MRP:</strong> LKR {popupProduct.price}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {popupProduct.description}</p>
            
            <form onSubmit={handleSubmitBid}>
              <div className="mb-4">
                <label htmlFor="expectedPrice" className="block text-gray-700 mb-2 "><strong>Expected Price:</strong></label>
                <input
                  type="number"
                  id="expectedPrice"
                  value={expectedPrice}
                  onChange={handleExpectedPriceChange}
                  className="px-4 py-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expectation" className="block text-gray-700 mb-2"><strong>Expectation:</strong></label>
                <textarea
                  id="expectation"
                  value={expectation}
                  onChange={handleExpectationChange}
                  rows="3"
                  className="px-4 py-2 border rounded-lg w-full"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit Bid</button>
            </form>
          </div>
        </div>
      )}

    </div>
      <Footer />

</div>
  );
};

export default ProductDetails;
