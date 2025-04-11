import { useState, useMemo } from 'react';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Card, Button, Typography, Input, Select, Option } from '@material-tailwind/react';

const AllBooking = () => {
  const initialBookings = [
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      sdt: "0123456789",
      email: "a@example.com",
      gioiTinh: "Nam",
      ngayNhan: "2025-04-15",
      ngayTra: "2025-04-17",
      soNguoi: 2,
      tongTien: 1500000,
      phong: "P101",
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      sdt: "0987654321",
      email: "b@example.com",
      gioiTinh: "Nữ",
      ngayNhan: "2025-04-16",
      ngayTra: "2025-04-18",
      soNguoi: 4,
      tongTien: 2500000,
      phong: "P202",
    },
    {
      id: 3, hoTen: "Lê Hoàng", sdt: "0934567890", email: "c@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-10", ngayTra: "2025-04-12", soNguoi: 3, tongTien: 1800000, phong: "P303",
    },
    {
      id: 4, hoTen: "Phạm Mai", sdt: "0923456789", email: "d@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-11", ngayTra: "2025-04-13", soNguoi: 2, tongTien: 1600000, phong: "P404",
    },
    {
      id: 5, hoTen: "Đỗ Khánh", sdt: "0912345678", email: "e@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-12", ngayTra: "2025-04-14", soNguoi: 1, tongTien: 1000000, phong: "P105",
    },
    {
      id: 6, hoTen: "Ngô Thảo", sdt: "0901234567", email: "f@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-14", ngayTra: "2025-04-16", soNguoi: 2, tongTien: 1300000, phong: "P106",
    },
    {
      id: 7, hoTen: "Trịnh Duy", sdt: "0976543210", email: "g@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-13", ngayTra: "2025-04-15", soNguoi: 3, tongTien: 1700000, phong: "P107",
    },
    {
      id: 8, hoTen: "Lý Hân", sdt: "0965432109", email: "h@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-15", ngayTra: "2025-04-18", soNguoi: 2, tongTien: 1400000, phong: "P108",
    },
    {
      id: 9, hoTen: "Tống Bình", sdt: "0954321098", email: "i@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-16", ngayTra: "2025-04-19", soNguoi: 2, tongTien: 1500000, phong: "P109",
    },
    {
      id: 10, hoTen: "Mai Trang", sdt: "0943210987", email: "j@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-17", ngayTra: "2025-04-20", soNguoi: 1, tongTien: 1100000, phong: "P110",
    },
    {
      id: 11, hoTen: "Bùi Phúc", sdt: "0932109876", email: "k@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-18", ngayTra: "2025-04-21", soNguoi: 2, tongTien: 1400000, phong: "P111",
    },
    {
      id: 12, hoTen: "Hồ Yến", sdt: "0921098765", email: "l@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-19", ngayTra: "2025-04-22", soNguoi: 3, tongTien: 1700000, phong: "P112",
    },
    {
      id: 13, hoTen: "Vũ Thành", sdt: "0910987654", email: "m@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-20", ngayTra: "2025-04-23", soNguoi: 1, tongTien: 1200000, phong: "P113",
    },
    {
      id: 14, hoTen: "Trần Tín", sdt: "0909876543", email: "n@example.com", gioiTinh: "Nam", ngayNhan: "2025-04-21", ngayTra: "2025-04-24", soNguoi: 4, tongTien: 2500000, phong: "P114",
    },
    {
      id: 15, hoTen: "Nguyễn Hà", sdt: "0898765432", email: "o@example.com", gioiTinh: "Nữ", ngayNhan: "2025-04-22", ngayTra: "2025-04-25", soNguoi: 2, tongTien: 1500000, phong: "P115",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    hoTen: "",
    sdt: "",
    email: "",
    gioiTinh: "",
    ngayNhan: "",
    ngayTra: "",
    soNguoi: 1,
    tongTien: 0,
    phong: "",
  });

  const itemsPerPage = 10;
  const totalPages = useMemo(() => Math.ceil(bookings.length / itemsPerPage), [bookings]);
  const currentBookings = useMemo(() =>
    bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [bookings, currentPage]);

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

  const handleDelete = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleSubmit = () => {
    const isValid = form.hoTen && form.sdt && form.email && form.ngayNhan && form.ngayTra && form.gioiTinh && form.phong;
    if (!isValid) return alert("Vui lòng nhập đầy đủ thông tin");
    if (new Date(form.ngayNhan) >= new Date(form.ngayTra)) return alert("Ngày nhận phải trước ngày trả");

    setBookings(prev => {
      if (form.id) return prev.map(b => b.id === form.id ? form : b);
      return [...prev, { ...form, id: prev.length + 1 }];
    });

    setIsEditing(false);
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
                  <td className="p-2 align-middle">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-2 align-middle">{b.hoTen}</td>
                  <td className="p-2 align-middle">{b.sdt}</td>
                  <td className="p-2 align-middle">{b.email}</td>
                  <td className="p-2 align-middle">{b.gioiTinh}</td>
                  <td className="p-2 align-middle">{b.ngayNhan}</td>
                  <td className="p-2 align-middle">{b.ngayTra}</td>
                  <td className="p-2 align-middle">{b.soNguoi}</td>
                  <td className="p-2 align-middle">{b.tongTien.toLocaleString()}đ</td>
                  <td className="p-2 align-middle">{b.phong}</td>
                  <td className="p-2 align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => handleEdit(b)} className="text-blue-600 hover:underline">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:underline">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Trang trước</Button>
          <span>Trang {currentPage} / {totalPages}</span>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Trang sau</Button>
        </div>
      </Card>
    </div>
  );
};

export default AllBooking;
