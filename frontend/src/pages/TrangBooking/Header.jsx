import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// Tạo danh sách ảnh từ thư mục public
const imageList = Array.from({ length: 5 }, (_, i) => ({
  src: `/img/imgBanner/Banner${i + 1}.jpg`,
  alt: `Banner ${i + 1}`,
}));

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
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="relative h-screen flex items-center justify-center text-white">
      {/* Ảnh nền */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${imageList[currentIndex].src})` }}
      ></div>

      {/* Overlay màu đen */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Nội dung banner */}
      <div className="text-center relative z-10">
        <p className="text-sm uppercase tracking-widest">Just Enjoy & Relax</p>
        <h2 className="text-5xl font-bold mt-4">Feel Relax & Enjoy</h2>
        <h2 className="text-5xl font-bold mb-6">Your Luxuriousness</h2>
        <Button className="bg-white text-black px-6 py-2 rounded-lg text-lg">
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