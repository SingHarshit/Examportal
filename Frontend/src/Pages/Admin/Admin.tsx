import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addSubject, addQuestion } from "../../components/Store/Store";
import "./Admin.css";

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state: RootState) => state.exam.subjects);
  
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [newQuestion, setNewQuestion] = useState({ id: Date.now(), question: "", options: ["", "", "", ""], answer: "" });

  const handleAddSubject = () => {
    if (newSubject.trim() === "") return alert("Enter subject name!");
    dispatch(addSubject(newSubject));
    setNewSubject("");
  };

  const handleAddQuestion = () => {
    if (!selectedSubject) return alert("Select a subject first!");
    if (newQuestion.question.trim() === "" || newQuestion.answer.trim() === "") return alert("Fill all fields!");
    
    dispatch(addQuestion({ subjectName: selectedSubject, question: newQuestion }));
    setNewQuestion({ id: Date.now(), question: "", options: ["", "", "", ""], answer: "" });
  };

  return (
    <div className="admin-panel">
      <h2>🛠 Admin Panel</h2>

      {/* Add New Subject */}
      <div>
        <input type="text" placeholder="Enter Subject Name" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
        <button onClick={handleAddSubject}>➕ Add Subject</button>
      </div>

      {/* Select Subject and Add Question */}
      <div>
        <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>

        <input type="text" placeholder="Enter Question" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
        {newQuestion.options.map((opt, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={opt} onChange={(e) => {
            const updatedOptions = [...newQuestion.options];
            updatedOptions[index] = e.target.value;
            setNewQuestion({ ...newQuestion, options: updatedOptions });
          }} />
        ))}
        <input type="text" placeholder="Correct Answer" value={newQuestion.answer} onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })} />
        <button onClick={handleAddQuestion}>➕ Add Question</button>
      </div>
    </div>
  );
};

export default AdminPanel;
