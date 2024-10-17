"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AuctionModal from '../../auction/page'; // Adjust the path as needed
import GetAllProduct from '../../auction/page'; // Adjust the path as needed
import { useParams, useRouter } from 'next/navigation';
import { GetProductDetails } from '../../../../../redux/action/product';
import Navbar from '../../../widgets/navbar/navbar';
import Footer from '../../../widgets/footer/footer';
import Chatbot from '../../../widgets/chatbot/page';

function Pages() {
  const [showModal, setShowModal] = useState(false);
const router = useRouter();

const handleClick = () => {
  setShowModal(true);
  // router.push(`/customer/product_details/${auct._id}`);
};

  const { product_id } = useParams();
  console.log("Product id", product_id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    GetProductDetails((response) => {
      if (response.status === 200) {
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


  return (
    <div className='h-full w-full' >
      <Navbar/>
      {product && (
        <div className='p-20  flex'>
          <Chatbot/>
          <div className='flex flex-col w-1/3 gap-5 items-center'>
            <div className='text-3xl font-bold'>{product.name}</div>
            <div className='flex shadow-xl rounded-3xl '>
            <Image
                            src={
                              product.image.startsWith("http")
                                ? product.image
                                : `http://localhost:5000/${product.image}`
                            }
                alt={product.name}
                width={350}
                height={350}
                className=' '
              />
            </div>
          </div>
          <div className='flex flex-col w-2/3 pt-10 gap-5'>
            <div className='flex gap-3 m-3 justify-between items-center'>
              <div className='bg-white flex flex-col justify-center items-center p-5 rounded-3xl shadow-xl border' style={{ borderBottom: '6px solid  #8006be' }}>
                <div className='font-bold text-2xl'>Price insights</div>
                <div>MRP</div>
                <div className='font-bold text-xl'>RS.{product.price}.00</div>
              </div>
              <div className='p-5 bg-white rounded-3xl shadow-xl border' style={{ borderBottom: '6px solid  #8006be' }}>
                <div className='flex flex-col justify-center items-center'>
                  <div className='text-2xl font-bold'>Fast and Free</div>
                  <div>Delivery</div>
                </div>
              </div>
              <div className='rounded-3xl shadow-xl'>
                <button  onClick={handleClick} className='btn p-2 rounded-full border-dark rounded-pill btn-primary'>
                  Get Best Price
                </button>
              </div>
            </div>
            <div className='bg-white rounded-3xl flex flex-col m-3 p-5' style={{ borderBottom: '6px solid  #8006be' }}>
              <div className='text-2xl font-bold'>About</div>
              <div className='flex justify-start gap-2'>
                <div className='font-bold'>Warranty:</div>
                <div>{product.warranty}.Month</div>
              </div>
              <div className='flex justify-start gap-2'>
                <div className='font-bold'>Category:</div>
                <div>{product.category}</div>
              </div>
              <div className='gap-10'>
                <hr />
                <div>
                  <div className='font-bold'>Description</div>
                  <div>{product.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <AuctionModal showModal={showModal} setShowModal={setShowModal} product={product}/>}
      <Footer/>
    </div>
  );
}

export default Pages;
