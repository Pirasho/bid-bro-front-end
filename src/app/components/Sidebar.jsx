"use client"
import Link from "next/link";
import Image from "next/image";
import dp from '../../../public/images/dp.jpg';

import { AiFillDingtalkCircle } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";

import { BsClipboardPulse, BsFillCartPlusFill } from "react-icons/bs";
import { BsJournalCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";


export default function Sidebar() {
    const [sellerDetails, setSellerDetails] = useState({});

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('sellerDetails');
        const userDetails = JSON.parse(storedUserDetails);
        setSellerDetails(userDetails)
    }, [])
    return (
        <div className="w-64 font-serif flex flex-col justify-between " style={{backgroundColor:'rgb(128,6,190)'}}>
            <div>
                <div className="flex items-center gap-2 mb-2 p-3 " >
                    <Image
                        src={`http://localhost:5002/uploads/seller/${sellerDetails.email}-profile.png`}
                        alt="Seller profile"
                        className=" rounded-full border-2 border-[white]"
                        width={50}
                        height={50}
                    />
                    <div>
                        <h4 className="font-bold  text-white "style={{ fontSize:'20px'}} >{sellerDetails.shop_name}</h4>
                        <p className="text-sm text-white">{sellerDetails.name}</p>
                    </div>
                </div>
                <span style={{ display: 'block', backgroundColor: 'white', height: '2px' }} />
                <nav className="space-y-2 p-2 pl-6">
                    <Link href={'/sellerDashboard/home'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2   no-underline">
                        <AiFillDingtalkCircle size={22} className="mr-2" />
                        My Bids
                    </Link>
                    <Link href={'/sellerDashboard/receipt'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2  no-underline">
                        <IoReceiptOutline size={21} className="mr-2" />
                        Customer Receipts
                    </Link>
                    <Link href={'/sellerDashboard/order'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2  no-underline">
                        <BsFillCartPlusFill size={21} className="mr-2" />
                        Completed Orders
                    </Link>
                    <Link href={'/sellerDashboard/available'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2  no-underline">
                        <BsClipboardPulse size={21} className="mr-2" />
                        Available Products
                    </Link>
                    <Link href={'/sellerDashboard/sellernotification'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2  no-underline">
                        <IoMdNotificationsOutline size={21} className="mr-2" />
                        Notification
                    </Link>
                    <Link href={'/sellerDashboard/report'} className="flex items-center text-[white] hover:text-[yellow] hover:bg-[#0315206d]  p-2 rounded-lg transition duration-300  my-2  no-underline">
                        <BsJournalCheck size={21} className="mr-2" />
                        Sales Reports
                    </Link>
                </nav>
            </div>
        </div>
    );
}
