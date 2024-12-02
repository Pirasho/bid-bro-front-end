"use client";
import { useState } from "react";
import axios from 'axios';
import Link from "next/link";
import './../styles/home.css';
import { useRouter } from "next/navigation";


export default function Page() {

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const login = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.get('http://localhost:5002/api/sell/seller/findUser/' + username);
      const resdat = await res.data;

      if (resdat.length == 0) {
        alert('Login Failed ! Incorrect Username or Password');

      } else {

        if (resdat[0] === password) {
          router.push('/home')
          alert('Login Success');
        } else {
          alert('Login Failed ! Incorrect Username or Password');
        }
      }

    } catch (error) {

      console.log('Main Error', error);
      alert('Login Failed ! Try Again Later')

    }

  };


  return (
    <div className="flex bg-white body">
      <div className="flex-grow maincontent" style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' }}>
        <div className="flex flex-col items-center justify-center p-20">

          <div className="card bid shadow-brown rounded-lg overflow-hidden bg-white" style={{ width: '30%' }}>
            <div style={{ height: '20rem', paddingTop: '2rem', padding: '1rem' }}>

              <h3 className="text-[#073857] text-xl font-bold text-center group-hover:animate-fade-in-up">SIGN IN</h3>

              <div className="flex" style={{ marginTop: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                <label className="block font-bold text-[#073857] mr-2">Username</label>
                <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem', fontSize: '0.8rem' }}
                  type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>

              <div className="flex" style={{ marginTop: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                <label className="block font-bold text-[#073857] mr-3">Password</label>
                <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem', fontSize: '0.8rem' }}
                  type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>

              <div style={{ backgroundColor: 'rgb(94, 16, 94)', marginTop: '2rem', padding: '0.3rem', cursor: 'pointer' }} onClick={login}>
                <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>LOGIN</h3>
              </div>

              <h3 className="text-center" style={{ fontSize: '0.8rem', color: 'black', marginTop: '1rem' }}>Don't you have an account?</h3>
              <Link href={'/signup'}>
                <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', color: 'red', marginTop: '0.3rem' }}>SIGNUP</h3>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );


}
