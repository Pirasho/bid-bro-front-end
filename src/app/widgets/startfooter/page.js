import React from 'react';
import './Startfooter.css';
import Link from 'next/link';



function Startfooter() {
  return (
    <footer className='bg-[#111]'>
      <div className="FooterContainer">
        <div className="socialIcons">
          <div href="#"><i className="fa-brands fa-facebook"></i></div>
          <div href="#"><i className="fa-brands fa-instagram"></i></div>
          <div href="#"><i className="fa-brands fa-twitter"></i></div>
          <div href="#"><i className="fa-brands fa-google-plus"></i></div>
          <div href="#"><i className="fa-brands fa-youtube"></i></div>
        </div>
        <div className="container mx-auto px-4 text-center">
          {/* <div className="mb-6">
            <h2 className="text-2xl font-bold">Bid Broo</h2>
            <p className="text-sm">Empowering every transaction with a touch of innovation</p>
          </div> */}
           <div className="mb-6">
                    <h2 className="text-2xl text-white font-bold">Bid Broo</h2>
                    <p className="text-sm text-white">Empowering every transaction with a touch of innovation</p>
                </div>
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/customer/startabout" className="text-white hover:text-gray-300">About Us</Link>
            <Link href="" className="text-white hover:text-gray-300">Contact</Link>
            <Link href="/customer/" className="text-white hover:text-gray-300">Privacy Policy</Link>
            <Link href="/customer/custdashboard" className="text-white hover:text-gray-300">Home</Link>
          </div>
          <p className="text-sm text-white">© {new Date().getFullYear()} Bid Broo. All rights reserved.</p>
        </div>
      </div>
      <div className="FooterBottom flex justify-center text-purple-50">
        <p>Copyright &copy;2024; Designed by <span className="designer">BROO</span></p>
      </div>
    </footer>
  );
}

export default Startfooter;
