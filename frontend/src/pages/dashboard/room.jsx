import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Room() {
  const navigate = useNavigate();

  // State quản lý phòng
  const [rooms, setRooms] = useState([
    {
      id: "0001",
      name: "#0001",
      image: "https://via.placeholder.com/100",
      price: "500,000 VND",
      bedType: "Giường đôi",
      floor: "Tầng 1",
      amenities: ["Máy lạnh", "Vòi sen", "TV LED", "Wifi"],
      status: false,
      cleaningStatus: "Đã vệ sinh"
    },
    {
      id: "0015",
      name: "#0015",
      image: "https://via.placeholder.com/100",
      price: "400,000 VND",
      bedType: "Giường đơn",
      floor: "Tầng 2",
      amenities: ["Máy lạnh", "Vòi sen"],
      status: true,
      cleaningStatus: "Chưa vệ sinh"
    }
  ]);

  // State bộ lọc
  const [filters, setFilters] = useState({
    roomNumber: "",
    status: "all",
    cleaning: "all"
  });

  // Chuyển đổi trạng thái
  const toggleStatus = (roomId, key) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          [key]: key === "status" 
            ? !room.status 
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
    const matchesNumber = room.name.toLowerCase().includes(filters.roomNumber.toLowerCase());
    const matchesStatus = 
      filters.status === "all" || 
      (filters.status === "booked" && room.status) || 
      (filters.status === "available" && !room.status);
    const matchesCleaning = 
      filters.cleaning === "all" || 
      room.cleaningStatus === (filters.cleaning === "cleaned" ? "Đã vệ sinh" : "Chưa vệ sinh");

    return matchesNumber && matchesStatus && matchesCleaning;
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Phòng</h1>
      </div>
      
      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số phòng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại giường</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tầng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiện ích</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vệ sinh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={room.image} 
                    alt={`Phòng ${room.name}`} 
                    className="h-12 w-12 rounded-md object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.bedType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.floor}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="space-y-1">
                    {room.amenities.map((item) => (
                      <li key={item} className="flex items-center">
                        <span className="mr-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </td>
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
                    onClick={() => toggleStatus(room.id, "status")}
                    className={`flex items-center gap-1 text-sm ${
                      room.status 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}
                  >
                    {room.status ? (
                      <CheckIcon className="h-4 w-4"/>
                    ) : (
                      <XMarkIcon className="h-4 w-4"/>
                    )}
                    {room.status ? "Đã đặt" : "Còn trống"}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}