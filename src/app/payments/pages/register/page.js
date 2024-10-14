"use client";
import { useState } from 'react';
import Header from "../../components/Header";

const RegisterCustomer = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Add username if necessary
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        console.error('Detailed error:', data);
        return;
      }

      console.log('Registration successful:', data);
      setSuccess('Registration successful');

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed');
    }
  };

  return (
    <>
    <Header />
    <div>{children}</div>
    <div className="flex h-screen">
      <div className="w-1/2">
        <img src="/images/6.jpg" alt="Background" className="object-cover h-full w-full" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="container mx-auto">
          <main className="max-w-md mx-auto mt-8">
            <h2 className="text-4xl font-bold mb-4">Registration Form</h2>
            <div className="shadow-md">
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">UserName:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded px-3 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded px-3 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-3 py-1 w-full"
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-8 px-6 rounded w-full">
                  Register
                </button>
              </form>
            </div>
            <div className="text-center">
              <p className="text-sm">Already have an account? <a href="../pages/signin" className="text-blue-500 hover:underline">Sign In</a></p>
            </div>
          </main>
        </div>
      </div>
    </div>
    ,/.</>
  );
};

export default RegisterCustomer;
