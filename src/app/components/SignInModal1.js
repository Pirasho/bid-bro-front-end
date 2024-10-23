'use client';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const SignInModal = ({ isOpen, onClose }) => {
  const router = useRouter(); // Initialize useRouter
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

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Sign-in failed');
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Sign-in successful:', data);
      setSuccess('Sign-in successful');

      // Reset form fields
      setEmail('');
      setPassword('');
      setError('');

      // Navigate to the /adminfro page after successful sign-in
      router.push('/adminfro');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('Sign-in failed');
    } finally {
      setLoading(false); // Stop loading after completion
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"> {/* Dark background for overlay */}
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 max-w-md w-full"> {/* Semi-transparent modal background */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          &times; {/* Close icon */}
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">Don't have an account? <a href="/components/RegistrationModel" className="text-blue-500 hover:underline">Register</a></p>
          <p className="text-sm"><a href="#" className="text-blue-500 hover:underline">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
