"use client";
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons

const RegisterCustomer = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      setLoading(false); // Stop loading
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password.length < 6) { // Password strength check
      setError('Password must be at least 6 characters long');
      setLoading(false);
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
        setLoading(false);
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
    } finally {
      setLoading(false); // Stop loading after completion
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60" tabIndex={-1}>
    <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 max-w-md w-full">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
        &times; {/* Close icon */}
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <FaEnvelope className="text-gray-600 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <FaLock className="text-gray-600 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-10 rounded w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm">Already have an account? <a href="../pages/signin" className="text-blue-500 hover:underline">Sign In</a></p>
      </div>
    </div>
  </div>
);

};

export default RegisterCustomer;
