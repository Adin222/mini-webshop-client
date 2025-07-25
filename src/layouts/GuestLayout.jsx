import { Outlet } from "react-router-dom";
import { Navbar } from "../components/core/Navbar";
import { Footer } from "../components/guest/Footer";

export const GuestLayout = () => {
  return (
    <div>
      <Navbar role="guest" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
