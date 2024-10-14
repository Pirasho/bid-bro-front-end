'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const SignIn = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
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
        return;
      }

      const data = await response.json();
      console.log('Sign-in successful:', data);
      setSuccess('Sign-in successful');

      // Reset form fields
      setEmail('');
      setPassword('');
      setError('');

      // Redirect to the admin page after successful sign-in
      router.push('/adminfro'); // Use Next.js router to navigate
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('Sign-in failed');
    }
  };

  // Set body background color
  document.body.style.backgroundColor = '#ebebf6';

  return (
    <>
      <div>{children}</div>
      <div className="flex h-screen">
        <div className="w-1/2">
          <img src="/images/6.jpg" alt="Background" className="object-cover h-full w-full" />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="container mx-auto">
            <main className="max-w-md mx-auto mt-8">
              <h2 className="text-4xl font-bold mb-4 text-black">Sign In</h2>
              <div className="shadow-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label htmlFor="remember" className="text-sm">
                        <input type="checkbox" id="remember" className="mr-1" />
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                    </div>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">{success}</p>}
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-8 px-6 rounded w-full">Sign In</button>
                </form>
              </div>
              <div className="text-center">
                <p className="w-full p-4">Don't have an account? <a href="../pages/register" className="text-blue-500 hover:underline">Register</a></p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
