"use client";
import Image from 'next/image';
import AuctionModal from '../../auction/page'; // Adjust the path as needed
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { GetAuctionDetails, getOrderHistoryOne, GetSellerbids } from '../../../../../redux/action/bidding_details';
import Navbar from '../../../widgets/navbar/navbar';
import Chatbot from '../../../widgets/chatbot/page';
import Footer from '../../../widgets/footer/footer';
import Step from '../../../components/Ordersteps'
import '../../../../../public/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function Pages() {
    const router = useRouter();
    const { product_id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [sellerBids, setSellerBids] = useState({
        sellerName: '',
        deliveryCharge: 0,
        bidprice: 0,
        total: 0
    });
    const [auction, setAuction] = useState({
        noOfUnits: 0
    });
    const activeStep = '3'
    useEffect(() => {
        if (product_id) {
            getOrderHistoryOne(product_id, (response) => {
                if (response.status === 200) {
                    const sellerBidsData = response.data;
                    if (sellerBidsData.length > 0) {
                        setSellerBids(sellerBidsData[sellerBidsData.length - 1]); // Get the latest auction
                    }
                } else {
                    console.error("Failed to fetch seller bids", response);
                }
            });
        }
    }, [product_id]);

    const handleButtonClick = () => {
        setShowModal(false);
        toast.success('Thank You For Your Confirmation, Enjoy your Day'); // Displays a success message
    };

    

    return (
        <div className='h-full w-full'>
            <ToastContainer /> {/* Ensure this is included */}
            <Navbar />
            <div className=' btn  btn-primary ms-4' onClick={() => router.push("/customer/order")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back
        </div>
            <div className='p-24 flex flex-col md:flex-row'>
                <Chatbot />
                {/* Product Details */}
                <div className='flex flex-col w-full md:w-1/3 gap-8 items-center'>
                    <div className='text-3xl font-bold'>{sellerBids.auctionDetails?.productName}</div>
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
                        <div className='text-2xl font-bold mb-2 heading-bar'>Your Order Tracking</div>
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                            <Step
                                stepNumber="01"
                                title="OrderDone"
                                isActive={true}
                            />
                            <div className="step-line rounded-3"></div>
                            <Step
                                stepNumber="02"
                                title="Processing"
                                isActive={true}
                            />
                            <div className="step-line rounded-3"></div>
                            <Step
                                stepNumber="03"
                                title="Shipping"
                                isActive={false}
                            />
                            <div className="step-line rounded-3"></div>
                            <Step
                                stepNumber="04"
                                title="Delivered"
                                isActive={false}
                            />
                        </div>

                    </div>
                    <div className='bg-white p-5 rounded-3xl shadow' style={{ borderBottom: '6px solid #8006be' }}>
                    <div className='text-2xl font-bold mb-3 heading-bar'>Product Details</div>
                    
                        <div className=' d-flex justify-center gap-5 mt-4'>
                            <div className='bg-light p-4 rounded-3xl shadow'>
                                <div className='font-bold  text-center'>Your Requiremnets</div>
                                <hr />
                                <div className='flex justify-between mt-2'>
                                    <div>Product Name:</div>
                                    <div className='font-bold'>{sellerBids.auctionDetails?.productName}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Expected Price:</div>
                                    <div className='font-bold'>{sellerBids.auctionDetails?.expectedPrice}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>No Of Unit:</div>
                                    <div className='font-bold'>{sellerBids.auctionDetails?.noOfUnits}</div>
                                </div>
                                <div className=' mt-2'>
                                    <div>Description:</div>
                                    <div className='font-bold'>{sellerBids.auctionDetails?.description}</div>
                                </div>
                            </div>
                            <div className='bg-light p-4 rounded-3xl shadow'>
                                <div className='font-bold  text-center'>Seller Deatils</div>
                                <hr />
                                <div className='flex justify-between mt-2'>
                                    <div>Name:</div>
                                    <div className='font-bold'>{sellerBids.sellerName}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>MRP Price:</div>
                                    <div className='font-bold'>{sellerBids.mrp || '-'}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Bid_Price:</div>
                                    <div className='font-bold'>{sellerBids.bidprice}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Saving</div>
                                    <div className='font-bold'>{sellerBids.saving || "-"}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Warranty_Months:</div>
                                    <div className='font-bold'>{sellerBids.warrantymonths}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Delivery_Charge:</div>
                                    <div className='font-bold'>{sellerBids.deliveryCharge}.00</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Total amount</div>
                                    <div className='font-bold'>{sellerBids.total}.00</div>
                                </div>

                            </div>

                        </div>
                        <div className=' d-flex justify-center mt-4'>
                            <button className='btn p-2  btn-primary' onClick={() => router.push("/customer/ratingform")}>
                                Confirm Received
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pages;
