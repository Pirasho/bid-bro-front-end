"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import '../../../../../public/styles.css';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    setisLoading(true);
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('Sign in successful:', result);

      // Store user details in local storage
      localStorage.setItem('sellerDetails', JSON.stringify({
        email: result.email,
        id: result._id,
        name:result.name,
        phone:result.phone,
        profileUrl:result.profileUrl,
        shop_name:result.shop_name
      }));
      

      // Redirect or handle successful sign-in here
      window.location.href = '/sellerDashboard/home'; 
    } catch (error) {
      setError(error.message);
    }
    finally {
      setisLoading(false);
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="container md:p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card  p-4">
              <div className="d-flex justify-between align-center">
                <p className="fw-bold  fs-2 md:fs-1 text-body-secondary heading-with-bar">Seller Login</p>
                <div className="d-flex justify-center align-center">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={100}
                    height={50}
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className=' fs-1'>Hello, <span className=' fw-bold'>Welcome!</span></div>
              <div className="">
                <form onSubmit={handleSubmit}>
                  {/* Render error message if it exists */}
                  {error && <div className="alert alert-danger p-1">{error}</div>}
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label fs-4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="loginPassword" className="form-label fs-4">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Link href="/forgot-password" className=' text-decoration-none d-flex justify-end mt-2'>
                    <span className="font-bold text-danger">Forgot Password</span>
                  </Link>
                  <button
                    type="submit"
                    className={`btn btn-primary w-full mt-4 ${isLoading ? 'disabled' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>


                  <div className=" mt-4 text-center">
                    <div>Don't have an account?
                      <Link href="/sellerDashboard/auth/register" className="text-primary">
                        <span className="font-bold text-purple-900">Register</span>
                      </Link>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
