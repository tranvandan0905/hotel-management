import React from "react";
import Home from "@/pages/dashboard/home";
import Room from "@/pages/dashboard/room";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import AddRoom from "@/pages/dashboard/add-room";
import EditRoom from "@/pages/dashboard/edit-room";
import AllBooking from "@/pages/dashboard/all-booking";
import Staff from "@/pages/dashboard/staffs";
import Users from "./pages/dashboard/users";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Room />,
        name: "Phòng",
      },
      {
        name: "Thêm phòng",
        path: "/add-room",
        element: <AddRoom />,
        hiddenInSidebar: true
      },
      {
        name: "Đặt phòng",
        path: "/all-booking",
        element: <AllBooking />,
        hiddenInSidebar: true
      },
      {
        name: "Chỉnh sửa phòng",
        path: "/edit-room/:id",
        element: <EditRoom />,
        hiddenInSidebar: true
      },
      {
        name: "Tài khoản nhân viên",
        path: "/staffs",
        element: <Staff />,
      },
      {
        name: "Tài khoản khách hàng",
        path: "/users",
        element: <Users />,
      }
    ],
  },
  
];

export default routes;