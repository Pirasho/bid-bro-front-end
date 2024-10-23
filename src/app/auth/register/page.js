"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import '../../../../public/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ImageUploading from 'react-images-uploading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";

export default function Registration() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    password: "",
    confirmPassword: "",
    profileimage: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  useEffect(() => {
    console.log(images);
  }, [images])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { phone, password, confirmPassword } = details;
    setError(""); // Clear previous error message

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (validateForm()) {
      if (images.length === 0) {
        setError('Please add your profile image.');
        return;
      }
     
      const data = {
        name: details.name,
        email: details.email,
        phone: details.phone,
        address: details.address,
        city: details.city,
        country: details.country,
        zip: details.zip,
        password: details.password,
        confirmPassword: details.confirmPassword,
        profileimage: images[0] ? images[0].data_url : null 
      }
      try {

        const response = await fetch('http://localhost:5002/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const result = await response.json();
        // console.log('Registration Successful:', result);
        toast.success('Registration Successful');
        window.location.href = '/auth/signin';
      } catch (error) {
        console.error('Error:', error);
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="container md:p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="d-flex justify-between align-center">
                <div className="text-body-secondary heading-with-bar fw-bold fs-2">Register Form</div>
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
              <div className='fs-1'>Hello, <span className='fw-bold'>Welcome!</span></div>

              {/* Render error message if it exists */}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Name Row */}
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="name" className="form-label fs-4">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={details.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="col-md-6 mb-1">
                    <label htmlFor="profileImage" className="form-label fs-4">Profile Picture</label>
                    <ImageUploading
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div className="upload__image-wrapper">
                          {/* Upload area if no image selected */}
                          {imageList.length === 0 && (
                            <div
                              className={`p-3 border rounded d-flex justify-content-center align-items-center ${isDragging ? 'border-primary' : 'border-secondary'}`}
                              style={{ cursor: 'pointer', height: '120px', backgroundColor: '#f8f9fa' }}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              <span className="text-secondary">Click or Drag to upload profile picture</span>
                            </div>
                          )}

                          {/* Display image preview */}
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item mt-2">
                              <img
                                src={image['data_url']}
                                alt="Profile Preview"
                                className="rounded img-thumbnail"
                                style={{ width: '120px', height: '120px' }}
                              />
                              <div className="mt-2">
                                <button type="button" className="btn btn-light me-2" onClick={() => onImageUpdate(index)}>
                                  <FontAwesomeIcon icon={faPencil} /> Edit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </div>

                  {/* Email and Phone */}
                  <div className="row mb-1">
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fs-4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={details.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fs-4">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={details.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>


                  {/* Address and City */}
                  <div className="row mb-1">
                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label fs-4">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={details.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label fs-4">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        value={details.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Email and Phone */}
                  <div className="row mb-1">
                    <div className="col-md-6">
                      <label htmlFor="country" className="form-label fs-4">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        placeholder="Enter your country"
                        value={details.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="zip" className="form-label fs-4">Zip_Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder="Enter your Zipcode"
                        value={details.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="row mb-1">
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label fs-4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={details.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label fs-4">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={details.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-full mt-3">Register</button>
                  <div className="mt-3">
                    <p className="text-center">Already have an account? <Link href="/auth/signin">Sign in here</Link></p>
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
