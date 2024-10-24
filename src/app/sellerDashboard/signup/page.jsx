"use client";
import { useState } from "react";
import axios from 'axios';
import Link from "next/link";
import '../../styles/home.css';


export default function Page() {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [shopname, setShopname] = useState('');
  const [shopaddress, setShopaddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState(null);


  const signup = async (e) => {
    e.preventDefault();

    try {

      const postdata = {
        "name": name,
        "address": address,
        "shopname": shopname,
        "shopaddress": shopaddress,
        "username": username,
        "password": password,
        "document": document
      };

      const res = await axios.post('http://localhost:5002/api/sell/seller/signup', postdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const resdat = await res.data;
      console.log(resdat);
      alert('SignUp Success !')
      window.location.reload();

    } catch (error) {

      console.log('Main Error', error);
      alert('SignUp Failed ! Try Again')

    }

  };


  return (
    <div className="flex bg-white body">
      <div className="flex-grow maincontent" style={{ backgroundColor: 'rgba(62, 98, 151, 0.103)' }}>
        <div className="flex flex-col items-center justify-center p-10">

          <div className="card bid shadow-brown rounded-lg overflow-hidden bg-white" style={{ width: '30%' }}>
            <div style={{ height: '35rem', paddingTop: '2rem', padding: '1rem' }}>

              <h3 className="text-[#073857] text-xl font-bold text-center group-hover:animate-fade-in-up">SIGN UP</h3>

              <div style={{ marginTop: '2rem'}}>
                <table>
                  <tbody>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Name</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%'}}
                          type="text" onChange={(e) => setName(e.target.value)} value={name} />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Address</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%'}}
                          type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Shop Name</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%' }}
                          type="text" onChange={(e) => setShopname(e.target.value)} value={shopname} />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Shop Address</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%' }}
                          type="text" onChange={(e) => setShopaddress(e.target.value)} value={shopaddress} />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Username</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%' }}
                          type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '30%', padding: '0.3rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#073857' }}>Password</td>
                      <td style={{ padding: '0.3rem' }}>
                        <input className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#073857]" style={{ paddingLeft: '0.5rem',  fontSize: '0.8rem', width:'100%' }}
                          type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '0.8rem', color: 'red', fontWeight: 'bold' }}>Shop Registered Document Upload</h3>
                <input type="file" style={{ marginTop: '0.3rem' }} onChange={(e) => setDocument(e.target.files[0])} />
              </div>

              <div style={{ backgroundColor: 'rgb(94, 16, 94)', marginTop: '2rem', padding: '0.3rem', cursor:'pointer'}} onClick={signup}>
                <h3 className="font-bold text-center" style={{ fontSize: '1rem', color: 'white' }}>SIGNUP</h3>
              </div>

              <h3 className="text-center" style={{ fontSize: '0.8rem', color: 'black', marginTop: '1rem' }}>Back to Login?</h3>
              <Link href={'/'}>
                <h3 className="font-bold text-center" style={{ fontSize: '0.9rem', color: 'red', marginTop: '0.3rem' }}>SIGNIN</h3>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );


}
