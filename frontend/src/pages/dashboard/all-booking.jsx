import { useState, useMemo } from 'react';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Card, Button, Typography, Input, Select, Option } from '@material-tailwind/react';

const AllBooking = () => {
  const initialBookings = [
    { id: 1, name: "John Deo", checkIn: "2019-08-12", checkOut: "2019-08-15", status: "Paid", phone: "(123)123456", roomType: "Single", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Jens Brincker", checkIn: "2019-08-13", checkOut: "2019-08-16", status: "Unpaid", phone: "(123)123456", roomType: "Double", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 3, name: "Mark Hay", checkIn: "2019-08-15", checkOut: "2019-08-18", status: "Paid", phone: "(123)123456", roomType: "Single", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Anthony Davie", checkIn: "2019-08-16", checkOut: "2019-08-17", status: "Unpaid", phone: "(123)123456", roomType: "King", image: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Alan Gilchrist", checkIn: "2019-08-21", checkOut: "2019-08-23", status: "Paid", phone: "(123)123456", roomType: "Queen", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Sue Woodger", checkIn: "2019-08-25", checkOut: "2019-08-26", status: "Pending", phone: "(123)123456", roomType: "Single", image: "https://randomuser.me/api/portraits/men/6.jpg" },
    { id: 7, name: "David Perry", checkIn: "2019-08-26", checkOut: "2019-08-29", status: "Unpaid", phone: "(123)123456", roomType: "Single", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    { id: 8, name: "Sneha Pandit", checkIn: "2019-08-27", checkOut: "2019-08-28", status: "Paid", phone: "(123)123456", roomType: "Double", image: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 9, name: "Robert Smith", checkIn: "2019-09-01", checkOut: "2019-09-05", status: "Paid", phone: "(456)789123", roomType: "King", image: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: 10, name: "Alice Johnson", checkIn: "2019-09-03", checkOut: "2019-09-07", status: "Pending", phone: "(987)654321", roomType: "Queen", image: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 11, name: "Michael Brown", checkIn: "2019-09-10", checkOut: "2019-09-15", status: "Unpaid", phone: "(321)456789", roomType: "Single", image: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 12, name: "Emma Wilson", checkIn: "2019-09-12", checkOut: "2019-09-14", status: "Paid", phone: "(111)222333", roomType: "Double", image: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 13, name: "William Taylor", checkIn: "2019-09-18", checkOut: "2019-09-20", status: "Pending", phone: "(444)555666", roomType: "King", image: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: 14, name: "Olivia Martinez", checkIn: "2019-09-22", checkOut: "2019-09-25", status: "Unpaid", phone: "(777)888999", roomType: "Queen", image: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: 15, name: "Daniel Garcia", checkIn: "2019-09-28", checkOut: "2019-09-30", status: "Paid", phone: "(123)987654", roomType: "Single", image: "https://randomuser.me/api/portraits/men/15.jpg" },
  ];

  const [allBookings, setAllBookings] = useState(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({ id: null, name: '', checkIn: '', checkOut: '', status: '', phone: '', roomType: '' });
  const [isEditing, setIsEditing] = useState(false);

  const itemsPerPage = 10;
  const totalPages = useMemo(() => Math.ceil(allBookings.length / itemsPerPage), [allBookings]);
  const currentBookings = useMemo(() => allBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [allBookings, currentPage, itemsPerPage]);

  const getStatusClass = (status) => {
    const statusColors = {
      Paid: "bg-green-100 text-green-600",
      Unpaid: "bg-red-100 text-red-600",
      Pending: "bg-yellow-100 text-yellow-600",
    };
    return statusColors[status] || "bg-gray-100 text-gray-600";
  };

  const handleDelete = (id) => {
    setAllBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setForm({ id: null, name: '', checkIn: '', checkOut: '', status: '', phone: '', roomType: '' });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.checkIn || !form.checkOut || !form.status || !form.phone || !form.roomType) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (new Date(form.checkIn) >= new Date(form.checkOut)) {
      alert("Ngày check-in phải trước ngày check-out");
      return;
    }

    setAllBookings(prev => {
      if (form.id) {
        return prev.map(booking => booking.id === form.id ? form : booking);
      }
      return [...prev, { ...form, id: prev.length + 1, image: "https://randomuser.me/api/portraits/lego/5.jpg" }];
    });

    setIsEditing(false);
  };

  return (
    <div className="mt-8">
      <Card className="p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6">Booking Details</Typography>
          <Button color="blue" onClick={handleAdd}>
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Add Booking
          </Button>
        </div>

        {isEditing && (
          <div className="p-4 border rounded mb-4">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="date" label="Check In" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
            <Input type="date" label="Check Out" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Select label="Status" value={form.status} onChange={(val) => setForm({ ...form, status: val })}>
              <Option value="Paid">Paid</Option>
              <Option value="Unpaid">Unpaid</Option>
              <Option value="Pending">Pending</Option>
            </Select>
            <Select label="Room Type" value={form.roomType} onChange={(val) => setForm({ ...form, roomType: val })}>
              <Option value="Single">Single</Option>
              <Option value="Double">Double</Option>
              <Option value="King">King</Option>
              <Option value="Queen">Queen</Option>
            </Select>
            <Button color="green" onClick={handleSubmit} className="mt-2">Save</Button>
            <Button color="red" onClick={() => setIsEditing(false)} className="mt-2 ml-2">Cancel</Button>
          </div>
        )}

        <table className="w-full mt-4 border">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-100">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Check In</th>
              <th className="p-2">Check Out</th>
              <th className="p-2">Status</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Room Type</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={booking.id} className="border-t">
                <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <img src={booking.image} alt={booking.name} className="w-8 h-8 rounded-full" />
                  {booking.name}
                </td>
                <td className="p-2">{booking.checkIn}</td>
                <td className="p-2">{booking.checkOut}</td>
                <td className={`p-2 ${getStatusClass(booking.status)}`}>{booking.status}</td>
                <td className="p-2">{booking.phone}</td>
                <td className="p-2">{booking.roomType}</td>
                <td className="p-2 flex space-x-2">
                  <button onClick={() => handleEdit(booking)} className="text-blue-500 hover:text-blue-700">
                    <PencilSquareIcon className="h-6 w-6" />
                  </button>
                  <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Điều hướng trang */}
       <div className="mt-4 flex justify-center gap-4">
         <Button 
           onClick={() => setCurrentPage(currentPage - 1)}
           disabled={currentPage === 1}
         >
           Trang trước
         </Button>

         <span>
           Trang {currentPage} / {totalPages}
         </span>

         <Button 
           onClick={() => setCurrentPage(currentPage + 1)}
           disabled={currentPage === totalPages}
         >
           Trang sau
         </Button>
       </div>
      </Card>
    </div>
  );
};

export default AllBooking;
