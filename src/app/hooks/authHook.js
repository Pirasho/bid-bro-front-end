 "use client"
 import { useEffect } from 'react';
 import { useRouter } from 'next/router';
 
 const useAuth = () => {
   const router = useRouter();
 
   useEffect(() => {
     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
 
     if (!userDetails) {
       router.push('/customer/signin');
     }
   }, [router]);
 };
 
 export default useAuth; // Make sure this line exists
