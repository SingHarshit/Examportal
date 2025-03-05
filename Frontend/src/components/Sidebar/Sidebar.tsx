import React from "react";
import "./Sidebar.css";
import { FaTachometerAlt, FaBook, FaChartBar, FaClipboardList, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPerson } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </li>
        <li onClick={() => navigate("/exams")}>
          <FaBook className="icon" />
          <span>Exams</span>
        </li>
        <li onClick={() => navigate("/leaderboard")}>
          <FaChartBar className="icon" />
          <span>Leaderboard</span>
        </li>
        <li onClick={() => navigate("/results")}>
          <FaClipboardList className="icon" />
          <span>Results</span>
        </li>
        <li onClick={() => navigate("/announcements")}>
          <FaSignOutAlt className="icon" />
          <span>Announcement</span>
        </li>
        <li onClick={() => navigate("/history")}>
          <FaHistory className="icon" />
          <span>History</span>
        </li>
        <li onClick={() => navigate("/admin")}>
          <FaPerson className="icon" />
          <span>Admin</span>
        </li>
        <li className="logout" onClick={() => navigate("/login")}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
