import { Outlet } from "react-router";
import Navbar from "../features/auth/components/navbar/Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;