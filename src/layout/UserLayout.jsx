import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/userNavbar/UserNavbar";
import UserSidebar from "../components/userSidebar/UserSidebar";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Navbar */}
      <UserNavbar onSidebarToggle={toggleSidebar} />

      {/* Main Section */}
      <div className="flex-1 pt-16 relative z-10">
        {/* Sidebar (overlays content) */}
        <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="relative z-10 p-4">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow text-center p-4 z-10 relative">
        © 2025 College Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
