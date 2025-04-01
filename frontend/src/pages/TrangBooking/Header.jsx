import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// Danh sách ảnh từ thư mục public
const images = Array.from({ length: 5 }, (_, i) => `/img/imgBanner/banner${i + 1}.png`);

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 text-white bg-black shadow-md z-50">
      <h1 className="text-2xl font-bold tracking-wide flex items-center">
        <span className="text-white">HOTEL Booking</span>
      </h1>
      <nav className="space-x-6 hidden md:flex">
        <a href="#home" className="hover:text-yellow-400">Home</a>
        <a href="#rooms" className="hover:text-yellow-400">Rooms</a>
        <a href="#spa" className="hover:text-yellow-400">Spa</a>
        <a href="#contact" className="hover:text-yellow-400">Contact</a>
      </nav>
    </header>
  );
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [searchData, setSearchData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative h-screen bg-cover bg-center flex items-center justify-center mt-16">
      <img
        key={currentIndex}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        src={images[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="text-center relative z-10 text-white">
        <p className="text-sm uppercase tracking-widest">Just Enjoy & Relax</p>
        <h2 className="text-5xl font-bold mt-4">Feel Relax & Enjoy</h2>
        <h2 className="text-5xl font-bold mb-6">Your Luxuriousness</h2>
        <Button className="bg-blue-gray-300 text-white px-6 py-2 rounded-lg text-lg">
          See Our Rooms
        </Button>
      </div>

      {/* Search Box */}
      <div className="absolute bottom-10 bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
            <input
              type="date"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
            <input
              type="date"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adult</label>
            <input
              type="number"
              name="adults"
              min="1"
              value={searchData.adults}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
            <input
              type="number"
              name="children"
              min="0"
              value={searchData.children}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3">
              CHECK NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderBanner = () => {
  return (
    <div>
      <Header />
      <Banner />
    </div>
  );
};

export default HeaderBanner;
