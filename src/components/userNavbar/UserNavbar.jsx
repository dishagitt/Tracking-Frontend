import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice"; 
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserNavbar.scss";
import logo from "../../assets/competition.png";

const UserNavbar = ({ onSidebarToggle }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutUser());               // Clear Redux state
    localStorage.clear();             // Clear localStorage (if not already in thunk)
    navigate("/login", { replace: true }); // Redirect and replace history
  };
  

  return (
    <Navbar expand="lg" className="user-navbar px-3 py-2 shadow-sm">
      <Container fluid>
        {/* Hamburger Icon */}
        <button
          className="sidebar-toggle text-white me-3"
          onClick={onSidebarToggle}
        >
          <FiMenu size={24} />
        </button>

        {/* Logo and Brand */}
        <Navbar.Brand className="d-flex align-items-center text-white fw-bold ml-12">
          <img
            src={logo}
            alt="College Logo"
            height="30"
            className="me-2"
            style={{ borderRadius: "4px" }}
          />
          User Dashboard
        </Navbar.Brand>

        {/* Right Side Icons */}
        <Nav className="ms-auto d-flex align-items-center gap-10">
          {/* Home Icon */}
          <a
            href="/user/home"
            className="text-white"
            style={{ fontSize: "30px" }}
          >
            <FaHome />
          </a>

          {/* Profile Dropdown */}
          <Dropdown align="end" className="mr-10">
            <Dropdown.Toggle
              as="div"
              className="text-white d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <FaUserCircle size={26} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/change-password">
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
