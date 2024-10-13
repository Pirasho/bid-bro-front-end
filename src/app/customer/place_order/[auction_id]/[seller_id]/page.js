"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AcceptSellerbids, GetSellerbidsById } from '../../../../../../redux/action/bidding_details';
import { useParams, useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/solid';
import Navbar from '../../../../widgets/navbar/navbar';
import Chatbot from '../../../../widgets/chatbot/page';
import Footer from '../../../../widgets/footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../../../../public/styles.css';

function Pages() {
  const reviews = { href: '#', average: 4 };
  const classNames = (...classes) => classes.filter(Boolean).join(' ');
  const [sellerBids, setSellerBids] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userId, setuserId] = useState('');
  const router = useRouter();
  
  const { auction_id, seller_id } = useParams();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(storedUserDetails);
        setuserId(userDetails.id)
    GetSellerbidsById(seller_id, (response) => {
      if (response.status === 200) {
        const sellerBids = response.data;
        if (sellerBids.length > 0) {
          setSellerBids(sellerBids[sellerBids.length - 1]);
        }
      } else {
        console.error("Failed to fetch seller bids", response);
      }
    });
  }, []);

  const handleAcceptBid = () => {
    AcceptSellerbids({ customer_id:userId},seller_id, (response) => {
      if (response.status === 200) {
        const sellerBids = response.data;
        if (sellerBids.length > 0) {
          setSellerBids(sellerBids[sellerBids.length - 1]); // Get the latest auction
        }
      } else {
        console.error("Failed to fetch seller bids", response);
      }
    });
    console.log('Bid accepted:', sellerBids);
    setShowModal(false); 
  };

  return (
    <div className=''>
      <Navbar />
      <div className='btn btn-primary ms-4' onClick={() => router.push(`/customer/bidding_details/${auction_id}`)}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back
      </div>
      <div className='p-2'>
        <Chatbot />
        <div className='font-bold fs-2 text-3xl ml-12 mt-3 ms-3'>iPhone 12</div>
        <div className='row p-8'>
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
              <div className='grid grid-cols-1 gap-6'>
                <div className='bg-light p-4 rounded-3xl shadow'>
                  <div className='font-bold text-lg mb-2 heading-bar'>Price Details</div>
                  <div className='flex justify-between mt-4'>
                    <div>SellerName :</div>
                    <div className='font-bold'>{sellerBids.sellerName}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>MRP :</div>
                    <div className='font-bold'>{sellerBids.mrp}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>Bid Price :</div>
                    <div className='font-bold'>{sellerBids.bidprice}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>City :</div>
                    <div className='font-bold'>{sellerBids.city}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>Delivery Charge :</div>
                    <div className='font-bold'>{sellerBids.deliveryCharge}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>Warranty Months :</div>
                    <div className='font-bold'>{sellerBids.warrantymonths}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>Total Amount :</div>
                    <div className='font-bold'>{sellerBids.total}</div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <div>Special note :</div>
                    <div className='font-bold'>{sellerBids.specialnote}</div>
                  </div>
                  <button className='btn p-2 rounded-full border-dark rounded-pill btn-primary mt-2' onClick={() => setShowModal(true)}>
                    Accept Bid
                  </button>
                </div>
              </div>
            </div>
            <div className='w-7/12 p-5'>
              <div className='bg-light p-4 rounded-3xl shadow m-5'>
                <div className='flex align-items-center gap-2'>
                  <div className='space-x-4' style={{
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
                    <div className='fw-bold'>Shoo</div>
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

        {/* Confirmation Modal */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">Confirm Accept Bid</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to accept this bid?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAcceptBid}>Accept</button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center border border-dark' style={{ borderRadius: '25px', }}>
          <div className='' style={{
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
          <div className='' style={{
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
              200
            </div>
            <div className='h-10 w-10'>Total Bids</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pages;
