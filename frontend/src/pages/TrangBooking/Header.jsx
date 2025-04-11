import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

const images = Array.from({ length: 5 }, (_, i) => `/img/imgBanner/banner${i + 1}.png`);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 md:p-4 text-white bg-black shadow-md z-50 ">
      <h1 className="text-base md:text-2xl font-bold tracking-wide flex items-center">
        <img
          src="./img/logo_booking_white.png"
          alt="Booking Logo"
          className="w-10 h-10 md:w-16 md:h-16 mr-2"
        />
        <span className="text-white">Hotel Booking</span>
      </h1>
      <nav className="flex items-center left-10"> 
        <button
          className="md:hidden text-white text-2xl mr-4 absolute right-4" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className={`absolute top-16 right-0 z-10 w-full bg-black p-4 flex flex-col space-y-2 md:space-y-0 md:flex md:flex-row md:space-x-6 md:relative md:top-0 md:bg-transparent md:p-0 ${menuOpen ? 'block' : 'hidden'}`}>
          <a href="#home" className="hover:text-yellow-400">Home</a>
          <a href="#rooms" className="hover:text-yellow-400">Rooms</a>
          <a href="#spa" className="hover:text-yellow-400">Spa</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </div>
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
    <div className="relative h-[80vh] md:h-screen bg-cover bg-center flex items-center justify-center mt-16">
      <img
        key={currentIndex}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        src={images[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="text-center relative z-10 text-white px-4 md:px-0">
        <p className="text-xs md:text-sm uppercase tracking-widest">Just Enjoy & Relax</p>
        <h2 className="text-2xl md:text-5xl font-bold mt-2 md:mt-4">Feel Relax & Enjoy</h2>
        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">Your Luxuriousness</h2>
        <Button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-lg mt-2 md:mt-4">
          See Our Rooms
        </Button>
      </div>

      <div className="absolute bottom-4 md:bottom-10 bg-white p-4 md:p-6 rounded-lg shadow-xl w-[90%] md:max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Check In</label>
            <input
              type="date"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md text-xs md:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Check Out</label>
            <input
              type="date"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md text-xs md:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adult</label>
            <input
              type="number"
              name="adults"
              min="1"
              value={searchData.adults}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md text-xs md:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Children</label>
            <input
              type="number"
              name="children"
              min="0"
              value={searchData.children}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-md text-xs md:text-sm"
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 md:py-3 text-xs md:text-base">
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