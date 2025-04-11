import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Users = () => {
  // State quản lý bộ lọc và sắp xếp
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'hoten'
  });

  // State quản lý chế độ chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    hoten: '',
    email: '',
    sdt: '',
    cccd: '',
    gioitinh: true
  });

  // State quản lý loading và error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý danh sách khách hàng
  const [users, setUsers] = useState([]);

  // Giả lập API fetch - sau này sẽ thay bằng API thực
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUsers = [
          {
            id: 1,
            hoten: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            sdt: "0987654321",
            cccd: "123456789012",
            gioitinh: true,
            password: "hashedpassword123"
          },
          {
            id: 2,
            hoten: "Trần Thị B",
            email: "tranthib@email.com",
            sdt: "0912345678",
            cccd: "987654321098",
            gioitinh: false,
            password: "hashedpassword456"
          },
          {
            id: 3,
            hoten: "Lê Văn C",
            email: "levanc@email.com",
            sdt: "0967891234",
            cccd: "456789012345",
            gioitinh: true,
            password: "hashedpassword789"
          }
        ];
        
        setUsers(mockUsers);
        setError(null);
      } catch (err) {
        setError('Không thể tải dữ liệu khách hàng');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm xử lý lọc và sắp xếp
  const processedUsers = users
    .filter(user => {
      const searchTerm = filters.search.toLowerCase();
      return (
        user.hoten.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.sdt.includes(filters.search) ||
        user.cccd.includes(filters.search)
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'hoten':
          return a.hoten.localeCompare(b.hoten);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'sdt':
          return a.sdt.localeCompare(b.sdt);
        default:
          return 0;
      }
    });

  // Hàm bắt đầu chế độ chỉnh sửa
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData({
      hoten: user.hoten,
      email: user.email,
      sdt: user.sdt,
      cccd: user.cccd,
      gioitinh: user.gioitinh
    });
  };

  // Hàm xử lý thay đổi dữ liệu khi chỉnh sửa
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Hàm lưu thay đổi - sau này sẽ thay bằng API call
  const handleSaveClick = async () => {
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setUsers(users.map(user => 
        user.id === editingId ? { ...user, ...editFormData } : user
      ));
      setEditingId(null);
    } catch (err) {
      console.error('Error saving user:', err);
      alert('Có lỗi khi lưu thông tin khách hàng');
    }
  };

  // Hàm hủy bỏ chỉnh sửa
  const handleCancelClick = () => {
    setEditingId(null);
  };

  // Hàm xóa user - sau này sẽ thay bằng API call
  const handleDeleteClick = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Có lỗi khi xóa khách hàng');
      }
    }
  };

  // Hiển thị loading hoặc error nếu có
  if (isLoading) return <div className="p-4 text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {/* Phần header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản Lý Khách Hàng</h1>
          <p className="text-sm text-gray-600">Quản lý thông tin khách hàng trong hệ thống</p>
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
                placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc CCCD..."
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
            <option value="hoten">Sắp xếp theo Họ tên</option>
            <option value="email">Sắp xếp theo Email</option>
            <option value="sdt">Sắp xếp theo Số Điện Thoại</option>
          </select>
        </div>
      </div>

      {/* Bảng dữ liệu khách hàng */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số ĐT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CCCD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* Cột Họ tên */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="hoten"
                        value={editFormData.hoten}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                        required
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{user.hoten}</div>
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
                        required
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.email}</div>
                    )}
                  </td>
                  
                  {/* Cột Số Điện Thoại */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="tel"
                        name="sdt"
                        value={editFormData.sdt}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                        required
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.sdt}</div>
                    )}
                  </td>
                  
                  {/* Cột CCCD */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="cccd"
                        value={editFormData.cccd}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                        required
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{user.cccd}</div>
                    )}
                  </td>
                  
                  {/* Cột Giới tính */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <select
                        name="gioitinh"
                        value={editFormData.gioitinh ? 'true' : 'false'}
                        onChange={handleEditFormChange}
                        className="border rounded p-1 w-full"
                      >
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                      </select>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {user.gioitinh ? 'Nam' : 'Nữ'}
                      </div>
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