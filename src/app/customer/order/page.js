"use client"
import React, { useEffect, useState } from 'react';
import Chatbot from '../../widgets/chatbot/page';
import Navbar from '../../widgets/navbar/navbar';
import Footer from '../../widgets/footer/footer';
import { useRouter } from 'next/navigation';
import { getOrderHistory } from '../../../../redux/action/bidding_details';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../../../public/styles.css'
import NoResult from '../../components/NoResult';
import { Commet } from 'react-loading-indicators';

function Pages() {
    const router = useRouter();
    const [auction, setAuction] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUserId();
                if (userId) {
                    setLoading(true);
                    getOrderHistory(userId, (response) => {
                        if (response.status === 200) {
                            setAuction(response.data);
                        } else {
                            console.error("Failed to fetch seller bids", response);
                        }
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching auction details", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getUserId = () => {
        const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(storedUserDetails);
        return userDetails?.id;
    };

    return (
        <div className='h-full w-full'>
            <Navbar />
            <div className='p-10 '>
                <Chatbot />
                <div className=' gap-8 '>
                    <div className='text-3xl font-bold heading-bar'>Order History</div>
                </div>
                <div className='rounded-3xl row m-1 p-2 mt-5'>
                    {loading ? (
                      <div className=' d-flex justify-center  align-items-center w-full p-5 m-5'>  <Commet color="#7231cc" size="medium" text="" textColor="" /></div>
                    ) : auction.length === 0 ? (
                        <div className="text-center">
                            <NoResult />
                        </div>
                    ) : (
                        auction.map((item, index) => (
                            <div key={index} className='rounded-3xl col-12 col-md-6 col-lg-4 mb-4'>
                                <div className="p-5 bg-white rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                                    <div className='flex justify-center fw-bold fs-2'>
                                        <div>{item.auctionDetails?.productName}</div>
                                    </div>
                                    <div className='flex justify-start gap-2'>
                                        <div className='font-bold'>No of Units :</div>
                                        <div>{item.auctionDetails?.noOfUnits}</div>
                                    </div>
                                    <div className='flex justify-start gap-2'>
                                        <div className='font-bold'>Total Amount:</div>
                                        <div>{item.total}</div>
                                    </div>
                                    <div className='flex justify-start gap-2'>
                                        <div className='font-bold'>Seller Name :</div>
                                        <div>{item.sellerName}</div>
                                    </div>
                                    <div className="d-flex justify-center mt-4">
                                        <div className="btn btn-primary" onClick={() => { router.push(`/customer/trackingorder/${item._id}`) }}>
                                            Track Order
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pages;
