import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.scss';
import { FaBars, FaTimes, FaUserCog, FaHome, FaBullhorn, FaUsers, FaClipboardList, FaUniversity, FaBuilding, FaFileAlt } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/app/dashboard', icon: <FaHome /> },
    { name: 'Manage Users', path: '/admin/app/manage-users', icon: <FaUsers /> },
    { name: 'Announcement', path: '/admin/app/announcement', icon: <FaBullhorn /> },
    { name: 'Manage User Types', path: '/admin/app/manage-user-types', icon: <FaUserCog /> },
    { name: 'Manage Branches', path: '/admin/app/manage-branches', icon: <FaUniversity /> },
    { name: 'Manage Departments', path: '/admin/app/manage-department', icon: <FaBuilding /> },
    { name: 'Manage Resource Request', path: '/admin/app/resource-request', icon: <FaClipboardList /> },
    { name: 'Generate Reports', path: '/admin/app/reports', icon: <FaFileAlt /> },
  ];

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        <button onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => isOpen && toggleSidebar()} // Close sidebar on item click if it's open
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="text">{item.name}</span>} {/* Only show text if sidebar is open */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
