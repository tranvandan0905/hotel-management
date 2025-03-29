import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
