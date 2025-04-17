import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    loaiPhong: "all",
    succhua: "all",
    minPrice: "",
    maxPrice: ""
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/v1/api/phongs`);
        const data = await res.json();
        setRooms(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu phòng");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.SoPhong.toString().includes(filters.search) ||
      room.Loai.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType =
      filters.loaiPhong === "all" || room.Loai === filters.loaiPhong;
    const matchesMinPrice =
      !filters.minPrice || room.Gia >= Number(filters.minPrice);
    const matchesMaxPrice =
      !filters.maxPrice || room.Gia <= Number(filters.maxPrice);
    return (
      matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice
    );
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      loaiPhong: "all",
      succhua: "all",
      minPrice: "",
      maxPrice: "",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải dữ liệu...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Danh sách phòng</h1>
            <p className="text-gray-600">Khám phá các lựa chọn phòng nghỉ</p>
          </div>
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Lọc phòng</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilterPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={filters.loaiPhong}
                  onChange={(e) =>
                    setFilters({ ...filters, loaiPhong: e.target.value })
                  }
                  className="p-2 border rounded"
                >
                  <option value="all">Tất cả loại phòng</option>
                  <option value="base">Base</option>
                  <option value="vip">VIP</option>
                </select>

                <input
                  type="number"
                  placeholder="Giá từ"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Giá đến"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow rounded overflow-hidden"
            >
              <img
                src={room.HinhAnh || "/img/default-room.jpg"}
                alt={room.Loai}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  Phòng {room.SoPhong} - {room.Loai}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {room.MoTa || "Phòng nghỉ tiện nghi"}
                </p>
                <p className="text-blue-600 font-bold mb-3">
                  {formatPrice(room.Gia)}/đêm
                </p>
                <button
                  disabled={room.TrangThai}
                  onClick={() => navigate(`/room/${room.id}`)}
                  className={`px-4 py-2 text-sm font-semibold rounded ${
                    room.TrangThai
                      ? "bg-gray-300 text-gray-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {room.TrangThai ? "Đã đặt" : "Đặt phòng"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
