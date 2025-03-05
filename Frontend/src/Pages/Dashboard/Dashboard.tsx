"use client";
import "./Dashboard.css"; // Importing CSS
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const student = {
  name: "John Doe",
  pendingExam: "Mathematics",
  totalScore: 750,
  percentage: 85,
  attemptedExams: 10,
  accuracy: 92,
};

const performanceData = [
  { date: "Jan", score: 75 },
  { date: "Feb", score: 80 },
  { date: "Mar", score: 78 },
  { date: "Apr", score: 85 },
  { date: "May", score: 90 },
];

const subjectScores = [
  { subject: "Math", score: 85, color: "#FF6384" },
  { subject: "Science", score: 78, color: "#36A2EB" },
  { subject: "English", score: 90, color: "#FFCE56" },
  { subject: "History", score: 70, color: "#4BC0C0" },
];

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <h1 className="dashboard-title">📚 {student.name}'s Exam Dashboard</h1>

      {/* Top Section - Pending Exam & Stats */}
      <div className="grid-container">
        {/* Pending Exam */}
        <div className="card">
          <h2 className="card-title">⏳ Pending Exam</h2>
          {student.pendingExam ? (
            <p className="pending-exam">{student.pendingExam}</p>
          ) : (
            <p className="no-exam">✅ No pending exams</p>
          )}
        </div>

        {/* Performance Stats */}
        <div className="card">
          <h2 className="card-title">📊 Performance Summary</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <p className="stat-value">{student.totalScore}</p>
              <p className="stat-label">Total Score</p>
            </div>
            <div className="stat-box">
              <p className="stat-value">{student.percentage}%</p>
              <p className="stat-label">Percentage</p>
            </div>
            <div className="stat-box">
              <p className="stat-value">{student.attemptedExams}</p>
              <p className="stat-label">Exams Attempted</p>
            </div>
            <div className="stat-box">
              <p className="stat-value">{student.accuracy}%</p>
              <p className="stat-label">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Graphs */}
      <div className="grid-container mt-6">
        {/* Performance Over Time Graph */}
        <div className="card">
          <h2 className="card-title">📈 Performance Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <XAxis dataKey="date" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#36A2EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject-Wise Scores */}
        <div className="card">
          <h2 className="card-title">📌 Subject-Wise Scores</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectScores}>
              <XAxis dataKey="subject" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              {subjectScores.map((subject, index) => (
                <Bar key={index} dataKey="score" fill={subject.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
