"use client"
import React, { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { GetAuctionDetails } from '../../../../redux/action/bidding_details';
import Navbar from '../../widgets/navbar/navbar';
import Chatbot from '../../widgets/chatbot/page';
import Footer from '../../widgets/footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../../../public/styles.css';





function Pages() {
    const router = useRouter();
    const [auction, setAuction] = useState([]);
    const [userId, setuserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUserId(); // Wait for userId to be retrieved
                if (userId) {
                    GetAuctionDetails(userId, (response) => {
                        if (response.status === 200) {
                            setAuction(response.data); // Set the auction data
                        } else {
                            console.error("Failed to fetch seller bids", response);
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching auction details", error);
            }
        };

        fetchData(); // Call the async function
    }, [userId]);
    const getUserId = () => {
        const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(storedUserDetails);
        return userDetails?.id; // Return the userId from localStorage
    };

    return (
        <div className='' >
            <Navbar />
            <div className=' p-8'>
                <Chatbot />
                <div className=''>
                    <div className='text-3xl font-bold  heading-bar mb-3'>Notifications</div>
                </div>
                <div className='row'>
                    <div className='rounded-3xl row m-1 p-2'>
                        {auction.map((auct, index) => (
                            <div className='col-12 col-md-6 col-lg-4  mb-4'>

                            <div key={index} className="p-5 d-flex flex-column align-items-center justify-center bg-white rounded-3xl shadow-xl w-72" style={{ borderBottom: '6px solid  #8006be' }}>
                                <div className='text-2xl font-bold'>{auct.productName}</div>
                                <div className='flex justify-start gap-2'>
                                    <div className='font-bold'>Expected Price :</div>
                                    <div>{auct.expectedPrice}</div>
                                </div>
                                <button className='btn p-2 btn-primary' onClick={() => router.push("/customer/bidding_details")}>
                                    Show bids
                                </button>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Pages;