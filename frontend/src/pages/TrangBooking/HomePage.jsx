import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
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
    },
    {
      id: 4,
      name: "Superior Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 115,
      size: "30m²",
      maxPeople: 1,
      image: "/img/rooms/room4.png"
    },
    {
      id: 5,
      name: "Signature Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 220,
      size: "70m²",
      maxPeople: 2,
      image: "/img/rooms/room5.png"
    },
    {
      id: 6,
      name: "Deluxe Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 265,
      size: "50m²",
      maxPeople: 3,
      image: "/img/rooms/room6.png"
    },
    {
      id: 7,
      name: "Superior Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 115,
      size: "30m²",
      maxPeople: 1,
      image: "/img/rooms/room7.png"
    },
    {
      id: 8,
      name: "Signature Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 220,
      size: "70m²",
      maxPeople: 2,
      image: "/img/rooms/room8.png"
    },
    {
      id: 9,
      name: "Deluxe Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      price: 265,
      size: "50m²",
      maxPeople: 3,
      image: "/img/rooms/room9.png"
    },
];
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("bg-black/80", "shadow-md");
        } else {
          header.classList.remove("bg-black/80", "shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Rooms Section */}
      <section className="py-20 px-4 bg-gray-50" id="rooms">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Room & Suites</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our luxurious rooms and suites designed for your comfort and relaxation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
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
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
                    >
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
