"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GetAuctionFullDetails, GetSellerbids } from '../../../../../redux/action/bidding_details';
import { useParams } from 'next/navigation';
import Navbar from '../../../widgets/navbar/navbar';
import Chatbot from '../../../widgets/chatbot/page';
import Footer from '../../../widgets/footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import NoResult from '../../../components/NoResult';
import { GetProductDetails } from '../../../../../redux/action/product';

function Pages() {
  const router = useRouter();
  const { product_id } = useParams();

  let { auction_id } = useParams();
  const [auction, setAuction] = useState({});
  const [sellerBids, setSellerBids] = useState([]);
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    console.log('Product Image URL:', auction.productImage);


    console.log('auction_id' + auction_id);
    // Extract 'auction_id' from query params
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        if (userId && auction_id) {
          GetAuctionFullDetails(auction_id, (response) => {
            if (response.status === 200) {
              setAuction('Auction Data:', response.data);
            } else {
              console.error("Failed to fetch auction details", response);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching auction details", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    GetProductDetails((response) => {
      if (response && response.status === 200) {
        const products = response.data;
        const filteredProduct = products.find(pro => pro._id === product_id);
        if (filteredProduct) {
          setProduct(filteredProduct);
        } else {
          console.error("Product not found with id:", product_id);
        }
      } else {
        console.error("Failed to fetch Product details", response);
      }
    });
  }, [product_id]);

  const getUserId = () => {
    const storedUserDetails = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(storedUserDetails);
    return userDetails?.id;
  };

  useEffect(() => {
    GetSellerbids(auction_id, (response) => {
      if (response.status === 200) {
        setSellerBids(response.data);
      } else {
        console.error("Failed to fetch seller bids", response);
      }
    });
  }, []);

  return (
    <div className='h-full w-full'>
      <Navbar />
      <div className=' btn  btn-primary ms-4' onClick={() => router.push("/customer/bidnotification")}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back
      </div>
      <div className='p-10 flex flex-col md:flex-row'>
        <Chatbot />
        <div className='flex flex-col w-full md:w-1/3 gap-8 items-center'>

          <div className='text-3xl font-bold'>{auction.productName}</div>

          {/* <Image
            src={
              product.image.startsWith("http")
                ? product.image
                : `http://localhost:5000/${product.image}`
            }
            alt={product.name}
            width={350}
            height={350}
            className=' '
          /> */}
        </div>
        <div className='flex flex-col w-full md:w-2/3 pt-10'>
          <div className='rounded-3xl flex flex-col m-3 p-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 bg-white p-5 rounded-3xl lg:grid-cols-3 gap-6' style={{ borderBottom: '6px solid #8006be' }}>
              <div className='flex justify-start gap-2'>
                <div className='font-bold'>No of Units:</div>
                <div>{auction.noOfUnits}</div>
              </div>
              <div className='flex justify-start gap-2'>
                <div className='font-bold'>Expected Price:</div>
                <div>{auction.expectedPrice}</div>
              </div>
              <div className='flex justify-start gap-2'>
                <div className='font-bold'>Description:</div>
                <div>{auction.description}</div>
              </div>
            </div>
          </div>
          <div className='bg-white p-5 rounded-3xl shadow' style={{ borderBottom: '6px solid #8006be' }}>
            <div className='flex justify-between items-center mb-4'>
              <div>
                <div className='text-2xl font-bold'>SELLER BIDDING LIST</div>
                <div className='text-primary'>Sellers with 4+ ratings are 80% more likely to win a bid.</div>
              </div>
            </div>
            {sellerBids.length === 0 ? <NoResult title='NO SELLER BIDDING Yet!' /> :
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                  sellerBids.map((bid, index) => (
                    <div key={index} className='bg-light p-4 rounded-3xl shadow' style={{ borderBottom: '6px solid #8006be' }}>
                      <div className='font-bold text-lg mb-2'>{bid.sellerName}</div>
                      <div className='font-bold text-lg'>Rs.{bid.bidprice}</div>
                      <div className='flex justify-between mt-2'>
                        <div>MRP:</div>
                        <div className='font-bold'>Rs.{bid.mrp}</div>
                      </div>
                      <div className='flex justify-between mt-2'>
                        <div>You save:</div>
                        <div className='font-bold'>Rs.{bid.saving}</div>
                      </div>
                      <div className='d-flex justify-center mt-2'>
                        <button className='btn p-2 btn-primary' onClick={() => router.push(`/customer/place_order/${auction_id}/${bid._id}`)}>
                          Show Bid Details
                        </button>
                      </div>
                    </div>
                  ))}

              </div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pages;
