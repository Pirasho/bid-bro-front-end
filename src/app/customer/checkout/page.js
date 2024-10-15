"use client";
import { createHash } from "./api";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/widgets/navbar/navbar';
import Footer from '@/app/widgets/footer/footer';
import Chatbot from '@/app/widgets/chatbot/page';
import { GetSellerbids } from '../../../../redux/action/bidding_details';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/solid';


export default function Checkout() {
    const [billingDetails, setBillingDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
        zip: "",
    });

    //get and set checkout data
    const [item, setItem] = useState({
        id: 1,
        order_id: "OrderNo12345",
        name: "iPhone 15 265GB",
        price: 25656.00,
        image: "/images/iphone15.webp",
        description: "The latest iPhone model with 265GB storage.",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        // Check if all fields are filled
        if (Object.values(billingDetails).some((x) => x === "")) {
            alert("Please fill in all the fields.");
            return false;
        }
        // Check if phone number is valid
        if (!/^\d{10}$/.test(billingDetails.phone)) {
            alert("Please enter a valid phone number.");
            return false;
        }
        // Check if name is valid
        if (!/^[a-zA-Z ]+$/.test(billingDetails.firstName) || !/^[a-zA-Z ]+$/.test(billingDetails.lastName)) {
            alert("Please enter a valid name.");
            return false;
        }
        // Check if country is valid
        if (!/^[a-zA-Z ]+$/.test(billingDetails.country)) {
            alert("Please enter a valid country.");
            return false;
        }
        // Check if zip code is valid, only 5 digits
        if (!/^\d{5}$/.test(billingDetails.zip)) {
            alert("Please enter a valid zip code.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Billing Details:", billingDetails);
            startPayment();
        }
    };

    async function startPayment() {
        if (typeof payhere === 'undefined') {
            console.error("PayHere script is not loaded");
            return;
        }

        payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment completed. OrderID:" + orderId);
        };

        payhere.onDismissed = function onDismissed() {
            console.log("Payment dismissed");
        };

        payhere.onError = function onError(error) {
            console.log("Error:" + error);
        };

        const order_id = 'ORD'+(Math.random()*10000).toFixed(0)
        const name = 'iPhone 12'
        const amount = sellerBids.total
        const currency = "LKR";
        const { hash, merchant_id } = await createHash(order_id, amount, currency);
        console.log("Hash:", hash, merchant_id);

        const payment = {
            sandbox: true,
            merchant_id,
            return_url: "http://localhost:3000",
            cancel_url: "http://localhost:3000",
            notify_url: "http://sample.com/notify",
            order_id,
            items: name,
            amount: amount.toFixed(2),
            currency,
            first_name: billingDetails.firstName,
            last_name: billingDetails.lastName,
            email: billingDetails.email,
            phone: billingDetails.phone,
            address: billingDetails.address,
            city: billingDetails.city,
            country: billingDetails.country,
            delivery_address: billingDetails.address,
            delivery_city: billingDetails.city,
            delivery_country: billingDetails.country,
            custom_1: "",
            custom_2: "",
            hash,
        };

        payhere.startPayment(payment);
    }

    // return (
    //     <div className="container mx-auto p-10">
    //         <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
    //             <div className="bg-white shadow-md rounded-lg p-8">
    //                 <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
    //                 <div className="grid center justify-items-center text-center">
    //                     <img
    //                         src={item.image}
    //                         alt={item.name}
    //                         className="max-w-44 object-cover my-4 rounded-xl"
    //                     />
    //                     <div>
    //                         <h2 className="text-xl font-semibold">{item.name}</h2>
    //                         <p>{item.description}</p>
    //                         <p className="text-lg font-bold mt-2">Rs. {item.price.toFixed(2)}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="bg-white shadow-md rounded-lg p-8">
    //                 <h1 className="text-2xl font-bold mb-4">Billing Details</h1>
    //                 <form onSubmit={handleSubmit} className="space-y-4">
    //                     {[
    //                         { label: "First Name", type: "text", id: "firstName" },
    //                         { label: "Last Name", type: "text", id: "lastName" },
    //                         { label: "Email", type: "email", id: "email" },
    //                         { label: "Phone", type: "tel", id: "phone" },
    //                         { label: "Address", type: "text", id: "address" },
    //                         { label: "City", type: "text", id: "city" },
    //                         // { label: "Country", type: "text", id: "country" },
    //                         { label: "Zip Code", type: "text", id: "zip" },
    //                     ].map(({ label, type, id }) => (
    //                         <div key={id} className="form-group">
    //                             <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    //                             <input
    //                                 type={type}
    //                                 id={id}
    //                                 name={id}
    //                                 value={billingDetails[id]}
    //                                 onChange={handleInputChange}
    //                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //                                 required
    //                             />
    //                         </div>
    //                     ))}
    //                     <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //                         Proceed to Payment
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

    const reviews = { href: '#', average: 4 }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [sellerBids, setSellerBids] = useState({});
    const router = useRouter();


    // useEffect(() => {
    //   GetSellerbids((response) => {
    //     if (response.status === 200) {
    //       setSellerBids(response.data); // Assuming response.data is an array of seller bids
    //     } else {
    //       console.error("Failed to fetch seller bids", response);
    //     }
    //   });
    // }, []);

    useEffect(() => {
        GetSellerbids((response) => {
            if (response.status === 200) {
                const sellerBids = response.data;
                if (sellerBids.length > 0) {
                    setSellerBids(sellerBids[sellerBids.length - 1]); // Get the latest auction
                    console.log(sellerBids[sellerBids.length - 1])
                }
            } else {
                console.error("Failed to fetch seller bids", response);
            }
        });
    }, []);

    return (
        <div className=''>
            <Navbar />
            <div className='p-2' style={{ position: '' }} >
                <Chatbot />
                <div className='font-bold fs-2 text-3xl ml-12 mt-3 ms-3'>iPhone 12</div>

                <div className=' row p-8'>

                    <div className='flex gap-5'>
                        <div className='w-5/12 flex flex-col gap-5 m-2'>
                            <div className='col-5'>
                                <Image
                                    src="/images/2.png"
                                    alt="Profile Photo"
                                    width={250}
                                    height={160}
                                />
                            </div>
                            <div className='grid grid-cols-1  gap-6'>
                                {/* {sellerBids.map((bid, index) => ( */}
                                <div className='bg-light p-4 rounded-3xl shadow'>
                                    <div className='font-bold text-lg mb-2'>Price Details</div>
                                    <div className='flex justify-between mt-2'>

                                        <div>Bid Price :</div>
                                        <div className='font-bold'>{sellerBids.bidprice}</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Delivery Charge :</div>
                                        <div className='font-bold'> {sellerBids.deliveryCharge}</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Warranty Months :</div>
                                        <div className='font-bold'> {sellerBids.warrantymonths}</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Total Amount :</div>
                                        <div className='font-bold'>{sellerBids.total}</div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div>Special note :</div>
                                        <div className='font-bold'>{sellerBids.specialnote}</div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </div>
                            <div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-8 w-7/12 flex flex-col m-2">
                            <h1 className="text-2xl font-bold mb-4">Billing Details</h1>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { label: "First Name", type: "text", id: "firstName" },
                                    { label: "Last Name", type: "text", id: "lastName" },
                                    { label: "Email", type: "email", id: "email" },
                                    { label: "Phone", type: "tel", id: "phone" },
                                    { label: "Address", type: "text", id: "address" },
                                    { label: "City", type: "text", id: "city" },
                                    // { label: "Country", type: "text", id: "country" },
                                    { label: "Zip Code", type: "text", id: "zip" },
                                ].map(({ label, type, id }) => (
                                    <div key={id} className="form-group">
                                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                                        <input
                                            type={type}
                                            id={id}
                                            name={id}
                                            value={billingDetails[id]}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Proceed to Payment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </div>
    )
}