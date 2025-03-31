import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// Tạo danh sách ảnh từ thư mục public
const images = Array.from({ length: 3 }, (_, i) => `/img/imgBanner/Banner${i + 1}.jpg`);

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 text-white z-10">
      <h1 className="text-2xl font-bold tracking-wide flex items-center">
        <span className="text-gold-500"></span> HOTEL & SPA
      </h1>
      <nav className="space-x-6 hidden md:flex">
        <a href="#home" className="hover:text-gold-400">Home</a>
        <a href="#rooms" className="hover:text-gold-400">Rooms</a>
        <a href="#spa" className="hover:text-gold-400">Spa</a>
        <a href="#contact" className="hover:text-gold-400">Contact</a>
      </nav>
    </header>
  );
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 200); // Chuyển ảnh sau 300ms để không bị khựng
    }, 3000); // Auto chuyển sau 2s
    return () => clearInterval(interval);
  }, []); 
  return (
    <div className="relative h-screen bg-cover bg-center flex items-center justify-center">
      <img
        key={currentIndex} // Reset nhanh hơn
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
    </div>
  );
};
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">Hotel Booking</p>
          <p className="text-sm mt-2">© 2025 All rights reserved</p>
        </div>
      </footer>
    );
  };
const HomePage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Footer/>
    </div>
  );
};

export default HomePage;