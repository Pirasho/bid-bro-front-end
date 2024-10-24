"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetAuctionDetails } from '../../../../redux/action/bidding_details';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../../../public/styles.css';
import NoResult from '../../components/NoResult';
import { Commet } from 'react-loading-indicators';
import Link from "next/link";
import Image from "next/image";

import '../../styles/home.css';


import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import '../../../../public/styles.css'
import { BsJournalCheck } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import SellerBidNotificationModal from './_components/sellerBidNotificationModal'


function Pages() {
    const router = useRouter();
    const [auction, setAuction] = useState([]);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = getUserId();
                if (userId) {
                    setLoading(true); // Set loading to true before fetching data
                    setUserId(userId); // Set userId state
                    GetAuctionDetails(userId, (response) => {
                        if (response.status === 200) {
                            setAuction(response.data);
                        } else {
                            console.error("Failed to fetch auction details", response);
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching auction details", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, []); // Empty dependency array so it runs once on component mount

    const getUserId = () => {
        const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(storedUserDetails);
        return userDetails?.id;
    };
    const toggleModal = (auct) => {
        setSelectedData(auct) ;
        setIsModalOpen(!isModalOpen);
        // Toggle modal state
    };
  

    return (
        <div className="flex bg-white body">

            <div className="sidebar w-64">
                <Sidebar />
            </div>

            <div className="flex-grow " style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' ,marginLeft:'16rem'}}>
                <Navbar />
                <div className="mx-2">
                    <div className="heading-bar-seller " ><IoMdNotificationsOutline size={21} className="mr-2" /> Notification</div>
                </div>

                <div className='p-8'>

                    {loading ?
                        <div className='d-flex justify-center align-items-center w-full p-5 m-5'>
                            <Commet color="#7231cc" size="medium" text="" textColor="" />
                        </div> :
                        <div className='row'>
                            <div className='rounded-3xl row m-1 p-2'>
                                {auction.length > 0 ? (
                                    auction.map((auct, index) => (
                                        <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                                            <div className="p-5 d-flex flex-column align-items-center justify-center bg-white rounded-3xl shadow-xl w-72">
                                                <div className='text-2xl font-bold'>{auct.productName}</div>
                                                <div className='flex justify-start gap-2'>
                                                    <div className='font-bold'>Expected Price :</div>
                                                    <div>{auct.expectedPrice}</div>
                                                </div>
                                                <button
                                                    className='btn text-white p-2'
                                                    onClick={() => toggleModal(auct)}
                                                    // onClick={() => router.push(`/customer/bidding_details/${auct._id}`)}
                                                    style={{ backgroundColor: "#031520" }}>
                                                    OpenBid
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <NoResult message="No auction details found." />
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <SellerBidNotificationModal isOpen={isModalOpen} toggleModal={toggleModal} data={selectedData}/>
        </div>
    );
}

export default Pages;