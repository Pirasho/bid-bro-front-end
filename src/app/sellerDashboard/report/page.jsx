import Link from "next/link";
import Image from "next/image";

import iphone from '../images/iphone.jpg';
import ac from '../images/ac.jpg';
import tv from '../images/tv.jpg';
import fridge from '../images/fridge.jpg';
import washing from '../images/washing.webp';
import lap from '../images/lap.jpg';
import { FaRegCalendarAlt } from "react-icons/fa";

import '../../styles/home.css';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";


export default function Page() {

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

          <h2 className="font-bold mb-3 text-center text-[rgb(62 97 151)]" style={{ fontSize: '1.2rem' }}>SALES REPORT</h2>

          <div className="container flex sm:flex-row">

            <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ width: '40%', paddingTop: '1rem' }}>

              <h3 className="text-[darkblue] text-xl font-bold text-center">PRODUCT SALES</h3>

              <div style={{ padding: '1rem' }}>
                <BarChart />
              </div>

            </Link>

            <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ width: '40%', paddingTop: '1rem' }}>

              <h3 className="text-[darkblue] text-xl font-bold text-center">DAILY SALES</h3>

              <div style={{ padding: '1rem' }}>
                <LineChart />
              </div>

            </Link>

          </div>

          <div className="container flex sm:flex-row" style={{marginTop:'1rem'}}>

            <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ width: '30%' }}>

              <div style={{ backgroundColor: 'green', padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>DELIVERED ORDERS</h3>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '3rem'}}>42</h3>
              </div>

            </Link>

            <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ width: '30%' }}>

              <div style={{ backgroundColor: 'rgb(179, 141, 3)', padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>PENDING ORDERS</h3>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '3rem'}}>12</h3>
              </div>

            </Link>

            <Link href={''} className="card bid sm:w-80 sm:h-100 shadow-brown rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              style={{ width: '30%' }}>

              <div style={{ backgroundColor: 'rgb(114, 4, 50)', padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>RIJECTED ORDERS</h3>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 className="font-bold text-center" style={{ fontSize: '3rem'}}>18</h3>
              </div>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );

}
