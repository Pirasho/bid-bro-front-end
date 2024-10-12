"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { GetSellerbids } from '../../../../redux/action/bidding_details';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/solid';
import Navbar from '../../widgets/navbar/navbar';
import Chatbot from '../../widgets/chatbot/page';
import Footer from '../../widgets/footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Pages() {
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
        }
      } else {
        console.error("Failed to fetch seller bids", response);
      }
    });
  }, []);

  return (
    <div className=''>
      <Navbar/>
      <div className='p-2' style={{ position: '' }} >
        <Chatbot/>
        <div className='font-bold fs-2 text-3xl ml-12 mt-3 ms-3'>iPhone 12</div>

        <div className=' row p-8'>

          <div className='flex'>
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
                  <button className='btn p-2 rounded-full border-dark rounded-pill btn-primary'>
                    Accept Bid
                  </button>
                </div>
                {/* ))} */}
              </div>
              <div>
              </div>
            </div>
            <div className='w-7/12 p-5'>
              <div className='bg-light p-4 rounded-3xl shadow m-5'>
                <div className=' flex align-items-center gap-2'>
                  <div className=' space-x-4' style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    overflow: 'hidden'
                  }}>
                    <Image
                      src="/images/8.jpg"
                      alt="Profile Photo"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className=''>
                    <div className='fw-bold'>
                      Shoo
                    </div>
                    <div className="">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating ? 'text-yellow-300' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <div>
                    is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                    Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center   border border-dark' style={{ borderRadius: '25px', }}>
          <div className=' ' style={{
            width: '200px',
            borderRadius: '25px',
            margin: '8px',
            height: '100px',
            border: '3px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            <div className='flex space-x-4' style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #fff',
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              80%
            </div>
            <div className='h-10 w-10'>Customers Rating</div>
          </div>
          <div className=' ' style={{
            width: '300px',
            borderRadius: '25px',
            height: '100px',
            border: '3px solid #fff',
            display: 'flex',
            margin: '8px',

            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
            <div>
              <div className='flex space-x-4' style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid #fff',
                overflow: 'hidden',
              }}>
                <Image
                  src="/images/1.jpg"
                  alt="Profile Photo"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div>
              <div>{sellerBids.sellerName}</div>
              <div>{sellerBids.city}</div>
            </div>

          </div>
          <div className=' ' style={{
            width: '200px',
            borderRadius: '25px',
            height: '100px',
            border: '3px solid #fff',
            margin: '8px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
            <div>
              <div className='flex space-x-4' style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid #fff',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                88%
              </div>
            </div>
            <div>
              <div>Sucessfull Complete Orders</div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>

    </div>
  )
}

export default Pages;