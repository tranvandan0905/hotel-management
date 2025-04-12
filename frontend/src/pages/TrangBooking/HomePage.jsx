import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const RoomManagement = () => {
  // State cho dữ liệu phòng và các trạng thái
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

  // Mock data - sẽ thay bằng API call sau này
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // Giả lập API call
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
          // Thêm các phòng khác...
        ];
        
        setRooms(mockRooms);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu phòng");
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Hàm format giá tiền VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  // Lọc phòng theo các tiêu chí
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.sophong.toLowerCase().includes(filters.search.toLowerCase()) || 
                         room.loai.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = filters.loaiPhong === "all" || 
                       room.loai === filters.loaiPhong;
    
    const matchesCapacity = filters.succhua === "all" || 
                          room.succhua === Number(filters.succhua);
    
    const matchesMinPrice = !filters.minPrice || 
                          room.gia >= Number(filters.minPrice);
    
    const matchesMaxPrice = !filters.maxPrice || 
                          room.gia <= Number(filters.maxPrice);
    
    return matchesSearch && matchesType && matchesCapacity && matchesMinPrice && matchesMaxPrice;
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      loaiPhong: "all",
      succhua: "all",
      minPrice: "",
      maxPrice: ""
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chào mừng đến với hệ thống đặt phòng</h1>
            <p className="text-gray-600">Khám phá các phòng nghỉ tuyệt vời của chúng tôi</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Lọc phòng</span>
            </button>
          </div>
        </div>

        {/* Bộ lọc ẩn/hiện */}
        <AnimatePresence>
          {showFilterPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow p-4 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.loaiPhong}
                    onChange={(e) => setFilters({...filters, loaiPhong: e.target.value})}
                  >
                    <option value="all">Tất cả loại phòng</option>
                    <option value="Phòng Deluxe">Deluxe</option>
                    <option value="Phòng Superior">Superior</option>
                    <option value="Phòng Standard">Standard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sức chứa</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.succhua}
                    onChange={(e) => setFilters({...filters, succhua: e.target.value})}
                  >
                    <option value="all">Tất cả</option>
                    <option value="2">2 người</option>
                    <option value="4">4 người</option>
                   
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá từ</label>
                  <input
                    type="number"
                    placeholder="VND"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá đến</label>
                  <input
                    type="number"
                    placeholder="VND"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                </button>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        

        {/* Danh sách phòng */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Ảnh phòng */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={room.anh[0]} 
                  alt={`Phòng ${room.sophong}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "/img/room-placeholder.jpg";
                  }}
                />
                {room.trangthai && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Đã đặt
                  </div>
                )}
              </div>
              
              {/* Thông tin phòng */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">
                    Phòng {room.sophong} - {room.loai}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.trangthai ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {room.trangthai ? 'Đã đặt' : 'Còn trống'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                  <span>Tầng: {room.tang}</span>
                  <span>Sức chứa: {room.succhua} người</span>
                  <span>Chi nhánh: {room.tenchinhanh}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {room.mota}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {formatPrice(room.gia)}/đêm
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded text-sm ${
                      room.trangthai 
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={room.trangthai}
                  >
                    {room.trangthai ? 'Đã đặt' : 'Đặt phòng'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hiển thị khi không có phòng nào */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy phòng nào phù hợp</p>
            <button 
              onClick={resetFilters}
              className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomManagement;