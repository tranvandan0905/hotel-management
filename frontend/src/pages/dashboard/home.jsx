import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import {
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,

} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 🔹 Dữ liệu thống kê
const statsData = [
  { title: "Users", value: "1,500", change: "+15% Since last month", icon: UsersIcon, color: "bg-blue-500", changeColor: "text-green-500" },
  { title: "Orders", value: "320", change: "-5% Since last week", icon: ShoppingCartIcon, color: "bg-red-500", changeColor: "text-red-500" },
  { title: "Room", value: "200", change: "", icon: BuildingOfficeIcon, color: "bg-indigo-500", changeColor: "text-indigo-500" },
  { title: "Revenue", value: "$12,500", icon: CurrencyDollarIcon, color: "bg-green-500", isText: true },
];



// 🔹 Dữ liệu biểu đồ Line Chart
const lineChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 600 },
];

// 🔹 Dữ liệu biểu đồ Pie Chart
const pieChartData = [
  { name: "Completed", value: 75, color: "#4CAF50" },
  { name: "Remaining", value: 25, color: "#FF9800" },
];

// 🔹 Hàm lấy class theo trạng thái

const Home = () => {
  
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Cards Thống kê */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map(({ title, value, change, icon: Icon, color, isText, changeColor }, index) => (
          <Card key={index} className="p-4 flex items-center gap-4 shadow-sm">
            <div className={`${color} p-3 rounded-lg`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600">{title}</Typography>
              <Typography variant="h5">{value}</Typography>
              {!isText && change && <Typography className={`text-sm ${changeColor}`}>{change}</Typography>}
            </div>
          </Card>
        ))}
      </div>
  
      {/* 🔹 Biểu đồ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* 🔹 Line Chart */}
        <Card className="p-4 shadow-sm">
          <Typography variant="h6" className="mb-4">Sales Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
  
        {/* 🔹 Pie Chart */}
        <Card className="p-4 shadow-sm">
          <Typography variant="h6" className="mb-4">Project Completion</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
  
     
    </div>
  );
};

export default Home;
