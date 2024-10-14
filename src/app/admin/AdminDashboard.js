// pages/admin/AdminDashboard.js
"use client";
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [sellersCount, setSellersCount] = useState(0);
  const [todaySalesCount, setTodaySalesCount] = useState(0);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productCountResponse = await fetch('http://localhost:5000/api/productCount');
        const sellersCountResponse = await fetch('http://localhost:5000/api/sellersCount');
        const todaySalesResponse = await fetch('http://localhost:5000/api/todaySalesCount');
        const auctionsResponse = await fetch('http://localhost:5000/api/auctions');

        if (!productCountResponse.ok || !sellersCountResponse.ok || !todaySalesResponse.ok || !auctionsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const productCountData = await productCountResponse.json();
        const sellersCountData = await sellersCountResponse.json();
        const todaySalesData = await todaySalesResponse.json();
        const auctionsData = await auctionsResponse.json();

        setProductCount(productCountData.count);
        setSellersCount(sellersCountData.count);
        setTodaySalesCount(todaySalesData.count);
        setAuctions(auctionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-100 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Product Total Count</h3>
            <p className="text-2xl font-bold">{productCount}</p>
          </div>
          <div className="bg-purple-100 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Sellers Count</h3>
            <p className="text-2xl font-bold">{sellersCount}</p>
          </div>
          <div className="bg-purple-100 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Today's Sales Count</h3>
            <p className="text-2xl font-bold">{todaySalesCount}</p>
          </div>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">Ongoing Auctions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Auction ID</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Item</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Start Price</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Current Price</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">End Date</th>
                </tr>
              </thead>
              <tbody>
                {auctions.length > 0 ? (
                  auctions.map(auction => (
                    <tr key={auction.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b border-gray-200">{auction.id}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{auction.item}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{auction.startPrice}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{auction.currentPrice}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{new Date(auction.endDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No ongoing auctions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;
