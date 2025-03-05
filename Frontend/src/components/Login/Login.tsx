import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  console.log("Login");
  const [role, setRole] = useState<string | null>(null);
  const [academicYear, setAcademicYear] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role && academicYear) {
      navigate("/login");
    } else {
      alert("Please select role and academic year");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirects to the registration page
  };

  return (
    <div className="login-container1">
      <h2>Login</h2>
      <div className="role-selection">
        <button className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>
          Student
        </button>
        <button className={role === "admin" ? "active" : ""} onClick={() => setRole("admin")}>
          Admin
        </button>
      </div>

      {role && (
        <div className="academic-year">
          <label>Select Academic Year:</label>
          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>
      )}

      <button className="login-button" onClick={handleLogin} disabled={!role || !academicYear}>
        Login
      </button>

      <p className="register-text">
        Don't have an account? <span onClick={handleRegister} className="register-link">Register Here</span>
      </p>
    </div>
  );
};

export default Login;
