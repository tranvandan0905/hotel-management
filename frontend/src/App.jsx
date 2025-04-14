import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import WebPage from "./layouts/WebPage"; // Đã đổi từ TrangChu.jsx sang WebPage.jsx
import RoomDetail from "./pages/TrangBooking/RoomDetal";
function App() {
  return (
    <Routes>
      <Route path="/dashboard*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="*" element={<WebPage />} /> {/* Đổi từ /TrangChu sang /booking */}
      <Route path="/room/:id" element={<RoomDetail />} />
    </Routes>
  );
}

export default App;