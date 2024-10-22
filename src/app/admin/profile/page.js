"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../widgets/navbar/navbar.js';
import Footer from '../../widgets/footer/footer.js';
import { useRouter } from 'next/navigation';
import '../../../../public/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';


function Pages() {
    const router = useRouter();
    const [userId, setuserId] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [formData, setFormData] = useState({}); 
    const [key, setKey] = useState('');

    // Fetch user details from API when component mounts
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

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5002/api/user/${userId}`, {
                method: 'PUT', // Update method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send updated user details
            });
            if (response.status === 200) {
                toast.success('User Deatil Upadte Sucessfully.',{duration: 400,})
                setKey((pre)=>pre+1);
                const updatedData = await response.json();
                setUserDetails(updatedData); // Update user details with the response
                setShowModal(false); // Close modal
            } else {
                throw new Error('Failed to update user details');
            }
        } catch (err) {
            toast.error('Somthing Goes Wrong.Try Again')
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='h-full w-full' key={key}>
            
            <Navbar />
            <Toaster />

            <div className='flex flex-col md:flex-row mb-3px-10'>
                <div className='flex mb-64 flex-col w-full pt-10 m-4'>
                    <br />
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="via-white p-5 bg-white rounded-3xl shadow-xl" style={{ borderBottom: '6px solid #8006be' }}>
                            <div className='fw-bold fs-2 heading-bar'>Your Details</div>
                            <div className='mt-5 w-1/2'>
                                <div className='w-1/2'>
                                    <div className='d-flex flex-column justify-center align-items-center mb-3'>
                                    <img
  src={userDetails.profileimage || "/images/logo.png"}
  alt="Profile"
  className="avatar"
  onError={(e) => {
    e.target.onerror = null; // Prevents infinite loop in case fallback also fails
    e.target.src = "/images/logo.png"; // Fallback to logo.png
  }}
/>

                                        <div className='fw-bold fs-3'>{formData.name || '-'}</div>
                                    </div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>Email:</div>
                                    <div className='col-8'>{formData.email || '-'}</div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>Mobile Number:</div>
                                    <div className='col-8'>{formData.phone || '-'}</div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>Address:</div>
                                    <div className='col-8'>{formData.address || '-'}</div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>City:</div>
                                    <div className='col-8'>{formData.city || '-'}</div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>Zip Code:</div>
                                    <div className='col-8'>{formData.zip || '-'}</div>
                                </div>
                                <div className='row mb-3 '>
                                    <div className='font-bold col-4'>Country:</div>
                                    <div className='col-8'>{formData.country || '-'}</div>
                                </div>

                                <button className='btn btn-primary d-flex justify-center align-items-center gap-1' onClick={() => setShowModal(true)}>
                                    <FontAwesomeIcon icon={faPencil} /> Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Profile */}
            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                              
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={formData.city || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        className="form-control"
                                        value={formData.zip || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        className="form-control"
                                        value={formData.country || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Pages;
