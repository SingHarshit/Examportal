# 📚 Exam Portal

An advanced **Exam Portal** where students can take exams under strict proctoring, and admins can create and manage exams efficiently.

## ✨ Features
- **Full-Screen Mode Activation** – Prevents students from minimizing the exam window.
- **Tab Switching Prevention** – Automatic warnings and disqualification on tab switches.
- **Camera Monitoring** – Captures live video during the exam.
- **Blocked Keys & Shortcuts** – Disables copy-paste, right-click, and other shortcuts.
- **Exam Management** – Admins can create, edit, and delete exams.
- **User Authentication** – Secure login for students and admins.
- **Real-time Monitoring** – Logs user activity for better security.

## 🛠 Tech Stack

### Frontend:
- **React** (with TypeScript) – Component-based UI.
- **Redux** – State management.
- **Tailwind CSS** – Modern styling.

### Backend:
- **Node.js** – Server-side logic.
- **Express.js** – API routing and middleware.
- **MongoDB** – NoSQL database for storing user and exam data.
- **Redis** – Session management and caching.

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/exam-portal.git
cd exam-portal
```

### **2️⃣ Install Dependencies**
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### **3️⃣ Start the Application**
```sh
# Start frontend
cd client
npm start

# Start backend
cd ../server
npm start
```

### **4️⃣ Environment Variables**
Create a `.env` file in the `server` directory with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_secret_key
```

## 📸 Screenshots
(You can add UI screenshots here)

## 📬 Contact
For queries or contributions, feel free to reach out!

📧 Email: your-email@example.com  
🌐 GitHub: [your-username](https://github.com/SingHarshit)

