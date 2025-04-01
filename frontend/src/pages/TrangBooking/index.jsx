import HeaderBanner from "./Header";
import HomePage from "./HomePage";
import Footer from "./Footer";
const TrangBooking = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBanner />
      <main className="pt-20 pb-10">
        <HomePage />
      </main>
      <Footer/>
    </div>
  );
};

export default TrangBooking;