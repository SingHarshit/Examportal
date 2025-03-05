import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./History.css";

const History: React.FC = () => {
  // Sample data (Replace with real API data)
  const examHistory = [
    { subject: "Math", score: 85, average: 75, date: "2024-02-01" },
    { subject: "Science", score: 78, average: 80, date: "2024-02-10" },
    { subject: "English", score: 90, average: 85, date: "2024-02-15" },
    { subject: "History", score: 88, average: 83, date: "2024-02-20" },
  ];

  return (
    <div className="history-page">
      <h2>Exam History</h2>

      {/* Previous Exams Table */}
      <table className="history-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Your Score</th>
            <th>Class Average</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {examHistory.map((exam, index) => (
            <tr key={index}>
              <td>{exam.subject}</td>
              <td>{exam.score}%</td>
              <td>{exam.average}%</td>
              <td>{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Performance Chart */}
      <div className="history-chart">
        <h3>Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={examHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" name="Your Score" />
            <Line type="monotone" dataKey="average" stroke="#8884d8" name="Class Average" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default History;
