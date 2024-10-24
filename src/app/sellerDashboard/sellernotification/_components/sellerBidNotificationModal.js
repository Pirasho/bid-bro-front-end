'use client'

import React, { useState } from 'react';
import {postAllSellerbid} from "../../../../../redux/action/sellerbid"
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
const SellerBidNotificationModal = ({ isOpen, toggleModal, data }) => {
    const [bidprice, setBid] = useState("");
    const [warrantymonths, setWarrantyMonths] = useState("");
    const [specialnote, setSpecialNote] = useState("");


    const resetfield=()=>{
        setBid("");
        setWarrantyMonths("");
        setSpecialNote("");
    }

    

    const sellerDetails = Cookies.get('sellerDetails');
    const seller = sellerDetails ? JSON.parse(sellerDetails) : null;
    console.log(sellerDetails,"sellll")
    const sellerName = seller?.name || "pirasoban"; 


    const handleSubmit = () => {
        // Prepare the bid data to be sent
        const bidData = {
            auctionid: data?._id,   // Assuming 'data' contains product information like id
            bidprice,
            warrantymonths,
            specialnote,
            sellerName:sellerName
        };

        // Call postAllSellerbid with the bidData
        postAllSellerbid(bidData,(response) => {
                if (response.status === 201) {
                    console.log("", response);
                    alert("bid sent success")
                    toggleModal();
                    resetfield();  // Close the modal on success
                } else {
                    console.error("Failed to submit bid", response);
                }
            });
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-[1000px] w-full p-6">
                        <h2 className="text-2xl font-semibold mb-4">Send Your Bid </h2>

                        <div className='grid grid-cols-2'>
                            <div className='flex flex-col space-y-4 items-start p-4 bg-white shadow-lg rounded-lg w-full max-w-sm'>
                                <div className='flex justify-betweeen items-center'>
                                    <h5>Product Name</h5>
                                    <h6>{data?.productName}</h6>
                                </div>
                                <div className='flex justify-betweeen items-center'>
                                    <h5>expectedPrice</h5>
                                    <h6>{data?.expectedPrice}</h6>
                                </div>
                                <div className='flex justify-betweeen items-center'>
                                    <h5>noOfUnits</h5>
                                    <h6>{data?.noOfUnits}</h6>
                                </div>
                                <div className='flex justify-betweeen items-center'>
                                    <h5>description</h5>
                                    <h6>{data?.description}</h6>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-4 items-start p-4 bg-white shadow-lg rounded-lg w-full max-w-sm'>
                                <label className="text-gray-700 font-semibold text-lg">Bid</label>
                                <input
                                    name='bidprice'
                                    value={bidprice}
                                    onChange={(e) => setBid(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent'
                                    placeholder="Enter your bid"
                                />

                                <label className="text-gray-700 font-semibold text-lg">Warranty Months</label>
                                <input
                                    name='warrantymonths'
                                    value={warrantymonths}
                                    onChange={(e) => setWarrantyMonths(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent'
                                    placeholder="Enter warranty months"
                                />

                                <label className="text-gray-700 font-semibold text-lg">Special Note</label>
                                <input
                                    name='specialnote'
                                    value={specialnote}
                                    onChange={(e) => setSpecialNote(e.target.value)}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent'
                                    placeholder="Enter special note"
                                />

                                <button
                                    onClick={handleSubmit}
                                    className='bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-indigo-700 transition duration-300 ease-in-out'>
                                    Submit Bid
                                </button>
                            </div>

                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onClick={toggleModal}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            )}
        
        </>
    );
};

export default SellerBidNotificationModal;
