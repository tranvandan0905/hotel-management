import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockRooms = [
          {
            id: 1,
            sophong: "101",
            loai: "Phòng Deluxe",
            tang: 1,
            succhua: 2,
            gia: 1500000,
            trangthai: false,
            anh: ["/img/rooms/room1.png"],
            mota: "Phòng Deluxe tiêu chuẩn với view thành phố",
            id_chinhanh: 1,
            tenchinhanh: "Chi nhánh Quận 1"
          },
          {
            id: 2,
            sophong: "201",
            loai: "Phòng Superior",
            tang: 2,
            succhua: 4,
            gia: 2500000,
            trangthai: true,
            anh: ["/img/rooms/room2.png"],
            mota: "Phòng Superior cao cấp với ban công rộng",
            id_chinhanh: 1,
            tenchinhanh: "Chi nhánh Quận 1"
          },
          {
            id: 3,
            sophong: "102",
            loai: "Phòng Standard",
            tang: 1,
            succhua: 2,
            gia: 1000000,
            trangthai: false,
            anh: ["/img/rooms/room3.png"],
            mota: "Phòng Standard tiết kiệm",
            id_chinhanh: 2,
            tenchinhanh: "Chi nhánh Thủ Đức"
          },
        ];
        setRooms(mockRooms);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu phòng");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.sophong.toLowerCase().includes(filters.search.toLowerCase()) || 
                          room.loai.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.loaiPhong === "all" || room.loai === filters.loaiPhong;
    const matchesCapacity = filters.succhua === "all" || room.succhua === Number(filters.succhua);
    const matchesMinPrice = !filters.minPrice || room.gia >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || room.gia <= Number(filters.maxPrice);
    return matchesSearch && matchesType && matchesCapacity && matchesMinPrice && matchesMaxPrice;
  });

  const resetFilters = () => {
    setFilters({ search: "", loaiPhong: "all", succhua: "all", minPrice: "", maxPrice: "" });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Danh sách phòng</h1>
            <p className="text-gray-600">Khám phá các lựa chọn phòng nghỉ</p>
          </div>
          <button onClick={() => setShowFilterPanel(!showFilterPanel)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md">
            <FunnelIcon className="h-5 w-5" />
            <span>Lọc phòng</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilterPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              {/* Bộ lọc */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select value={filters.loaiPhong} onChange={(e) => setFilters({...filters, loaiPhong: e.target.value})} className="p-2 border rounded">
                  <option value="all">Tất cả loại phòng</option>
                  <option value="Phòng Deluxe">Deluxe</option>
                  <option value="Phòng Superior">Superior</option>
                  <option value="Phòng Standard">Standard</option>
                </select>
                <select value={filters.succhua} onChange={(e) => setFilters({...filters, succhua: e.target.value})} className="p-2 border rounded">
                  <option value="all">Tất cả sức chứa</option>
                  <option value="2">2 người</option>
                  <option value="4">4 người</option>
                </select>
                <input type="number" placeholder="Giá từ" value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} className="p-2 border rounded" />
                <input type="number" placeholder="Giá đến" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} className="p-2 border rounded" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Danh sách phòng */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <div key={room.id} className="bg-white shadow rounded overflow-hidden">
              <img src={room.anh[0]} alt={room.loai} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">Phòng {room.sophong} - {room.loai}</h2>
                <p className="text-sm text-gray-500 mb-2">{room.mota}</p>
                <p className="text-blue-600 font-bold mb-3">{formatPrice(room.gia)}/đêm</p>
                <button
                  disabled={room.trangthai}
                  onClick={() => navigate(`/room/${room.id}`)}
                  className={`px-4 py-2 text-sm font-semibold rounded ${
                    room.trangthai ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {room.trangthai ? "Đã đặt" : "Đặt phòng"}
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
