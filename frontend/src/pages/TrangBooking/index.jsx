import Header from "./Header";
import HomePage from "./HomePage"; // Đổi từ Content sang HomePage

const TrangBooking = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-10">
        <HomePage /> {/* Thay Content bằng HomePage */}
      </main>
    </div>
  );
};

export default TrangBooking;