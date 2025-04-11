import { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PlusIcon
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
  { id: "VT04", ten: "Bảo vệ" },
  { id: "VT05", ten: "Kế toán" }
];

const Staff = () => {
  const [staffs, setStaffs] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    hoTen: `Nhân viên ${i + 1}`,
    sdt: `09000000${i}`,
    cccd: `1234567890${i}`,
    gioiTinh: i % 2 === 0 ? "Nam" : "Nữ",
    email: `staff${i + 1}@example.com`,
    luong: 10000000 + i * 1000000,
    id_chinhanh: chiNhanhOptions[i % chiNhanhOptions.length].id,
    id_vitri: viTriOptions[i % viTriOptions.length].id,
    ngayBatDau: `01/01/202${i % 3}`
  })));

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [filters, setFilters] = useState({ search: '', sortBy: 'hoTen' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    hoTen: '',
    sdt: '',
    cccd: '',
    gioiTinh: 'Nam',
    email: '',
    luong: 0,
    id_chinhanh: chiNhanhOptions[0].id,
    id_vitri: viTriOptions[0].id,
    ngayBatDau: new Date().toLocaleDateString()
  });
  const itemsPerPage = 10;

  const handleEdit = (staff) => {
    setEditingId(staff.id);
    setForm(staff);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setStaffs(staffs.map(s => s.id === editingId ? form : s));
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá nhân viên này?")) {
      setStaffs(staffs.filter(s => s.id !== id));
    }
  };

  const handleAddStaff = () => {
    const newId = Math.max(...staffs.map(s => s.id)) + 1;
    setStaffs([...staffs, { ...newStaff, id: newId }]);
    setShowAddForm(false);
    setNewStaff({
      hoTen: '',
      sdt: '',
      cccd: '',
      gioiTinh: 'Nam',
      email: '',
      luong: 0,
      id_chinhanh: chiNhanhOptions[0].id,
      id_vitri: viTriOptions[0].id,
      ngayBatDau: new Date().toLocaleDateString()
    });
  };

  const handleNewStaffChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const processedStaffs = staffs
    .filter(staff => {
      const searchTerm = filters.search.toLowerCase();
      return (
        staff.hoTen.toLowerCase().includes(searchTerm) ||
        staff.email.toLowerCase().includes(searchTerm) ||
        staff.sdt.includes(filters.search) ||
        staff.cccd.includes(filters.search)
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
          return a.id_chinhanh.localeCompare(b.id_chinhanh);
        case 'vitri':
          return a.id_vitri.localeCompare(b.id_vitri);
        case 'luong':
          return a.luong - b.luong;
        default:
          return 0;
      }
    });

  const paginatedStaffs = processedStaffs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(processedStaffs.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Nhân Viên</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Thêm nhân viên
        </button>
      </div>

      {/* Form thêm nhân viên mới */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Thêm Nhân Viên Mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
              <input
                type="text"
                name="hoTen"
                value={newStaff.hoTen}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
              <input
                type="tel"
                name="sdt"
                value={newStaff.sdt}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CCCD *</label>
              <input
                type="text"
                name="cccd"
                value={newStaff.cccd}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính *</label>
              <select
                name="gioiTinh"
                value={newStaff.gioiTinh}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={newStaff.email}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lương *</label>
              <input
                type="number"
                name="luong"
                value={newStaff.luong}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chi nhánh *</label>
              <select
                name="id_chinhanh"
                value={newStaff.id_chinhanh}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                {chiNhanhOptions.map(cn => (
                  <option key={cn.id} value={cn.id}>{cn.ten}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí *</label>
              <select
                name="id_vitri"
                value={newStaff.id_vitri}
                onChange={handleNewStaffChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                {viTriOptions.map(vt => (
                  <option key={vt.id} value={vt.id}>{vt.ten}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleAddStaff}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={!newStaff.hoTen || !newStaff.sdt || !newStaff.cccd || !newStaff.email}
            >
              Thêm nhân viên
            </button>
          </div>
        </div>
      )}

      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, SĐT hoặc CCCD..."
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
            <option value="luong">Sắp xếp theo Lương</option>
          </select>
        </div>
      </div>

      {/* Bảng danh sách nhân viên */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              {['Họ tên', 'SĐT', 'CCCD', 'Giới tính', 'Email', 'Lương', 'Chi nhánh', 'Vị trí', 'Ngày bắt đầu', 'Thao tác'].map(col => (
                <th key={col} className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedStaffs.map(staff => (
              <tr key={staff.id} className="border-t hover:bg-gray-50">
                {editingId === staff.id ? (
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
                    <td className="p-2"><input name="ngayBatDau" value={form.ngayBatDau} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="p-2 flex gap-2">
                      <button onClick={handleSave} className="text-green-600"><CheckIcon className="w-5 h-5" /></button>
                      <button onClick={handleCancel} className="text-red-600"><XMarkIcon className="w-5 h-5" /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.hoTen}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.sdt}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.cccd}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.gioiTinh}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.email}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.luong.toLocaleString()}đ</td>
                    <td className="p-2 align-middle whitespace-nowrap">{chiNhanhOptions.find(cn => cn.id === staff.id_chinhanh)?.ten}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{viTriOptions.find(vt => vt.id === staff.id_vitri)?.ten}</td>
                    <td className="p-2 align-middle whitespace-nowrap">{staff.ngayBatDau}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(staff)} className="text-blue-600"><PencilIcon className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(staff.id)} className="text-red-600"><TrashIcon className="w-5 h-5" /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
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

export default Staff;