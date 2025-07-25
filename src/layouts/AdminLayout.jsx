import { Outlet } from "react-router-dom";
import { Navbar } from "../components/core/Navbar";

export const AdminLayout = () => {
  return (
    <div>
      <Navbar role="admin" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
