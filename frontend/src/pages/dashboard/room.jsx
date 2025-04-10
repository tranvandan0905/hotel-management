import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon, PencilIcon, TrashIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Room() {
  const navigate = useNavigate();

  // State quản lý phòng
  const [rooms, setRooms] = useState([
    {
      id: 1,
      sophong: 101,
      loai: "Phòng Deluxe",
      tang: 1,
      succhua: 2,
      gia: 500000,
      trangthai: false,
      id_chinhanh: 1,
      cleaningStatus: "Đã vệ sinh",
      anh: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1566669437685-2c5a585aded5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ]
    },
    {
      id: 2,
      sophong: 201,
      loai: "Phòng Superior",
      tang: 2,
      succhua: 4,
      gia: 800000,
      trangthai: true,
      id_chinhanh: 1,
      cleaningStatus: "Chưa vệ sinh",
      anh: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ]
    },
    {
      id: 3,
      sophong: 102,
      loai: "Phòng Standard",
      tang: 1,
      succhua: 2,
      gia: 400000,
      trangthai: false,
      id_chinhanh: 2,
      cleaningStatus: "Đã vệ sinh",
      anh: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ]
    }
  ]);

  // State quản lý modal xem ảnh
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  // State bộ lọc
  const [filters, setFilters] = useState({
    roomNumber: "",
    status: "all",
    cleaning: "all",
    branch: "all"
  });

  // Mở modal xem ảnh
  const openImageModal = (images, index = 0) => {
    setImageModal({
      isOpen: true,
      images,
      currentIndex: index
    });
  };

  // Đóng modal
  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      images: [],
      currentIndex: 0
    });
  };

  // Chuyển ảnh tiếp theo
  const nextImage = () => {
    setImageModal(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  // Chuyển ảnh trước đó
  const prevImage = () => {
    setImageModal(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Chuyển đổi trạng thái phòng
  const toggleStatus = (roomId, key) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          [key]: key === "trangthai" 
            ? !room.trangthai 
            : room.cleaningStatus === "Đã vệ sinh" 
              ? "Chưa vệ sinh" 
              : "Đã vệ sinh"
        };
      }
      return room;
    }));
  };

  // Xóa phòng
  const deleteRoom = (roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  // Lọc phòng
  const filteredRooms = rooms.filter(room => {
    const matchesNumber = room.sophong.toString().includes(filters.roomNumber);
    const matchesStatus = 
      filters.status === "all" || 
      (filters.status === "booked" && room.trangthai) || 
      (filters.status === "available" && !room.trangthai);
    const matchesCleaning = 
      filters.cleaning === "all" || 
      room.cleaningStatus === (filters.cleaning === "cleaned" ? "Đã vệ sinh" : "Chưa vệ sinh");
    const matchesBranch = 
      filters.branch === "all" || 
      room.id_chinhanh.toString() === filters.branch;

    return matchesNumber && matchesStatus && matchesCleaning && matchesBranch;
  });

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Phòng</h1>
        <button 
          onClick={() => navigate("/dashboard/add-room")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Thêm phòng mới
        </button>
      </div>
      
      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Tìm theo số phòng"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.roomNumber}
          onChange={(e) => setFilters({...filters, roomNumber: e.target.value})}
        />

        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="booked">Đã đặt</option>
          <option value="available">Còn trống</option>
        </select>

        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.cleaning}
          onChange={(e) => setFilters({...filters, cleaning: e.target.value})}
        >
          <option value="all">Tất cả vệ sinh</option>
          <option value="cleaned">Đã vệ sinh</option>
          <option value="uncleaned">Chưa vệ sinh</option>
        </select>

        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.branch}
          onChange={(e) => setFilters({...filters, branch: e.target.value})}
        >
          <option value="all">Tất cả chi nhánh</option>
          <option value="1">Chi nhánh 1</option>
          <option value="2">Chi nhánh 2</option>
        </select>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số phòng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại phòng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tầng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sức chứa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá phòng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chi nhánh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vệ sinh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      {room.anh && room.anh.length > 0 ? (
                        <>
                          <img 
                            src={room.anh[0]} 
                            alt={`Phòng ${room.sophong}`} 
                            className="h-12 w-16 rounded-md object-cover cursor-pointer"
                            onClick={() => openImageModal(room.anh, 0)}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://via.placeholder.com/300x200?text=Ảnh+lỗi";
                            }}
                          />
                          {room.anh.length > 1 && (
                            <div 
                              className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                              onClick={() => openImageModal(room.anh, 0)}
                            >
                              +{room.anh.length - 1}
                            </div>
                          )}
                        </>
                      ) : (
                        <div 
                          className="h-12 w-16 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer"
                          onClick={() => openImageModal([])}
                        >
                          <PhotoIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{room.sophong}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.loai}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tầng {room.tang}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.succhua} người</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(room.gia)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CN{room.id_chinhanh}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(room.id, "cleaningStatus")}
                      className={`flex items-center gap-1 text-sm ${
                        room.cleaningStatus === "Đã vệ sinh" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}
                    >
                      {room.cleaningStatus === "Đã vệ sinh" ? (
                        <CheckIcon className="h-4 w-4"/>
                      ) : (
                        <XMarkIcon className="h-4 w-4"/>
                      )}
                      {room.cleaningStatus}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(room.id, "trangthai")}
                      className={`flex items-center gap-1 text-sm ${
                        room.trangthai 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}
                    >
                      {room.trangthai ? (
                        <CheckIcon className="h-4 w-4"/>
                      ) : (
                        <XMarkIcon className="h-4 w-4"/>
                      )}
                      {room.trangthai ? "Đã đặt" : "Còn trống"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/edit-room/${room.id}`)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="Sửa"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Xóa"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center text-sm text-gray-500">
                  Không tìm thấy phòng nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem ảnh */}
      {imageModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="relative h-full">
              {imageModal.images.length > 0 ? (
                <>
                  <img 
                    src={imageModal.images[imageModal.currentIndex]} 
                    alt={`Ảnh phòng ${imageModal.currentIndex + 1}`}
                    className="w-full h-full object-contain max-h-[80vh]"
                  />
                  
                  {/* Navigation buttons */}
                  {imageModal.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="inline-block bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {imageModal.currentIndex + 1} / {imageModal.images.length}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <PhotoIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Không có ảnh nào để hiển thị</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail preview */}
            {imageModal.images.length > 1 && (
              <div className="bg-gray-100 p-2 flex overflow-x-auto space-x-2">
                {imageModal.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-12 object-cover rounded cursor-pointer transition-all ${
                      index === imageModal.currentIndex 
                        ? 'ring-2 ring-blue-500 scale-105' 
                        : 'opacity-70 hover:opacity-90'
                    }`}
                    onClick={() => setImageModal(prev => ({ ...prev, currentIndex: index }))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}