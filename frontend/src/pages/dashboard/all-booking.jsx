import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Card, Button, Typography, Select, Option,
} from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/v1/api/datlich";

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ id: null, check: 0 });

  const itemsPerPage = 10;
  const totalPages = useMemo(() => Math.ceil(bookings.length / itemsPerPage), [bookings]);
  const currentBookings = useMemo(() =>
    bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [bookings, currentPage]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      const mapped = res.data.map(b => {
        const checkRaw = b.Check ?? 0;
        const checkValue = parseInt(checkRaw) === 1 ? 1 : 0;
        return {
          id: b.id,
          hoTen: b.HoTen || b.hoTen || "",
          sdt: b.SDT || b.sdt || "",
          email: b.Email || b.email || "",
          gioiTinh: b.GioiTinh === true ? "Nam" : b.GioiTinh === false ? "Nữ" : "Khác",
          ngayNhan: b.NgayNhan?.slice(0, 10) || "",
          ngayTra: b.NgayTra?.slice(0, 10) || "",
          soNguoi: b.SoNguoi || b.soNguoi || 0,
          tongTien: b.TongTien || b.tongTien || 0,
          phong: b?.Phong?.SoPhong || b.phong || "",
          check: checkValue,
          trangThai: checkValue === 1 ? "Đã xác nhận" : "Đang xác nhận",
        }
      });
      setBookings(mapped);
    } catch (err) {
      console.error("Lỗi tải danh sách đặt phòng:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (booking) => {
    setForm({ id: booking.id, check: booking.check });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBookings();
    } catch (err) {
      console.error("Lỗi xoá đặt phòng:", err);
    }
  };

  const handleSubmit = async () => {
    if (!form.id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/${form.id}`, {
        Check: form.check,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(false);
      fetchBookings();
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  return (
    <div className="mt-8 px-2 md:px-6">
      <Card className="p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Typography variant="h6">Danh sách đặt lịch</Typography>
        </div>

        {isEditing && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 bg-gray-100 p-4 rounded">
            <Select label="Trạng thái" value={form.check.toString()} onChange={(val) => setForm({ ...form, check: Number(val) })}>
              <Option value="0">Đang xác nhận</Option>
              <Option value="1">Đã xác nhận</Option>
            </Select>
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
                <th className="p-2">Trạng thái</th>
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
                  <td className="p-2">{Number(b.tongTien || 0).toLocaleString()}đ</td>
                  <td className="p-2">{b.phong}</td>
                  <td className="p-2">{b.trangThai}</td>
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
