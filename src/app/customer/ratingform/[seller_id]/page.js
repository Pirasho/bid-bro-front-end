"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../widgets/navbar/navbar';
import Chatbot from '../../../widgets/chatbot/page';
import Footer from '../../../widgets/footer/footer';
import { useParams } from 'next/navigation';
import {AddReviewrate} from '../../../../../redux/action/ratingform';

const RatingForm = () => {
    const { seller_id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        rating: 0,
        sellerid: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Update the formData's rating when a star is clicked
    const handleRatingClick = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            rating: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update sellerid in formData before submission
        const data = { ...formData, sellerid: seller_id };

        AddReviewrate(data, (res) => {
            if (res?.status >= 200 && res?.status < 300) {
                setSuccessMessage("Successfully added");
                setIsButtonDisabled(true);
                setShowModal(false);

                // Reset success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                    setIsButtonDisabled(false);
                }, 3000);
            } else {
                setErrorMessage("Failed to add review");

                // Reset error message after 3 seconds
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        });
    };

    return (
        <div className='h-full w-full'>
            <Navbar />
            <div className='flex flex-col pt-5 gap-5'>
                <Chatbot />
                <div className='rounded-3xl gap-5 flex flex-col m-3 p-5'>
                    <div className='text-3xl font-bold'>Please leave your review and rating</div>
                    <div className="p-24 bg-white rounded-3xl shadow-xl" style={{ borderBottom: '6px solid #8006be' }}>
                        <div className="p-8">
                            <h1 className="text-2xl font-bold">Rate</h1>
                            <div className="flex space-x-2 text-3xl my-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} onClick={() => handleRatingClick(star)}>
                                        <span className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-400'}>★</span>
                                    </button>
                                ))}
                            </div>
                            {successMessage && <p className="text-green-500">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                <button type="submit" className="btn btn-primary p-2 text-white rounded" disabled={isButtonDisabled}>
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RatingForm;
