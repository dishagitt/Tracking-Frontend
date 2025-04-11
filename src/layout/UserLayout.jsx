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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <UserNavbar onSidebarToggle={toggleSidebar} />

      {/* Main Content: Sidebar + Page Content */}
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar - controlled by toggle */}
        <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />


        {/* Main Content */}
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow text-center p-4">
        © 2025 College Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
