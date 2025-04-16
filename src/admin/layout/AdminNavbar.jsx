import React, { useState, useRef, useEffect } from 'react';
import './AdminNavbar.scss';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { FiKey } from 'react-icons/fi';
import { MdPersonOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopup from '../../components/cards/ChangePasswordPopup';

const AdminNavbar = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to toggle dropdown and show the change password popup
  const handleProfileClick = () => {
    if (!dropdownOpen) {
      setDropdownOpen(true); // Open dropdown when profile button is clicked
    } else {
      setDropdownOpen(false); // Close dropdown if it is open
    }
  };

  const handleChangePasswordClick = () => {
    setDropdownOpen(false); // Close the dropdown when change password is clicked
    setShowChangePassword(true); // Show the Change Password popup
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <h2 className='text-white'>Welcome, Admin</h2>
      </div>

      <div className="admin-navbar-right" ref={dropdownRef}>
        <div className="profile-wrapper">
          <button
            className="nav-icon-btn"
            onClick={handleProfileClick}
            title="Profile"
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false); // Close dropdown when navigating to Profile
                  navigate('/admin/app/admin-profile');
                }}
              >
                <MdPersonOutline />
                <span>Profile</span>
              </button>
              <button
                className="dropdown-item"
                onClick={handleChangePasswordClick}
              >
                <FiKey />
                <span>Change Password</span>
              </button>
            </div>
          )}
        </div>

        <button className="nav-icon-btn logout" title="Logout" onClick={onLogout}>
          <FaSignOutAlt />
        </button>
      </div>

      {/* Change Password Popup */}
      <ChangePasswordPopup
        show={showChangePassword}
        handleClose={() => setShowChangePassword(false)}
      />
    </nav>
  );
};

export default AdminNavbar;
