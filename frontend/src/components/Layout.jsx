import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full grid lg:grid-cols-[20%_80%] grid-cols-1">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="bg-black/100">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
