import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBanner from "./Header";
import Footer from "./Footer";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    cccd: "",
    gioiTinh: "true",
    checkIn: "",
    checkOut: "",
    soNguoi : 1
  });

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/v1/api/phongs/${id}`);
        const data = await res.json();
        setRoom({
          id: data.id,
          tenPhong: `Phòng ${data.SoPhong} - ${data.Loai}`,
          moTa: data.MoTa || "Phòng đầy đủ tiện nghi",
          giaTien: data.Gia,
          hinhAnh: [data.HinhAnh],
          tienNghi: data.TienIchPhongs?.map(ti => `${ti.TenTienIch} (${ti.MoTa})`) || [],
          raw: data
        });
        setCurrentImage(data.HinhAnh);
      } catch (err) {
        alert("Không thể tải chi tiết phòng");
      }
    };

    fetchRoomDetail();
  }, [id]);

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);
    const diffTime = end - start;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * (room?.giaTien || 0);
  };

  const handleBook = async () => {
    if (
      !form.hoTen || !form.email || !form.sdt || !form.cccd ||
      !form.checkIn || !form.checkOut
    ) {
      return alert("Vui lòng điền đầy đủ thông tin!");
    }

    if (!/^\d{10,11}$/.test(form.sdt)) {
      return alert("Số điện thoại phải từ 10 đến 11 chữ số!");
    }

    if (!form.email.includes("@")) {
      return alert("Email không hợp lệ! Phải chứa ký tự '@'");
    }

    if (!/^\d{12}$/.test(form.cccd)) {
      return alert("CCCD không hợp lệ! Phải là số có 12 chữ số.");
    }

    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);

    if (checkInDate >= checkOutDate) {
      return alert("Ngày nhận phòng phải trước ngày trả phòng!");
    }

    try {
      const res = await fetch(`http://localhost:5000/v1/api/datlich`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          HoTen: form.hoTen,
          email: form.email,
          SDT: form.sdt,
          GioiTinh: form.gioiTinh === "true",
          SoNguoi: parseInt(form.soNguoi || 0),
          NgayNhan: form.checkIn,
          NgayTra: form.checkOut,
          TongTien: calculateTotal(),
          id_phong: room.raw.id,
        }),
      });

      if (res.ok) {
        alert(`Đặt phòng thành công cho ${form.hoTen}!`);
      } else {
        alert("Đặt phòng thất bại!");
      }
    } catch (err) {
      console.error("Lỗi đặt phòng:", err);
      alert("Lỗi kết nối đến server.");
    }
  };

  if (!room) return <div className="text-black p-6">Đang tải thông tin phòng...</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <HeaderBanner />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">{room.tenPhong}</h1>
        <p className="text-gray-700 text-base mb-6 max-w-3xl leading-relaxed">{room.moTa}</p>

        <img
          src={currentImage}
          alt="Ảnh phòng"
          className="w-full max-w-4xl rounded-xl shadow-lg mb-4 object-cover"
        />

        <div className="flex gap-3 mb-10 overflow-x-auto">
          {room.hinhAnh.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              onClick={() => setCurrentImage(img)}
              className={`h-20 w-28 object-cover rounded-md border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                img === currentImage ? "border-blue-500 shadow-md" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full lg:w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Đặt phòng ngay</h2>

            <input type="text" placeholder="Họ và tên" value={form.hoTen} onChange={(e) => setForm({ ...form, hoTen: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />
            <input type="text" placeholder="Số điện thoại" value={form.sdt} onChange={(e) => setForm({ ...form, sdt: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />
            <input type="text" placeholder="Số CCCD" value={form.cccd} onChange={(e) => setForm({ ...form, cccd: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />

            {/* Chọn giới tính */}
            <div className="flex gap-4 items-center mb-3">
              <label>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="true"
                  checked={form.gioiTinh === "true"}
                  onChange={(e) => setForm({ ...form, gioiTinh: e.target.value })}
                /> Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="false"
                  checked={form.gioiTinh === "false"}
                  onChange={(e) => setForm({ ...form, gioiTinh: e.target.value })}
                /> Nữ
              </label>
            </div>

            <input type="date" value={form.checkIn}
             min={new Date().toISOString().split("T")[0]}
             onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />
            <input type="date" value={form.checkOut} 
            min = {form.checkIn}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="w-full mb-3 p-2 rounded border border-gray-300" />

            <input
                  type="number"
                  min="1"
                  placeholder="Số người"
                  value={form.soNguoi || ""}
                  onChange={(e) => setForm({ ...form, soNguoi: e.target.value })}
                  className="w-full mb-3 p-2 rounded border border-gray-300"
                />
            {/* Tổng tiền & số đêm */}
            {calculateNights() > 0 && (
              <div className="text-right text-base font-medium text-gray-800 mt-2">
                Số đêm: {calculateNights()}<br />
                Tổng tiền: <span className="text-green-600 font-bold">{calculateTotal().toLocaleString()}đ</span>
              </div>
            )}

            <button onClick={handleBook} className="bg-orange-700 text-white w-full py-2 mt-3 font-bold rounded">
              ĐẶT NGAY - {room.giaTien.toLocaleString()}đ / đêm
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Nội quy khách sạn</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Check-in: 12:00 PM - 8:00 PM</li>
              <li>Check-out: 11:30 AM</li>
              <li>Không hút thuốc</li>
              <li>Không mang thú cưng</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3">Tiện nghi</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700 text-sm">
              {room.tienNghi.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
