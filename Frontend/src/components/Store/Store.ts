import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface Subject {
  name: string;
  questions: Question[];
}

interface ExamState {
  subjects: Subject[];
  submitted: boolean;
}

const initialState: ExamState = {
  subjects: [], // Store subjects with questions
  submitted: false,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<string>) => {
      state.subjects.push({ name: action.payload, questions: [] });
    },
    addQuestion: (state, action: PayloadAction<{ subjectName: string; question: Question }>) => {
      const subject = state.subjects.find((s) => s.name === action.payload.subjectName);
      if (subject) {
        subject.questions.push(action.payload.question);
      }
    },
    submitExam: (state) => {
      state.submitted = true;
    },
  },
});

export const { addSubject, addQuestion, submitExam } = examSlice.actions;

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
