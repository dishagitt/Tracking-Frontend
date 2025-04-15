import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserNavbar.scss";
import logo from "../../assets/competition.png";
import { useState } from "react";
import ChangePasswordPopup from "../cards/ChangePasswordPopup";

const UserNavbar = ({ onSidebarToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const [showChangePassword, setShowChangePassword] = useState(false);


  return (
    <Navbar expand="lg" className="user-navbar px-3 py-2 shadow-sm">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Left side: Toggle, logo */}
        <div className="d-flex align-items-center gap-3">
          <button className="sidebar-toggle" onClick={onSidebarToggle}>
            <FiMenu size={24} />
          </button>

          <Navbar.Brand className="d-flex align-items-center text-white fw-bold mb-0 ml-10">
            <img src={logo} alt="College Logo" className="me-2" />
            <span className="ml-2">User Dashboard</span>
          </Navbar.Brand>
        </div>

        {/* Icon Section - responsive float to left on small screen */}
        <div className="nav-icons d-flex align-items-center gap-4 ms-auto me-3">
          <a href="/app/home" className="text-white fs-3 mr-4 nav-icon-link">
            <FaHome />
          </a>

          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              className="text-white d-flex align-items-center nav-profile-toggle"
              style={{ cursor: "pointer" }}
            >
              <FaUserCircle size={26} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item href="/app/user-profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#"  onClick={() => setShowChangePassword(true)}>Change Password</Dropdown.Item>
           {/* Change Password Modal */}
          <ChangePasswordPopup
            show={showChangePassword}
            handleClose={() => setShowChangePassword(false)}
          />
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
