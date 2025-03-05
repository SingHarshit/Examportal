import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ExamPage from "./Pages/Exams/Exams";
import Results from "./Pages/Result/Result";
import Sidebar from "./components/Sidebar/Sidebar";
import History from "./components/History/History";
import LoginHome from "./components/LoginHome/LoginHome";
import Login from "./components/Login/Login";
import Announcements from "./components/Instruction/Instrcutions";
import Leaderboard from "./Pages/Leader/Leaderboard";
import AdminPanel from "./Pages/Admin/Admin";
import RegistrationPage from "./Pages/Registration/Registration";

const App: React.FC = () => {
  const userRole: "student" | "admin" = "student"; // Toggle role here
  const location = useLocation(); // Get current route

  // Hide Sidebar on login and login home pages
  const hideSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />} {/* Sidebar is conditionally rendered */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
        
          <Route path="/announcements" element={<Announcements role={userRole} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginHome />} />
          <Route path="/exams" element={<ExamPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/results" element={<Results role={userRole} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/logout" element={<h2>Logging out...</h2>} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
