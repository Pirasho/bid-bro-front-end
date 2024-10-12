"use client";
import Image from 'next/image';
import AuctionModal from '../auction/page'; // Adjust the path as needed
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { GetAuctionDetails, GetSellerbids } from '../../../../redux/action/bidding_details';
import Navbar from '../../widgets/navbar/navbar';
import Chatbot from '../../widgets/chatbot/page';
import Footer from '../../widgets/footer/footer';


function Pages() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
  const [sellerBids, setSellerBids] = useState({});


    const [auction, setAuction] = useState({});

    useEffect(() => {
        GetAuctionDetails((response) => {
            if (response.status === 200) {
                const auctions = response.data; // Assuming response.data is an array of auctions
                if (auctions.length > 0) {
                    const lastAuction = auctions[auctions.length - 1];
                    setAuction(lastAuction);
                }
            } else {
                console.error("Failed to fetch auction details", response);
            }
        });
    }, []);

    useEffect(() => {
        GetSellerbids((response) => {
          if (response.status === 200) {
            const sellerBids = response.data;
            if (sellerBids.length > 0) {
              setSellerBids(sellerBids[sellerBids.length - 1]); // Get the latest auction
            }
          } else {
            console.error("Failed to fetch seller bids", response);
          }
        });
      }, []);

    const handleButtonClick = () => {
        setShowModal(false);
        toast.success('Thank You For Your Confirmation, Enjoy your Day'); // Displays a success message
    };

    return (
        <div className='h-full w-full'>
            <ToastContainer/> {/* Ensure this is included */}
            <Navbar/>
            <div className='p-24 flex flex-col md:flex-row'>
                <Chatbot/>
                {/* Product Details */}
                <div className='flex flex-col w-full md:w-1/3 gap-8 items-center'>
                    <div className='text-3xl font-bold'>iPhone</div>
                    <Image
                        src="/images/iphone.jpg"
                        alt="iPhone"
                        width={250}
                        height={250}
                        className='bg-purple-50 rounded-3xl p-2.5'
                    />
                </div>
                {/* Bidding Details */}
                <div className='flex flex-col w-full md:w-2/3 pt-10'>
                    <div className='bg-white p-5 rounded-3xl shadow mb-4' style={{ borderBottom: '6px solid #8006be' }}>
                        <div className='text-2xl font-bold mb-5'>Your Order Tracking</div>
                        <div className='flex flex-col'>
                            <div className="flex justify-around">
                                <input type="radio" id="order" name="fav_language" value="order" defaultChecked />
                                <input type="radio" id="process" name="fav_language" value="process" />
                                <input type="radio" id="out" name="fav_language" value="out" />
                                <input type="radio" id="deliver" name="fav_language" value="deliver" />
                            </div>
                            <div className="flex justify-around mt-2">
                                <span className="checkmark">&#10003;</span>
                                <span className="checkmark">&#10003;</span>
                                <span className="checkmark">&#10003;</span>
                                <span className="checkmark">&#10003;</span>
                            </div>
                            <div className="flex justify-around mt-2">
                                <span className='text-2l font-bold'>Order Done</span>
                                <span className='text-2l font-bold'>Processing</span>
                                <span className='text-2l font-bold'>On Delivery</span>
                                <span className='text-2l font-bold'>Delivered</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-5 rounded-3xl shadow' style={{ borderBottom: '6px solid #8006be' }}>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                           
                                <div  className='bg-light p-4 rounded-3xl shadow'>
                                    <div className='font-bold text-lg mb-2'>{sellerBids.sellerName}</div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Method for Get</div>
                                        <div className='font-bold'>Delivery</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Payment</div>
                                        <div className='font-bold'>Cash-On-Delivery</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>No Of Unit </div>
                                        <div className='font-bold'>{auction.noOfUnits}</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Delivery charge</div>
                                        <div className='font-bold'>{sellerBids.deliveryCharge}.00</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Catch Bid Price</div>
                                        <div className='font-bold'>{sellerBids.bidprice}.00</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Total amount</div>
                                        <div className='font-bold'>{sellerBids.total}.00</div>
                                    </div>
                                    <button className='btn p-2  btn-primary' onClick={() => router.push("/customer/ratingform")}>
                                        Confirm Received
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Pages;
