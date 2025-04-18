import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiX, FiHelpCircle } from "react-icons/fi";  // Feather icons
import { MdPersonAddAlt1 } from "react-icons/md";  // Material Design icons
import { AiOutlineTeam } from "react-icons/ai";    // Ant Design icons
import { BsChatDots } from "react-icons/bs";       // Bootstrap icons
import { BiSolidReport } from "react-icons/bi";    // Boxicons
import { motion } from "framer-motion";

const UserSidebar = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user?.userType;
  const MotionDiv = motion.div;

  const menuItems = [
    { label: "Home", icon: <FiHome />, path: "/app/home" },
    { label: "Register Team Member", icon: <MdPersonAddAlt1 />, path: "/app/register-team-member" },
    { label: "Team Details", icon: <AiOutlineTeam />, path: "/app/team-profile" },
    { label: "Competition Progress", icon: <BiSolidReport />, path: "/app/hackathon-progress" },
    { label: "Resource Request", icon: <FiUsers />, path: "/app/resource-request" },
    { label: "Manage Login Request", icon: <FiUsers />, path: "/app/manage-login-request" },
    // { label: "Team Chatroom", icon: <BsChatDots />, path: "/user/chatroom" },
    // { label: "Help & Queries", icon: <FiHelpCircle />, path: "/user/home" },
    
  ];

  if (userType === "Team Leader") {
    menuItems.push({
      label: "Team Details",
      icon: <AiOutlineTeam />,
      path: "/app/team-profile",
    });
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.05)] z-40"
        onClick={onClose}
      />
      
      
      )}

      {/* Sidebar */}
      <MotionDiv
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-[#e69e05] text-white shadow-lg z-50"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-yellow-300 text-xl font-semibold">
          User Panel
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex flex-col">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <Link
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-3 w-full py-3 px-4 text-base font-medium text-white hover:bg-yellow-600 transition-colors"
                style={{ textDecoration: "none" }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
              {index < menuItems.length - 1 && (
                <hr className="border-t border-yellow-300 w-full mx-auto my-0" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </MotionDiv>
    </>
  );
};

export default UserSidebar;
