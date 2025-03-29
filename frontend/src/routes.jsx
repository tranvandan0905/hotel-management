import React from "react";
import Home from "@/pages/dashboard/home";
import Room from "@/pages/dashboard/room";
// import Notifications from "@/pages/dashboard/notifications";
import SignIn from "@/pages/auth/Sign-in";
import SignUp from "@/pages/auth/sign-up";
import AddRoom from "@/pages/dashboard/add-room";
import EditRoom from "@/pages/dashboard/edit-room"; // Thêm import mới
import Users from "@/pages/dashboard/users";
import AllBooking from "./pages/dashboard/all-booking";

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
      // {
      //   name: "Notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        name: "Thêm phòng",
        path: "/add-room",
        element: <AddRoom />,
        hiddenInSidebar: true
      },
      {
        name: "Booking",
        path: "/all-booking",
        element: <AllBooking />,
        hiddenInSidebar: true
      },
      {
        name: "Chỉnh sửa phòng",
        path: "/edit-room/:id", // Thêm route mới với dynamic parameter
        element: <EditRoom />,
        hiddenInSidebar: true // Ẩn trong sidebar
      },
      {
        name: "Tài khoản người dùng",
        path: "/users",
        element: <Users />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "Sign In",
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        name: "Sign Up",
        path: "/auth/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;