// components/GeoLocationMap.js
"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for marker icons with Leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoLocationMap = () => {
  const [position, setPosition] = useState(null);
  const [shops, setShops] = useState([]);

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          // Call the backend to get nearby shops
          fetchNearbyShops(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
        }
      );
    }
  }, []);

  // Fetch nearby shops from the backend
  const fetchNearbyShops = async (latitude, longitude) => {
    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
      });
      const data = await response.json();
      setShops(data.shops); // Assuming response has { shops: [...] }
    } catch (error) {
      console.error('Error fetching nearby shops: ', error);
    }
  };

  if (!position) {
    return <p>Fetching your location...</p>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* User's Location Marker */}
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Nearest Shops Markers */}
      {shops.map((shop) => (
        <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
          <Popup>{shop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeoLocationMap;
