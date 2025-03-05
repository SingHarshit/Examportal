import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

const RegistrationPage: React.FC = () => {
  const navigate=useNavigate()
  const [role, setRole] = useState<"student" | "admin">("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentID: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      role,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      studentID: role === "student" ? formData.studentID : undefined, // Only send if student
    };

    console.log(import.meta.env.VITE_API_KEY)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_FRONTEND_URL}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response)
      alert(`✅ ${role === "student" ? "Student" : "Admin"} registered successfully!`);
      setFormData({ name: "", email: "", password: "", studentID: "" }); // Reset form
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      console.error("Error:", error);
      alert(`❌ Registration failed: ${error.response?.data?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>📝 {role === "student" ? "Student" : "Admin"} Registration</h2>

      <div className="role-toggle">
        <button className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>
          Student
        </button>
        <button className={role === "admin" ? "active" : ""} onClick={() => setRole("admin")}>
          Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <label>👤 Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>📧 Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>🔒 Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        {role === "student" && (
          <>
            <label>🎓 Student ID:</label>
            <input type="text" name="studentID" value={formData.studentID} onChange={handleChange} required />
          </>
        )}

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
