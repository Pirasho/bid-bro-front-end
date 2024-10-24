"use client";
import Image from 'next/image';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { GetAuctionDetails, getOrderHistory, getOrderHistoryOne, GetSellerbids } from '../../../../../../redux/action/bidding_details';
import Navbar from '../../../../widgets/navbar/navbar';
import Chatbot from '../../../../widgets/chatbot/page';
import Footer from '../../../../widgets/footer/footer';
import Step from '../../../../components/Ordersteps'
import '../../../../../../public/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function Pages() {
    const router = useRouter();
    const { product_id,seller_id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [Sellerdata, setSellerdata] = useState({});
   
    const [auction, setAuction] = useState({});
    const activeStep = '3'

    useEffect(() => {
        if (product_id) {
            getOrderHistoryOne(product_id, seller_id, (response) => {
                if (response.status === 200) {
                    const sellerBidsData = response.data;
                    console.log("Bids:", JSON.stringify(sellerBidsData));
                    
                    // Assuming response.data is an array with auction data and bids array inside it
                    const auctionData = sellerBidsData[0]; 
                    setData(auctionData);
    
                    // Find the bid that matches the seller_id
                    const matchedBid = auctionData.bids.find((bid) => bid.sellerId === seller_id);
    
                    if (matchedBid) {
                        setSellerdata(matchedBid);
                    } else {
                        console.warn("No matching bid found for the seller_id:", seller_id);
                    }
                } else {
                    console.error("Failed to fetch seller bids", response);
                }
            });
        }
    }, [product_id, seller_id]); // Added seller_id as a dependency
    

    const handleButtonClick = () => {
        setShowModal(false);
        toast.success('Thank You For Your Confirmation, Enjoy your Day'); // Displays a success message
    };

    useEffect(()=>{
console.log('Sellerdata'+JSON.stringify(Sellerdata));

    },[Sellerdata])
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const userId = await getUserId();
    //             if (userId) {
    //                 setLoading(true);
    //                 getOrderHistory(userId, (response) => {
    //                     if (response.status === 200) {
    //                         console.log('dei'+JSON.stringify(response.data));
                            
    //                         setAuction(response.data);
    //                     } else {
    //                         console.error("Failed to fetch seller bids", response);
    //                     }
    //                     setLoading(false);
    //                 });
    //             } else {
    //                 setLoading(false);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching auction details", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const getUserId = () => {
        const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(storedUserDetails);
        return userDetails?.id;
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
                    <div className='text-3xl font-bold'>{data?.productName}</div>
                     {/* <Image
                            src={
                                data?.productImage && data?.productImage.startsWith("http")
                                ? data?.productImage
                                : `http://localhost:5000/${data?.productImage}`
                            }
                            alt={data?.productImage || "Product Image"}
                            width={80}
                            height={80}
                            className="rounded-lg"
                            objectFit="cover"
                          /> */}
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
                                    <div className='font-bold'>{data?.productName}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Expected Price:</div>
                                    <div className='font-bold'>{data?.expectedPrice}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>No Of Unit:</div>
                                    <div className='font-bold'>{data?.noOfUnits}</div>
                                </div>
                                <div className=' mt-2'>
                                    <div>Description:</div>
                                    <div className='font-bold'>{data?.description}</div>
                                </div>
                            </div>
                            <div className='bg-light p-4 rounded-3xl shadow'>
                                <div className='font-bold  text-center'>Seller Deatils</div>
                                <hr />
                                <div className='flex justify-between mt-2'>
                                    <div>Id:</div>
                                    <div className='font-bold'>{Sellerdata.sellerId}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Bid Price:</div>
                                    <div className='font-bold'>{Sellerdata.bidAmount || '-'}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>Warranty_Months:</div>
                                    <div className='font-bold'>{Sellerdata.warrantymonths}</div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <div>SpecialNote:</div>
                                    <div className='font-bold'>{Sellerdata.specialnote}.00</div>
                                </div>
                            </div>

                        </div>
                        <div className=' d-flex justify-center mt-4'>
                            <button className='btn p-2  btn-primary' onClick={() => router.push(`/customer/ratingform/${Sellerdata.sellerId}`)}>
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
