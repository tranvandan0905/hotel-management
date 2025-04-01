import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const rooms = [
    {
      id: 1,
      name: "Superior Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 115,
      size: "30m²",
      maxPeople: 1,
      image: "/img/rooms/room1.png"
    },
    {
      id: 2,
      name: "Signature Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 220,
      size: "70m²",
      maxPeople: 2,
      image: "/img/rooms/room2.png"
    },
    {
      id: 3,
      name: "Deluxe Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 265,
      size: "50m²",
      maxPeople: 3,
      image: "/img/rooms/room3.png"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 50) {
        header.classList.add("bg-gray-900", "shadow-md");
      } else {
        header.classList.remove("bg-gray-900", "shadow-md");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 text-white z-10 transition-all duration-300">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-yellow-400">HOTEL</span> & SPA ADINA
        </h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#home" className="hover:text-yellow-400">Home</a>
          <a href="#rooms" className="hover:text-yellow-400">Rooms</a>
          <a href="#spa" className="hover:text-yellow-400">Spa</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </nav>
      </header>
      
      {/* Hero Banner with Search */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center" 
               style={{ backgroundImage: "url('/img/imgBanner/Banner1.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-4">
          <div className="text-center text-white mb-12">
            <p className="text-sm uppercase tracking-widest mb-2">Just Enjoy & Relax</p>
            <h2 className="text-5xl font-bold mb-4">Feel Relax & Enjoy</h2>
            <h2 className="text-5xl font-bold">Your Luxuriousness</h2>
          </div>

          {/* Search Box */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
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
      </section>

      {/* Rooms Section */}
      <section className="py-20 px-4 bg-gray-50" id="rooms">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Room & Suites</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our luxurious rooms and suites designed for your comfort and relaxation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map(room => (
              <motion.div key={room.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img src={room.image} alt={room.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>SIZE {room.size}</span>
                    <span>MAX PEOPLE {room.maxPeople}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">FROM ${room.price}</span>
                    <motion.button whileTap={{ scale: 0.9 }} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded">
                      BOOK NOW
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
