import { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const chiNhanhOptions = [
  { id: "CN01", ten: "Chi nhánh Quận 1" },
  { id: "CN02", ten: "Chi nhánh Thủ Đức" },
  { id: "CN03", ten: "Chi nhánh Gò Vấp" },
  { id: "CN04", ten: "Chi nhánh Bình Thạnh" }
];

const viTriOptions = [
  { id: "VT01", ten: "Lễ tân" },
  { id: "VT02", ten: "Quản lý" },
  { id: "VT03", ten: "Phục vụ" },
  { id: "VT04", ten: "Bảo vệ" }
];

const Users = () => {
  const [users, setUsers] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    hoTen: `Nhân viên ${i + 1}`,
    sdt: `09000000${i}`,
    cccd: `1234567890${i}`,
    gioiTinh: i % 2 === 0 ? "Nam" : "Nữ",
    email: `user${i + 1}@example.com`,
    password: "******",
    luong: 10000000 + i * 1000000,
    id_chinhanh: chiNhanhOptions[i % chiNhanhOptions.length].id,
    id_vitri: viTriOptions[i % viTriOptions.length].id
  })));

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [filters, setFilters] = useState({ search: '', sortBy: 'hoTen' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers(users.map(u => u.id === editingId ? form : u));
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá nhân viên này?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const processedUsers = users
    .filter(user => {
      const searchTerm = filters.search.toLowerCase();
      return (
        user.hoTen.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.sdt.includes(filters.search)
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'hoTen':
          return a.hoTen.localeCompare(b.hoTen);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'sdt':
          return a.sdt.localeCompare(b.sdt);
        case 'chinhanh':
          return a.sdt.localeCompare(b.id_chinhanh);
        case 'vitri':
          return a.sdt.localeCompare(b.id_vitri);
        default:
          return 0;
      }
    });

  const paginatedUsers = processedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Quản Lý Nhân Viên</h1>

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
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="hoTen">Sắp xếp theo Tên</option>
            <option value="email">Sắp xếp theo Email</option>
            <option value="sdt">Sắp xếp theo SĐT</option>
            <option value="chinhanh">Sắp xếp theo Chi Nhánh</option>
            <option value="vitri">Sắp xếp theo Vị Trí</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              {['Họ tên', 'SĐT', 'CCCD', 'Giới tính', 'Email', 'Lương', 'Chi nhánh', 'Vị trí', 'Thao tác'].map(col => (
                <th key={col} className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                {editingId === user.id ? (
                  <>
                    <td className="p-2"><input name="hoTen" value={form.hoTen} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2"><input name="sdt" value={form.sdt} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2"><input name="cccd" value={form.cccd} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2">
                      <select name="gioiTinh" value={form.gioiTinh} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm">
                        <option>Nam</option><option>Nữ</option><option>Khác</option>
                      </select>
                    </td>
                    <td className="p-2"><input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2"><input name="luong" value={form.luong} onChange={handleChange} type="number" className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2">
                      <select name="id_chinhanh" value={form.id_chinhanh} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm">
                        {chiNhanhOptions.map(cn => <option key={cn.id} value={cn.id}>{cn.ten}</option>)}
                      </select>
                    </td>
                    <td className="p-2">
                      <select name="id_vitri" value={form.id_vitri} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm">
                        {viTriOptions.map(vt => <option key={vt.id} value={vt.id}>{vt.ten}</option>)}
                      </select>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button onClick={handleSave} className="text-green-600"><CheckIcon className="w-5 h-5" /></button>
                      <button onClick={handleCancel} className="text-red-600"><XMarkIcon className="w-5 h-5" /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 align-middle whitespace-nowrap">{user.hoTen}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{user.sdt}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{user.cccd}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{user.gioiTinh}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{user.email}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{user.luong.toLocaleString()}đ</td>
                    <td className="p-2 align-middle whitespace-nowrap">{chiNhanhOptions.find(cn => cn.id === user.id_chinhanh)?.ten}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{viTriOptions.find(vt => vt.id === user.id_vitri)?.ten}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(user)} className="text-blue-600"><PencilIcon className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-600"><TrashIcon className="w-5 h-5" /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="text-sm">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Users;