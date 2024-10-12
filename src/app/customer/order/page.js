
import React from 'react';
// import /Image from 'next/image';

import Chatbot from '../../widgets/chatbot/page';
import Navbar from '../../widgets/navbar/navbar';
import Footer from '../../widgets/footer/footer';


function Pages() {

   return (


       <div className='h-full w-full' >
           <Navbar/>
           <div className='p-10 flex'>
        <Chatbot/>

               <div className='flex flex-col  gap-8 items-center'>
                   <div className='text-3xl font-bold'>Order History</div>
               </div>
               <div className='flex flex-col  pt-20 gap-5'>
                   <div className=' rounded-3xl flex flex-col m-1 p-2'>
                       <div className='text-2xl font-bold'>iphone 12</div>
                       <br />
                       
                       <div className="b p-5 bg-white rounded-3xl shadow-xl"style={{ borderBottom: '6px solid  #8006be' }}>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>No of Units :</div>
                               <div>1</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Get anount :</div>
                               <div>179000</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Per / MRP :</div>
                               <div>185000</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Seller num :</div>
                               <div>Starlin - #980156</div>
                           </div>
                       </div>
                   </div>
                   <div className=' rounded-3xl flex flex-col m-1 p-2'>
                       <div className='text-2xl font-bold'>iphone 14 pro</div>
                       <br />
                       <div className=" p-5 bg-white rounded-3xl shadow-xl"style={{ borderBottom: '6px solid  #8006be' }}>
                       <div className='flex justify-start gap-2'>
                               <div className='font-bold'>No of Units :</div>
                               <div>2</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Get amount :</div>
                               <div>430000</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Per / MRP :</div>
                               <div>240000</div>
                           </div>
                           <div className='flex justify-start gap-2'>
                               <div className='font-bold'>Seller num :</div>
                               <div>Antony - #9801234</div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
<Footer/>

       </div>
   );
}

export default Pages;



