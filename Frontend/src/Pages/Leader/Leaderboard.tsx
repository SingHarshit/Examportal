import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Leaderboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";

// Sample student data (sorted by score)
const students = [
  { rank: 1, name: "Alice Johnson", score: 98 },
  { rank: 2, name: "Bob Smith", score: 95 },
  { rank: 3, name: "Charlie Lee", score: 92 },
  { rank: 4, name: "David Brown", score: 88 },
  { rank: 5, name: "Emma Wilson", score: 85 },
  { rank: 6, name: "Frank Thomas", score: 82 },
];

// Data for the top 3 students' performance in past exams
const topThreePerformance = [
  { name: "Alice", Exam1: 90, Exam2: 95, Exam3: 98 },
  { name: "Bob", Exam1: 88, Exam2: 92, Exam3: 95 },
  { name: "Charlie", Exam1: 85, Exam2: 90, Exam3: 92 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="leaderboard-container">
      <Sidebar/>
      <h2>🏆 Leaderboard</h2>

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rank}>
              <td>{student.rank}</td>
              <td>{student.name}</td>
              <td>{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Performance Graph for Top 3 Students */}
      <h3>📈 Top 3 Students' Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topThreePerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Exam1" fill="#8884d8" name="Exam 1" />
          <Bar dataKey="Exam2" fill="#82ca9d" name="Exam 2" />
          <Bar dataKey="Exam3" fill="#ffc658" name="Exam 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Leaderboard;
