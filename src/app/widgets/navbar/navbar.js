"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HomeIcon, ShoppingCartIcon, UserGroupIcon, SupportIcon, LogoutIcon, HeartIcon, BellIcon, UserIcon } from '@heroicons/react/outline';


const Navbar = () => {
  const [formData, setFormData] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const userMenuRef = useRef(null);
  const [userId, setuserId] = useState('');



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(storedUserDetails);
    setuserId(userDetails.id);
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/user/${userId}`);
        if (response.status === 200) {  // Check if status is 200 OK
          const data = await response.json();
          console.log(data);

          setUserDetails(data);  // Set user details if response is 200 OK
          setFormData(data); // Initialize form data with user details
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (userId !== '') {
      fetchUserDetails();
    }
    setLoading(false);
  }, [userId]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      const parsedDetails = JSON.parse(storedUserDetails);
      const userId = parsedDetails?.id;
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5002/api/user/${userId}`);
          if (response.status === 200) {
            const data = await response.json();
            setUserDetails(data);
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);



  return (
    <div>
      <nav className="relative flex items-center justify-between flex-wrap p-2">
        <div className="flex items-center flex-shrink-0">
          <Link href="/customer/home">
            <div className='flex space-x-4'>
              <Image
                src="/images/logo.png"
                alt="Profile Photo"
                width={80}
                height={80}
              />
            </div>
          </Link>
          <h1 className="text-2xl text-[#180533] font-bold italic">
            <div className='row mb-3 '>
              <div className='col-8'> Welcome,{formData.name || '-'}</div>
            </div>
          </h1>
        </div>
        <div className="flex items-center sm:mr-2 relative"></div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded border-gray-400 hover:border-white"
          ></button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <div className="container mx-auto px-4 py-6 flex items-center">
              <div className="flex items-center space-x-4 ml-auto">
                <Link
                  href="/customer/home"
                  className="flex items-center space-x-2 mt-4 lg:mt-0 transition-all no-underline hover:bg-[#8006be] duration-300 hover:text-white rounded-md p-1">
                  <HomeIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Home</span>
                </Link>

                <Link
                  href="/customer/order"
                  className="flex items-center space-x-2 mt-4 lg:mt-0 transition-all no-underline hover:bg-[#8006be] duration-300 hover:text-white rounded-md p-1">

                  <ShoppingCartIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Order History</span>
                </Link>
                <Link
                  href="/customer/bidnotification"
                  className="flex items-center space-x-2 mt-4 lg:mt-0 transition-all no-underline hover:bg-[#8006be] duration-300 hover:text-white rounded-md p-1">

                  <BellIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Notification</span>
                </Link>

                <Link
                  href="/customer/aboutus"
                  className="flex items-center space-x-2 mt-4 lg:mt-0 transition-all no-underline hover:bg-[#8006be] duration-300 hover:text-white rounded-md p-1">

                  <SupportIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">AboutUs</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4 ml-auto">
              </div>
            </div>
            <nav className="flex space-x-4 items-center   justify-between"></nav>
          </div>
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              onClick={toggleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <div className='flex justify-between items-center'>
                <div className='flex space-x-4' style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={userDetails.profileimage || "/images/default-avatar.png"} // Use user's profile image or default avatar
                    alt="Profile"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </button>
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 ${isUserMenuOpen ? 'block' : 'hidden'} transition-all duration-300`} id="user-dropdown">
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link href="/customer/changepass"
                    className="block px-4 py-2 text-sm hover:bg-[#8006be] transition-all duration-300 rounded-md p-1">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/customer/profile"
                    className="no-underline px-4 py-2 flex items-center space-x-2 mt-4   text-sm hover:bg-[#8006be] transition-all duration-300 rounded-md p-1">
                    <UserGroupIcon className="w-6 h-6" />
                    Profile
                  </Link>
                </li>
                <li onClick={() => { localStorage.removeItem('userDetails'); }}>
                  <Link href="/auth/signin"
                    className="block px-4 py-2 text-sm hover:bg-[#8006be] transition-all duration-300 rounded-md p-1">
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;