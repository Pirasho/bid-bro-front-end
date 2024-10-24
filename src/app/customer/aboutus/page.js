import React from 'react';
import Image from 'next/image';
import Chatbot from '../../widgets/chatbot/page';
import Navbar from '../../widgets/navbar/navbar';
import Footer from '../../widgets/footer/footer';


function Pages() {
    return (
        <div className='h-full w-full' >
            <Navbar />
            <div className='flex flex-col  pt-10 gap-5'>
                <Chatbot />

                <div className=' rounded-3xl gap-5 flex flex-col m-3 p-5'>
                    <div className="flex justify-center items-center">
                        <Image
                            src="/images/about.png"
                            alt="Profile Photo"
                            width={550}  
                            height={550}  
                            className="object-contain"
                        />
                    </div>

                    <div className='text-2xl  font-bold '>About Us</div>
                    <div className=" p-5 bg-white  rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                        At Broo, our mission is to revolutionize the way electronic products are bought and sold by introducing a unique reverse auction model. We aim to provide our customers with the best deals on high-margin electronic products, while offering sellers a platform to reach a broader audience and achieve higher sales.
                    </div>
                    <div className='text-2xl  font-bold '>Our Mission</div>
                    <div className=" p-5 bg-white  rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                        <div className="font-bold">At Bro,</div>
                        we are passionate about creating a dynamic and user-friendly online marketplace where buyers
                        and sellers can connect seamlessly.
                        Inspired by platforms like JingleBid, we offer a unique and engaging auction experience designed
                        to meet the needs of modern consumers and businesses.
                    </div>
                    <div className='text-2xl  font-bold '>Our Vision</div>
                    <div className=" p-5 bg-white  rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                        <div className="font-bold">At Bro,</div>
                        We envision a future where consumers have access to premium electronic products at unbeatable prices through our innovative reverse auction system. Our platform is designed to create a dynamic and competitive marketplace where transparency, efficiency, and customer satisfaction are our top priorities.
                    </div>
                    <div className='text-2xl  font-bold '>Our Values</div>
                    <div className=" p-5 bg-white  rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>

                        <ul className="list-disc pl-5 text-[#4B5563]">
                            <li className="mb-2">Innovation: Continuously improving our platform to enhance user experience.</li>
                            <li className="mb-2">Integrity: Ensuring fair and transparent transactions for all users.</li>
                            <li className="mb-2">Customer Focus: Prioritizing the needs and satisfaction of our customers.</li>
                            <li className="mb-2">Excellence: Delivering high-quality service and support at every step.</li>
                        </ul>
                    </div>



                    <div className='text-2xl font-bold'> How can we help you? </div>

                    <div className=" p-5 bg-white rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                        <div className="font-bold">Who We Are</div>
                        <br />
                        Founded in 2024, Bro was built on the belief that everyone deserves a fair and exciting way to buy
                        and sell goods. Our team comprises tech enthusiasts, market experts,
                        and customer service professionals dedicated to providing a platform that is both innovative and easy to use.
                        <br />
                        <br />

                        <br />
                        <div className="font-bold">What We Offer</div>
                        <br />
                        Diverse Listings: From electronics and collectibles to fashion and home goods, our platform offers a wide range of categories to suit every interest and need.
                        Secure Transactions: We prioritize the security of our users by implementing industry-leading encryption and payment protection measures.
                        User-Friendly Interface: Whether you are a first-time bidder or a seasoned seller, our intuitive design ensures a seamless experience from registration to final bid.
                        Competitive Bidding: Engage in thrilling auctions where competitive bidding drives the excitement, and every participant has a chance to win.
                        Real-Time Updates: Stay informed with live updates on bids and auctions, ensuring you never miss an opportunity.
                        Customer Support: Our dedicated support team is here to assist you 24/7 with any questions or issues you may encounter.
                        <br />
                        <br />
                    </div>
                    <div className=" p-5 bg-white rounded-3xl shadow-xl" style={{ borderBottom: '6px solid  #8006be' }}>
                        <div className="font-bold">Why Choose Us?
                        </div>
                        <br />
                        Transparency: We are committed to maintaining a transparent auction process where all bids are visible, and every transaction is traceable.
                        Innovation: Continually improving our platform with the latest technology to enhance user experience and security.
                        Community: Building a community of trusted buyers and sellers through robust user verification and feedback systems.

                        <br />
                        <div className="font-bold">Join Us</div>
                        <br />
                        Discover the thrill of online auctions with [Your Platform Name]. Whether you’re looking to score a great deal or sell your items to a wider audience, we invite you to join our community and start bidding today!
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Pages;



