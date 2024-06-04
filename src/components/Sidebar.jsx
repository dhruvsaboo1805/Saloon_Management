import React, { useState } from "react";
import "../styles/Sidebar.css";
import {
  FaHome,
  FaCalendar,
  FaEnvelope,
  FaClipboardList,
  FaBoxOpen,
  FaTags,
  FaCheckSquare,
  FaPhone,
  FaFileInvoice,
  FaThLarge,
  FaUsers,
  FaTable,
  FaCog,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">SALOON</div>
        <div className="sidebar-menu-section">
          <NavLink to="/" className="navlink">
            <MenuItem icon={<FaHome />} label="Dashboard" active />
          </NavLink>
          <NavLink to = "/appointment" className="navlink">
            <MenuItem icon={<FaCalendar />} label="Appointment" />
          </NavLink>
          <MenuItem icon={<FaCalendar />} label="Calendar" />
          <MenuItem icon={<FaEnvelope />} label="Inbox" />
          <MenuItem icon={<FaClipboardList />} label="Order Lists" />
          <NavLink to = "/stockmanagement" className = "navlink">
            <MenuItem icon={<FaBoxOpen />} label="Product Stock" />
          </NavLink>
        </div>
        <div className="sidebar-menu-section">
          <div className="sidebar-section-title">PAGES</div>
          <MenuItem icon={<FaTags />} label="Pricing" />
          <MenuItem icon={<FaCalendar />} label="Calendar" />
          <MenuItem icon={<FaCheckSquare />} label="To-Do" />
          <MenuItem icon={<FaPhone />} label="Contact" />
          <MenuItem icon={<FaFileInvoice />} label="Invoice" />
          <MenuItem icon={<FaThLarge />} label="UI Elements" />
          <MenuItem icon={<FaUsers />} label="Team" />
          <MenuItem icon={<FaTable />} label="Table" />
        </div>
        <div className="sidebar-menu-section">
          <MenuItem icon={<FaCog />} label="Settings" />
          <MenuItem icon={<FaSignOutAlt />} label="Logout" />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, active }) => (
  <div className={`sidebar-menu-item ${active ? "active" : ""}`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
