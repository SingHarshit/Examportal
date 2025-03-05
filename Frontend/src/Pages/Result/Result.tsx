import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";
import "./Result.css";

interface Result {
  subject: string;
  score: number;
  total: number;
}

interface PastPerformance {
  exam: string;
  score: number;
}

const studentResults: Result[] = [
  { subject: "Mathematics", score: 85, total: 100 },
  { subject: "Physics", score: 72, total: 100 },
  { subject: "Chemistry", score: 90, total: 100 },
];

const classAverageResults: Result[] = [
  { subject: "Mathematics", score: 78, total: 100 },
  { subject: "Physics", score: 70, total: 100 },
  { subject: "Chemistry", score: 82, total: 100 },
];

const pastPerformances: PastPerformance[] = [
  { exam: "Exam 1", score: 65 },
  { exam: "Exam 2", score: 75 },
  { exam: "Exam 3", score: 85 },
  { exam: "Exam 4", score: 90 },
];

const calculateOverallPercentage = (results: Result[]) => {
  const totalScore = results.reduce((sum, res) => sum + res.score, 0);
  const totalMarks = results.reduce((sum, res) => sum + res.total, 0);
  return ((totalScore / totalMarks) * 100).toFixed(2);
};

const Results: React.FC<{ role: "student" | "admin" }> = ({ role }) => {
  const results = role === "student" ? studentResults : classAverageResults;
  const overallPercentage = calculateOverallPercentage(results);

  return (
    <div className="results-container">
      <h2>{role === "student" ? "My Results" : "Class Performance"}</h2>

      <div className="results-table">
        <h3>Exam Scores</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td>{res.subject}</td>
                <td>{res.score}</td>
                <td>{res.total}</td>
                <td>{((res.score / res.total) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="overall-percentage">Overall Percentage: {overallPercentage}%</h3>

      <div className="charts">
        <h3>Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" name="Student Score" />
          </BarChart>
        </ResponsiveContainer>

        {role === "admin" && (
          <div>
            <h3>Class Average Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classAverageResults} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#82ca9d" name="Class Average" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <h3>Past Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={pastPerformances} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="exam" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#ff7300" name="Previous Exams" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Results;
