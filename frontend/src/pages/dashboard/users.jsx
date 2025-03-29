import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  FunnelIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Users = () => {
  // State quản lý bộ lọc và sắp xếp
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'name'
  });

  // State quản lý chế độ chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: ''
  });

  // State quản lý danh sách users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Barbara Garland",
      email: "test@email.com",
      phone: "1234567890",
      dob: "04/18/1987",
      address: "107 Ashley Ave Lakewood, New Jersey"
    },
    {
      id: 2,
      name: "Marie Brodsky",
      email: "marie@email.com",
      phone: "0987654321",
      dob: "11/08/1983",
      address: "123 Main St New York, NY"
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@email.com",
      phone: "5551234567",
      dob: "01/15/1990",
      address: "456 Oak Ave Chicago, IL"
    }
  ]);

  // Hàm xử lý lọc và sắp xếp
  const processedUsers = users
  .filter(user => {
    const searchTerm = filters.search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone.includes(filters.search)
    );
  })
  .sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'phone':
        return a.phone.localeCompare(b.phone);
      default:
        return 0;
    }
  });
  // Hàm bắt đầu chế độ chỉnh sửa
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      address: user.address
    });
  };

  // Hàm xử lý thay đổi dữ liệu khi chỉnh sửa
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm lưu thay đổi
  const handleSaveClick = () => {
    setUsers(users.map(user => 
      user.id === editingId ? { ...user, ...editFormData } : user
    ));
    setEditingId(null);
  };

  // Hàm hủy bỏ chỉnh sửa
  const handleCancelClick = () => {
    setEditingId(null);
  };

  // Hàm xóa user
  const handleDeleteClick = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="p-4">
      {/* Phần header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản Lý Người Dùng</h1>
          <p className="text-sm text-gray-600">Quản lý tất cả người dùng đã đăng ký</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5" />
            Lọc
          </button>
        </div>
      </div>

      {/* Phần bộ lọc và tìm kiếm */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          >
            <option value="name">Sắp xếp theo Tên</option>
            <option value="email">Sắp xếp theo Email</option>
            <option value="phone">Sắp xếp theo Số Điện Thoại</option>
          </select>
        </div>
      </div>

      {/* Bảng dữ liệu người dùng */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Điện Thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Sinh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa Chỉ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* Cột Tên */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    )}
                  </td>
                  
                  {/* Cột Email */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.email}</div>
                    )}
                  </td>
                  
                  {/* Cột Số Điện Thoại */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    )}
                  </td>
                  
                  {/* Cột Ngày Sinh */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="dob"
                        value={editFormData.dob}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.dob}</div>
                    )}
                  </td>
                  
                  {/* Cột Địa Chỉ */}
                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-sm text-gray-500 max-w-xs truncate">{user.address}</div>
                    )}
                  </td>
                  
                  {/* Cột Thao Tác */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      {editingId === user.id ? (
                        <>
                          <button 
                            onClick={handleSaveClick}
                            className="text-green-600 hover:text-green-900"
                            title="Lưu"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={handleCancelClick}
                            className="text-red-600 hover:text-red-900"
                            title="Hủy"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(user.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;