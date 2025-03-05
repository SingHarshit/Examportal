import React, { useState } from "react";
import "./Instructions.css";
import Sidebar from "../Sidebar/Sidebar";

interface Exam {
  name: string;
  date: string;
  pattern: string;
}

const initialExams: Exam[] = [
  { name: "Mathematics Final", date: "March 15, 2025", pattern: "MCQs + Descriptive" },
  { name: "Physics Mid-Term", date: "March 20, 2025", pattern: "MCQs Only" },
  { name: "Chemistry Quiz", date: "March 25, 2025", pattern: "MCQs + Short Answer" },
];

const Announcements: React.FC<{ role: "student" | "admin" }> = ({ role }) => {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [newExam, setNewExam] = useState({ name: "", date: "", pattern: "" });

  const handleAddExam = () => {
    if (newExam.name && newExam.date && newExam.pattern) {
      setExams([...exams, newExam]);
      setNewExam({ name: "", date: "", pattern: "" });
    }
  };

  const handleDeleteExam = (index: number) => {
    const updatedExams = exams.filter((_, i) => i !== index);
    setExams(updatedExams);
  };

  return (
    <div className="announcements-container">
        <Sidebar/>
      <h2>📢 Announcements</h2>

      <section className="instructions">
        <h3>📜 General Instructions</h3>
        <ul>
          <li>Arrive at the exam hall **30 minutes** before the exam starts.</li>
          <li>Bring your **student ID card** and **hall ticket**.</li>
          <li>No **electronic devices** allowed.</li>
          <li>Use only **blue or black pens**.</li>
          <li>Follow the **exam duration** strictly.</li>
        </ul>
      </section>

      <section className="upcoming-exams">
        <h3>📅 Upcoming Exams</h3>
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Date</th>
              <th>Pattern</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.name}</td>
                <td>{exam.date}</td>
                <td>{exam.pattern}</td>
                {role === "admin" && (
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteExam(index)}>❌</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {role === "admin" && (
        <section className="admin-panel">
          <h3>➕ Add New Exam</h3>
          <input
            type="text"
            placeholder="Exam Name"
            value={newExam.name}
            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
          />
          <input
            type="date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pattern (MCQs, Descriptive...)"
            value={newExam.pattern}
            onChange={(e) => setNewExam({ ...newExam, pattern: e.target.value })}
          />
          <button className="add-btn" onClick={handleAddExam}>Add Exam</button>
        </section>
      )}

      <section className="exam-patterns">
        <h3>📖 Exam Pattern & Guidelines</h3>
        <ul>
          <li>MCQs: **1 mark per question**, **no negative marking**.</li>
          <li>Descriptive: Answer in **structured format**.</li>
          <li>Short Answers: Write concise and relevant responses.</li>
          <li>Practical Exams: Follow **lab safety rules**.</li>
        </ul>
      </section>

      <section className="important-notices">
        <h3>🔔 Important Notices</h3>
        <p>📌 **New Update:** Exam schedules have been revised, check the timetable.</p>
        <p>⚠️ **Reminder:** Last date to apply for **exam re-evaluation** is **March 10, 2025**.</p>
        <p>📅 **Mock tests** for Mathematics will be available from **March 5, 2025**.</p>
      </section>
    </div>
  );
};

export default Announcements;
