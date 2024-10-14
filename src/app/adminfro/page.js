"use client"; // Ensure this line is present

import React, { useState } from 'react';
import Header from "../components/Header"; // Assuming Header is a separate component
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default CSS

// Register chart components
ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // State for calendar
  const [date, setDate] = useState(new Date());

  // Data for Line Chart (User Engagement)
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Customer Registrations',
        data: [300, 500, 800, 600, 1000, 1200], // Example data for customer registrations
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.4)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Data for Bar Chart (Sales Count)
  const barData = {
    labels: ['Phones', 'Laptops', 'Cameras', 'Headphones'],
    datasets: [
      {
        label: 'Sales Count',
        data: [50, 80, 60, 90],
        backgroundColor: 'rgba(48, 25, 52, 0.6)', // #301934 with 60% opacity
        borderColor: '#301934', // Solid #301934 color
        borderWidth: 1,
      },
    ],
  };
  

  // Data for Doughnut Chart (Profit Distribution)
  const doughnutData = {
    labels: ['Profit', 'Total'],
    datasets: [
      {
        data: [70, 30], // 70% completed, 30% pending
        backgroundColor: [
          'rgba(128, 0, 128, 0.6)', // Light purple for completed
          'rgba(147, 112, 219, 0.6)', // Lighter purple for pending
        ],
        borderColor: [
          'rgba(128, 0, 128, 1)', // Darker purple for completed
          'rgba(147, 112, 219, 1)', // Darker shade for pending
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 bg-purple-100 min-h-screen">
        <h1 className="text-4xl font-bold text-purple-900 mb-6">Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaUsers className="text-purple-800 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Customers</h2>
              <p className="text-2xl font-bold">1,250</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaChartLine className="text-purple-800 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Sellers</h2>
              <p className="text-2xl font-bold">3000</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaDollarSign className="text-purple-800 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Profit</h2>
              <p className="text-2xl font-bold">$25,000</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Line Graph Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Registrations Over Time</h2>
            <Line data={lineData} />
          </div>

          {/* Doughnut Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">Profit Distribution</h2>
            <div className="w-50 h-50"> {/* Adjust size as needed */}
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>

        {/* Bar Graph Section and Calendar Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bar Graph Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Count</h2>
            <Bar data={barData} />
          </div>

          {/* Calendar Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
        {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Electro Bid Hub. All rights reserved.</p>
      </footer>
      </div>
    </>
  );
};

export default Dashboard;
