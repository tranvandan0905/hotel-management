import React from "react";
import Home from "@/pages/dashboard/home";
import Room from "@/pages/dashboard/room";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import AddRoom from "@/pages/dashboard/add-room";
import EditRoom from "@/pages/dashboard/edit-room";
import Users from "@/pages/dashboard/users";
import AllBooking from "@/pages/dashboard/all-booking";

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
        name: "Booking",
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
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "Sign Up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;