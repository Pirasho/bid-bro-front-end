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
import { IoIosCloseCircle } from "react-icons/io";


export default function Home() {

  const [fetchArray, setFetchArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalshow, setModalshow] = useState(false);

  const [sellp, setSellp] = useState('');
  const [period, setPeriod] = useState('');
  const [type, setType] = useState('');
  const [discount, setDiscount] = useState('');
  const [note, setNote] = useState('');

  const [mimage, setMimage] = useState('');
  const [mproduct, setMproduct] = useState('');
  const [mmodel, setMmodel] = useState('');
  const [mversion, setMversion] = useState('');
  const [mcolor, setMcolor] = useState('');
  const [mmrp, setMmrp] = useState('');


  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await axios.get('http://localhost:5002/api/sell/seller/getBid');
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


  const show = (e, item) => {
    e.preventDefault();
    setModalshow(true);

    const mbase64= btoa(
      String.fromCharCode(...new Uint8Array(item.image.data.data))
    );

    setMimage(mbase64)
    setMproduct(item.product)
    setMmodel(item.model)
    setMversion(item.version)
    setMcolor(item.color)
    setMmrp(item.mrp)

  }

  const cancel = (e) => {
    e.preventDefault();
    setModalshow(false);

    setSellp('')
    setPeriod('')
    setType('')
    setDiscount('')
    setNote('')

  }

  const send = async (e) => {
    e.preventDefault();

    try {

        const postdata = {
            "product": mproduct,
            "model": mmodel,
            "version": mversion,
            "color": mcolor,
            "mrp": mmrp,
            "sellp": sellp,
            "period": period,
            "type": type,
            "discount": discount,
            "note": note,
        };

        const res = await axios.post('http://localhost:5002/api/sell/seller/postrespond', postdata, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const resdat = await res.data;
        console.log(resdat);
        alert('Process Success !')
        window.location.reload();

    } catch (error) {

        console.log('Main Error', error);
        alert('Failed ! Try Again')

    }

  };


  return (
    <div className="flex bg-white body">

      <div className="sidebar w-64">
        <Sidebar />
      </div>

      <div className="flex-grow maincontent" style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' }}>
        <Navbar />

        <div className="p-5" style={{ backgroundColor: 'rgb(94, 16, 94)' }}>
        </div>

        {!modalshow && (
          <div className="flex flex-col items-center justify-center p-6">

            <h2 className="font-bold mb-3 text-center text-[rgb(62 97 151)]" style={{ fontSize: '1.2rem' }}>BIDDING LIST</h2>

            {!loading && (
              <div className="container flex sm:flex-row">

                {fetchArray.map((item) => {

                  const base64String = btoa(
                    String.fromCharCode(...new Uint8Array(item.image.data.data))
                  );

                  return (
                    <div key={item._id} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white">

                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ padding: '0.5rem', height: '10rem', width: '10rem', paddingTop: '2rem' }}>
                          <Image src={`data:image/png;base64,${base64String}`} alt="" className="image" width={0} height={0} />
                        </div>
                      </div>

                      <div style={{ height: '11rem' }}>
                        <h3 className="text-[#073857] text-xl font-bold text-center group-hover:animate-fade-in-up"
                          style={{ textTransform: 'uppercase' }}>{item.product}</h3>

                        <div style={{ backgroundColor: 'rgb(167, 146, 7)', padding: '0.3rem', color: 'white' }}>
                          <h3 className="text-center">MRP Price - LKR. {item.mrp}</h3>
                        </div>

                        <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'gray' }}>MODEL  {item.model}</h3>
                        <h3 className="font-bold text-center" style={{ fontSize: '0.7rem', color: 'rgb(117, 102, 6)', textTransform: 'uppercase' }}>VERSION {item.version} - {item.color} COLOR</h3>

                        <h3 className="flex font-bold  text-center" style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'rgb(56, 55, 55)', justifyContent: 'center', textTransform: 'uppercase' }}>
                          <FaRegCalendarAlt size={16} className="mr-1" />{item.date}
                        </h3>

                        <Link href={''}>
                          <div style={{ backgroundColor: 'rgb(94, 16, 94)', marginTop: '0.5rem', padding: '0.3rem' }} onClick={(e) => show(e, item)}>
                            <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>RESPOND</h3>
                          </div>
                        </Link>

                      </div>

                    </div>
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
        )}


        {modalshow && (
          <div className="flex flex-col items-center justify-center p-6">

            <h2 className="font-bold mb-3 text-center text-[rgb(62 97 151)]" style={{ fontSize: '1.2rem' }}>SELLER RESPOND</h2>

            <div className="container flex sm:flex-row">

              <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
                style={{ width: '50%' }}>

                <div style={{ display: 'flex', justifyContent: 'end'}}>
                  <IoIosCloseCircle size={30} className="mr-2" color="red" onClick={cancel} />
                </div>

                <div className="flex">

                  <div style={{ width: '30%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '0.5rem', height: '12rem', width: '12rem', paddingTop: '2rem' }}>
                        <Image src={`data:image/png;base64,${mimage}`} alt="" className="image" width={0} height={0} />
                      </div>
                    </div>
                  </div>

                  <div style={{ width: '70%', paddingTop: '2rem', padding: '1rem' }}>

                    <h3 className="text-[#073857] text-xl font-bold text-center group-hover:animate-fade-in-up"
                      style={{ textTransform: 'uppercase' }}>{mproduct}</h3>

                    <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'gray' }}>MODEL - {mmodel}</h3>
                    <h3 className="font-bold text-center" style={{ fontSize: '0.7rem', color: 'rgb(117, 102, 6)', textTransform: 'uppercase' }}>VERSION {mversion} - {mcolor} COLOR</h3>

                    <div style={{ backgroundColor: 'rgb(94, 16, 94)', padding: '0.3rem', color: 'white', marginTop: '1rem' }}>
                      <h3 className="text-center">MRP Price - LKR. {mmrp}</h3>
                    </div>

                    <div className="flex" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                      <label className="block font-bold text-[#073857] mr-2">Seller Price</label>
                      <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]"
                        placeholder="LKR." style={{ paddingLeft: '0.5rem' }}
                        type="text" onChange={(e) => setSellp(e.target.value)} value={sellp} />
                    </div>

                  </div>

                </div>

                <div style={{ padding: '1rem', backgroundColor: 'rgba(248, 220, 248, 0.507)' }}>
                  <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', color: 'gray' }}>WARRANTY INFO</h3>

                  <div className="flex">

                    <div className="flex" style={{ marginTop: '1rem', fontSize: '0.9rem', width: '40%', marginRight: '2rem' }}>
                      <label className="block font-bold text-[purple] mr-2">Period</label>
                      <select className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" style={{ width: '80%' }}
                        onChange={(e) => setPeriod(e.target.value)} value={period} >
                        <option value="">warranty months</option>
                        <option value="01-03 months">01-03 months</option>
                        <option value="01-06 months">01-06 months</option>
                        <option value="01-12 months">01-12 months</option>
                        <option value="02 years">02 years</option>
                      </select>
                    </div>

                    <div className="flex" style={{ marginTop: '1rem', fontSize: '0.9rem', width: '40%', marginRight: '2rem' }}>
                      <label className="block font-bold  text-[purple] mr-2">Type</label>
                      <select className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" style={{ width: '80%' }}
                        onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="">warranty type</option>
                        <option value="full damage">full damage</option>
                        <option value="screen damage">screen damage</option>
                        <option value="battery issues">battery issues</option>
                      </select>
                    </div>

                  </div>

                  <div className="flex">

                    <div className="flex" style={{ marginTop: '1rem', fontSize: '0.9rem', width: '40%', marginRight: '2rem' }}>
                      <label className="block font-bold text-[purple] mr-2">Discount</label>
                      <select className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#804f0e]" style={{ width: '80%' }}
                        onChange={(e) => setDiscount(e.target.value)} value={discount}>
                        <option value="">percentage</option>
                        <option value="12%">12%</option>
                        <option value="20%">20%</option>
                        <option value="35%">35%</option>
                      </select>
                    </div>

                  </div>

                  <div className="flex" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    <label className="block font-bold text-[purple] mr-2">Special Note</label>
                    <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[purple]" style={{ width: '70%', paddingLeft: '0.5rem' }}
                      placeholder="enter notes" type="text" onChange={(e) => setNote(e.target.value)} value={note} />
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'purple', padding: '0.3rem', width: '50%', borderRadius: '1rem' }} onClick={send}>
                      <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>SEND</h3>
                    </div>
                  </div>

                </div>

              </Link>

            </div>

          </div>
        )}

      </div>
    </div>
  );


}
