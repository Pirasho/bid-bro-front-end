"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import '../../styles/home.css';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";


export default function Page() {

  const [fetchArray, setFetchArray] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await axios.get('http://localhost:5002/api/sell/seller/getReceipt');
        const resdata = await res.data;
        setFetchArray(resdata);
        setLoading(false);

      } catch (error) {
        console.log('Main Error', error);
        setLoading(false);
      }

    };
    fetchData();

  }, []);


  return (
    <div className="flex bg-white body">

      <div className="sidebar w-64">
        <Sidebar />
      </div>

      <div className="flex-grow" style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' }}>
        <Navbar />

        <div className="p-5" style={{ backgroundColor: 'rgb(94, 16, 94)' }}>
        </div>

        <div className="flex flex-col items-center justify-center p-6">

          <h2 className="font-bold mb-3 text-center text-[rgb(62 97 151)]" style={{ fontSize: '1.2rem' }}>RECEIPT LIST</h2>

          {!loading && (
            <div className="container flex sm:flex-row">

              {fetchArray.map((item) => {

                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.image.data.data))
                );

                return (

                  <Link href={''} key={item._id} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
                    style={{ width: '15rem' }}>

                    <div style={{ backgroundColor: 'rgb(114, 4, 50)', padding: '0.3rem' }}>
                      <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>PAY RECEIPT</h3>
                      <h3 className="text-center" style={{ fontSize: '0.8rem', color: 'gray' }}>ELECTRO BID HUB</h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '0.5rem', height: '5rem', width: '4rem', paddingTop: '1rem' }}>
                        <Image src={`data:image/png;base64,${base64String}`} alt="" className="image" width={0} height={0} />
                      </div>
                    </div>

                    <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                      <h3 className="text-[#073857] font-bold text-center" style={{ color: 'gray', textTransform: 'uppercase'}}>{item.product}</h3>

                      <h3 className="text-[#073857]" style={{ color: 'gray', fontSize: '0.8rem', marginTop: '1rem', textTransform: 'uppercase'}}>MODAL - <span style={{ fontWeight: 'bold', color: 'black' }}>{item.model}</span></h3>
                      <h3 className="text-[#073857]" style={{ color: 'gray', fontSize: '0.8rem', textTransform: 'uppercase'}}>VERSION - <span style={{ fontWeight: 'bold', color: 'black' }}>{item.version}</span></h3>
                      <h3 className="text-[#073857]" style={{ color: 'gray', fontSize: '0.8rem', textTransform: 'uppercase'}}>COLOR - <span style={{ fontWeight: 'bold', color: 'black' }}>{item.color}</span></h3>

                      <hr style={{ marginTop: '0.5rem', padding: '0.2px', backgroundColor: 'black' }} />
                      <h3 className="font-bold" style={{ fontSize: '0.9rem', color: 'gray' }}>SALES PRICE - <span style={{ color: 'black' }}>LKR.{item.sellp}</span></h3>
                      <hr style={{ marginBottom: '0.5rem', padding: '0.5px', backgroundColor: 'black' }} />

                      <h3 style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1rem' }}>DELIVERY DESTINATION</h3>
                      <h3 className="font-bold" style={{ fontSize: '0.8rem', color: 'black' }}>{item.daddress}</h3>

                      <h3 style={{ fontSize: '0.8rem', color: 'gray', marginTop: '0.5rem' }}>DELIVERY FEES</h3>
                      <h3 className="font-bold" style={{ fontSize: '0.8rem', color: 'black' }}>LKR. {item.dfees}</h3>

                      <h3 style={{ fontSize: '0.8rem', color: 'gray', marginTop: '0.5rem' }}>DELIVERY DATE</h3>
                      <h3 className="font-bold flex" style={{ fontSize: '0.8rem', color: 'black', textTransform: 'uppercase'}}><FaRegCalendarAlt size={16} className="mr-1" />{item.date}</h3>

                      <hr style={{ marginTop: '0.5rem', padding: '0.5px', backgroundColor: 'black' }} />

                      <div style={{ margin: '1rem', backgroundColor: 'rgb(6, 60, 6)', padding: '0.2rem', borderRadius: '1rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CARD PAY</h4>
                      </div>

                    </div>

                  </Link>

                )

              })}

            </div>
          )}

          {loading && (
            <div style={{ marginTop: '2rem' }}>
              <Loading />
            </div>
          )}

        </div>

      </div>

    </div>
  );


}
