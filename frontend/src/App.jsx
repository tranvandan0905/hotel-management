import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import WebPage from "./layouts/WebPage"; // Đã đổi từ TrangChu.jsx sang WebPage.jsx
import HomePage from "@/pages/TrangBooking/HomePage"; // Thêm import cho trang chủ

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Thêm route cho trang chủ */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/booking" element={<WebPage />} /> {/* Đổi từ /TrangChu sang /booking */}
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Về trang chủ thay vì dashboard */}
    </Routes>
  );
}

export default App;