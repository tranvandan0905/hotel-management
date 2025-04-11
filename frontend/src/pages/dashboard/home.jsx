import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  UsersIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
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

const Dashboard = () => {
  // Fake thống kê dữ liệu từ database
  const stats = [
    { title: "Nhân viên", icon: UsersIcon, value: 25, color: "bg-blue-500" },
    { title: "Lịch đặt", icon: CalendarDaysIcon, value: 58, color: "bg-orange-500" },
    { title: "Phòng", icon: BuildingOffice2Icon, value: 18, color: "bg-indigo-500" },
    { title: "Doanh thu", icon: CurrencyDollarIcon, value: "$125,600", color: "bg-green-500" },
  ];

  const revenueData = [
    { name: "Th1", value: 10500 },
    { name: "Th2", value: 16500 },
    { name: "Th3", value: 12300 },
    { name: "Th4", value: 18200 },
    { name: "Th5", value: 15700 },
    { name: "Th6", value: 21400 },
  ];

  const pieData = [
    { name: "Đã thanh toán", value: 45, color: "#4CAF50" },
    { name: "Chưa thanh toán", value: 13, color: "#F59E0B" },
  ];

  const latestBookings = [
    { id: 1, name: "Nguyễn Văn A", date: "2025-04-10", room: "P101", status: "Đã thanh toán" },
    { id: 2, name: "Trần Thị B", date: "2025-04-10", room: "P202", status: "Chưa thanh toán" },
    { id: 3, name: "Lê Văn C", date: "2025-04-11", room: "P103", status: "Đã thanh toán" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, color }, idx) => (
          <Card key={idx} className="p-4 flex items-center gap-4 shadow-sm">
            <div className={`${color} p-3 rounded-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600">
                {title}
              </Typography>
              <Typography variant="h5">{value}</Typography>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-4 shadow-sm">
          <Typography variant="h6" className="mb-4">
            Doanh thu 6 tháng gần đây
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 shadow-sm">
          <Typography variant="h6" className="mb-4">
            Tình trạng thanh toán
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4 mt-8">
        <Typography variant="h6" className="mb-4">
          Đơn đặt gần đây
        </Typography>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Tên khách</th>
                <th className="p-2">Ngày đặt</th>
                <th className="p-2">Phòng</th>
                <th className="p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {latestBookings.map((b) => (
                <tr key={b.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap">{b.name}</td>
                  <td className="p-2 whitespace-nowrap">{b.date}</td>
                  <td className="p-2 whitespace-nowrap">{b.room}</td>
                  <td className="p-2 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${b.status.includes("chưa") ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
