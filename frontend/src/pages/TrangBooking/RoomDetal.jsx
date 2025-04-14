import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBanner from "./Header";
import Footer from "./Footer";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fakeRoom = {
      id,
      tenPhong: "Phòng Deluxe",
      moTa: "Phòng cao cấp có view thành phố, đầy đủ tiện nghi.",
      giaTien: 1500000,
      hinhAnh: [
        "/img/rooms/room1.png",
        "/img/rooms/room2.png",
        "/img/rooms/room3.png"
      ],
      tienNghi: [
        "Wi-Fi", "Hồ bơi", "Bồn tắm", "Chỗ đậu xe", "Máy lạnh", "TV màn hình phẳng"
      ]
    };
    setTimeout(() => {
      setRoom(fakeRoom);
      setCurrentImage(fakeRoom.hinhAnh[0]);
    }, 500);
  }, [id]);

  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    cccd: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    kids: 0,
  });

  const handleBook = () => {
    if (
      !form.hoTen || !form.email || !form.sdt || !form.cccd ||
      !form.checkIn || !form.checkOut
    ) {
      return alert(" Vui lòng điền đầy đủ thông tin!");
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
  
    alert(`✅ Đặt phòng thành công cho ${form.hoTen}!\nTừ ${form.checkIn} đến ${form.checkOut}`);
  };
  

  if (!room) return <div className="text-black p-6">Đang tải thông tin phòng...</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <HeaderBanner />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">{room.tenPhong}</h1>
        <p className="text-gray-700 text-base mb-6 max-w-3xl leading-relaxed">{room.moTa}</p>

        {/* Ảnh lớn */}
        <img
          src={currentImage}
          alt="Ảnh phòng"
          className="w-full max-w-4xl rounded-xl shadow-lg mb-4 object-cover"
        />

        {/* Thumbnail ảnh */}
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
          {/* Form đặt phòng */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full lg:w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Đặt phòng ngay</h2>

            <input
              type="text"
              placeholder="Họ và tên"
              value={form.hoTen}
              onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={form.sdt}
              onChange={(e) => setForm({ ...form, sdt: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />
            <input
              type="text"
              placeholder="Số CCCD"
              value={form.cccd}
              onChange={(e) => setForm({ ...form, cccd: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />

            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            />

            <select
              value={form.adults}
              onChange={(e) => setForm({ ...form, adults: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n} Người lớn</option>
              ))}
            </select>
            <select
              value={form.kids}
              onChange={(e) => setForm({ ...form, kids: e.target.value })}
              className="w-full mb-3 p-2 rounded border border-gray-300"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n}>{n} Trẻ em</option>
              ))}
            </select>

            <button
              onClick={handleBook}
              className="bg-orange-700 text-white w-full py-2 mt-2 font-bold rounded"
            >
              ĐẶT NGAY - {room.giaTien.toLocaleString()}đ / đêm
            </button>
          </div>

          {/* Nội dung bên phải */}
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
