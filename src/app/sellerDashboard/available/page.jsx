"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

import Link from "next/link";
import Image from "next/image";
import available from '../images/available.png';
import '../../styles/home.css';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { BsClipboardPulse } from "react-icons/bs";
import '../../../../public/styles.css'


export default function Page() {

  const [fetchArray, setFetchArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await axios.get('http://localhost:8000/api/seller/getAvailable');
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

      <div className="flex-grow" style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' ,marginLeft:'16rem'}}>
        <Navbar />

        <div className="mx-2">
        <div className="heading-bar-seller " >    <BsClipboardPulse size={21} className="mr-2" /> Available Products</div>
      </div>

        <div className="flex flex-col items-center justify-center p-6">

          {!loading && (
            <div className="container flex sm:flex-row">

              {fetchArray.map((item) => {

                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.image.data.data))
                );

                return (

                  <Link href={''} key={item._id} className="card bid sm:w-80 sm:h-90 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white">

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '0.5rem', height: '10rem', width: '10rem', paddingTop: '2rem' }}>
                        <Image src={`data:image/png;base64,${base64String}`} alt="" className="image" width={0} height={0} />
                      </div>
                    </div>

                    <div style={{ height: '8rem' }}>
                      <h3 className="text-[#073857] text-xl font-bold text-center group-hover:animate-fade-in-up" style={{textTransform: 'uppercase'}}>{item.product}</h3>

                      <div style={{ backgroundColor: 'rgb(128,6,190)', padding: '0.3rem', color: 'white' }}>
                        <h3 className="text-center">MRF Price - LKR. {item.mrp}</h3>
                      </div>

                      <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'gray' }}>MODEL {item.model}</h3>
                      <h3 className="font-bold text-center" style={{ fontSize: '0.8rem', color: 'rgb(117, 102, 6)', textTransform: 'uppercase'}}>VERSION - {item.version}</h3>
                      <h3 className="font-bold text-center" style={{ fontSize: '0.8rem', color: 'rgb(117, 102, 6)', textTransform: 'uppercase'}}>COLOR - {item.color} </h3>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '0.5rem', height: '8rem', width: '10rem' }}>
                        <Image src={available} alt="" className="image" />
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
