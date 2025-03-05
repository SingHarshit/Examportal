import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, submitExam } from "../../components/Store/Store";
import { io } from "socket.io-client";
import Full from "../../components/Fullscreen/Full"; // Import the Full component
import "./Exams.css";

const socket = io("http://localhost:3000");

const ExamPage: React.FC = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state: RootState) => state.exam.subjects);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studentID, setStudentID] = useState<string>("");
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [warningCount, setWarningCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleWarning = () => {
      setWarningCount((prev) => {
        if (prev + 1 >= 3) {
          alert("⚠️ You switched tabs too many times. Your exam is now being submitted.");
          handleExamSubmission();
          return 3;
        } else {
          alert(`⚠️ Warning ${prev + 1}/3: Switching tabs is not allowed!`);
          return prev + 1;
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden && examStarted) {
        handleWarning();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && examStarted) {
        handleWarning();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [examStarted]);

  // Disable Right Click
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  // Disable Escape Key
  useEffect(() => {
    const disableEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", disableEsc);
    return () => document.removeEventListener("keydown", disableEsc);
  }, []);

  useEffect(() => {
    socket.on("timer-update", (remainingTime: number) => {
      setTimeLeft(remainingTime);
    });

    socket.on("force-submit", (message: string) => {
      alert(message);
      setExamStarted(false);
      setSelectedSubject(null);
    });

    return () => {
      socket.off("timer-update");
      socket.off("force-submit");
    };
  }, []);

  const startExam = (subjectName: string) => {
    if (!studentID) {
      alert("Please enter your Student ID before starting the exam.");
      return;
    }

    setSelectedSubject(subjectName);
    setExamStarted(true);
    setWarningCount(0);

    socket.emit("start-exam", {
      studentID,
      duration: 60,
    });

    // Force Fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleExamSubmission = () => {
    dispatch(submitExam());
    setExamStarted(false);
    setSelectedSubject(null);
    socket.emit("force-submit-exam", { studentID });
  };

  return (
    <div className="exam-container">
      <h2>📖 Student Exam</h2>

      {!examStarted ? (
        <div>
          <label>
            🎓 Enter Student ID:
            <input
              type="text"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              placeholder="Enter your Student ID"
            />
          </label>

          <h3>📚 Available Subjects</h3>
          {subjects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.name}>
                    <td>{subject.name}</td>
                    <td>
                      <button onClick={() => startExam(subject.name)}>Start Exam</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No subjects available. Contact Admin.</p>
          )}
        </div>
      ) : (
        <>
          <button onClick={handleExamSubmission}>Submit Exam</button>
          <h3>📄 Questions for {selectedSubject}</h3>

          {timeLeft !== null && (
            <h4>⏳ Time Remaining: {Math.floor(timeLeft / 60)} min {timeLeft % 60} sec</h4>
          )}

          {subjects
            .find((s) => s.name === selectedSubject)
            ?.questions.map((q) => (
              <div key={q.id} className="question">
                <p>{q.question}</p>
                {q.options?.map((option, i) => (
                  <label key={i}>
                    <input type="radio" name={`question-${q.id}`} value={option} />
                    {option}
                  </label>
                ))}
              </div>
            ))}

          <h3>⚠️ Warnings: {warningCount}/3</h3>
        </>
      )}

      {/* Activate Webcam when the exam starts */}
      {examStarted && <Full examEnded={!examStarted} />}
    </div>
  );
};

export default ExamPage;
