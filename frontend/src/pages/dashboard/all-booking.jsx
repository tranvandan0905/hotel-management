import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Card, Button, Typography, Input, Select, Option,
} from "@material-tailwind/react";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/datlich";

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: null, hoTen: "", sdt: "", email: "", gioiTinh: "",
    ngayNhan: "", ngayTra: "", soNguoi: 1, tongTien: 0, phong: ""
  });

  const itemsPerPage = 10;
  const totalPages = useMemo(() => Math.ceil(bookings.length / itemsPerPage), [bookings]);
  const currentBookings = useMemo(() =>
    bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [bookings, currentPage]);

  // Lấy danh sách từ API
  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách đặt phòng:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAdd = () => {
    setForm({
      id: null, hoTen: "", sdt: "", email: "", gioiTinh: "",
      ngayNhan: "", ngayTra: "", soNguoi: 1, tongTien: 0, phong: ""
    });
    setIsEditing(true);
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Lỗi xoá đặt phòng:", err);
    }
  };

  const handleSubmit = async () => {
    const isValid = form.hoTen && form.sdt && form.email && form.ngayNhan && form.ngayTra && form.gioiTinh && form.phong;
    if (!isValid) return alert("Vui lòng nhập đầy đủ thông tin");
    if (new Date(form.ngayNhan) >= new Date(form.ngayTra)) return alert("Ngày nhận phải trước ngày trả");

    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setIsEditing(false);
      fetchBookings();
    } catch (err) {
      console.error("Lỗi khi lưu đặt phòng:", err);
    }
  };

  return (
    <div className="mt-8 px-2 md:px-6">
      <Card className="p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Typography variant="h6">Danh sách đặt lịch</Typography>
          <Button onClick={handleAdd}>
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Thêm đặt lịch
          </Button>
        </div>

        {isEditing && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 bg-gray-100 p-4 rounded">
            <Input label="Họ tên" value={form.hoTen} onChange={(e) => setForm({ ...form, hoTen: e.target.value })} />
            <Input label="SĐT" value={form.sdt} onChange={(e) => setForm({ ...form, sdt: e.target.value })} />
            <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Select label="Giới tính" value={form.gioiTinh} onChange={(val) => setForm({ ...form, gioiTinh: val })}>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
            <Input type="date" label="Ngày nhận" value={form.ngayNhan} onChange={(e) => setForm({ ...form, ngayNhan: e.target.value })} />
            <Input type="date" label="Ngày trả" value={form.ngayTra} onChange={(e) => setForm({ ...form, ngayTra: e.target.value })} />
            <Input type="number" label="Số người" value={form.soNguoi} onChange={(e) => setForm({ ...form, soNguoi: Number(e.target.value) })} />
            <Input type="number" label="Tổng tiền" value={form.tongTien} onChange={(e) => setForm({ ...form, tongTien: Number(e.target.value) })} />
            <Input label="Phòng (số phòng)" value={form.phong} onChange={(e) => setForm({ ...form, phong: e.target.value })} />
            <div className="col-span-1 sm:col-span-2 flex gap-2 mt-2">
              <Button color="green" onClick={handleSubmit}>Lưu</Button>
              <Button color="red" onClick={() => setIsEditing(false)}>Hủy</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Họ tên</th>
                <th className="p-2">SĐT</th>
                <th className="p-2">Email</th>
                <th className="p-2">Giới tính</th>
                <th className="p-2">Nhận</th>
                <th className="p-2">Trả</th>
                <th className="p-2">Số người</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Phòng</th>
                <th className="p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((b, index) => (
                <tr key={b.id} className="border-t text-center">
                  <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-2">{b.hoTen}</td>
                  <td className="p-2">{b.sdt}</td>
                  <td className="p-2">{b.email}</td>
                  <td className="p-2">{b.gioiTinh}</td>
                  <td className="p-2">{b.ngayNhan}</td>
                  <td className="p-2">{b.ngayTra}</td>
                  <td className="p-2">{b.soNguoi}</td>
                  <td className="p-2">{b.tongTien.toLocaleString()}đ</td>
                  <td className="p-2">{b.phong}</td>
                  <td className="p-2">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(b)} className="text-blue-600">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="text-red-600">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Trang trước</Button>
          <span>Trang {currentPage} / {totalPages}</span>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Trang sau</Button>
        </div>
      </Card>
    </div>
  );
};

export default AllBooking;
