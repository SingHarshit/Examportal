const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const {createClient} = require("redis");
const bcrypt = require("bcrypt");
const Exam = require("./Exam"); // Import Exam Schema
const bodyParser=require("body-parser")
const app = express();
const server = http.createServer(app);
const User= require("./User");
app.use(express.json()); // Ensure this middleware is used


app.use(bodyParser.json());
app.use(cors({origin: "*"}))
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Redis Client Setup
const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });
  
  redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));
  redisClient.connect().then(() => console.log("✅ Connected to Redis"));
const exams = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Identify if the user is an admin or student
    socket.on("identify", ({ role }) => {
        socket.role = role; // Store role in socket instance
        console.log(`User identified as ${role}:`, socket.id);
    });

    // Student starts the exam
    socket.on("start-exam", async ({ studentID, duration }) => {
        if (!studentID) {
            socket.emit("error-message", "Student ID is required.");
            return;
        }

        socket.join(studentID);
        console.log(`Student ${studentID} started an exam.`);

        try {
            let exam = await Exam.findOne({ studentID });

            if (!exam) {
                // Store exam details in MongoDB
                exam = new Exam({ studentID, remainingTime: duration });
                await exam.save();

                exams[studentID] = { remainingTime: duration, interval: null };
            } else {
                exams[studentID] = { remainingTime: exam.remainingTime, interval: null };
            }

            // Start countdown timer
            exams[studentID].interval = setInterval(async () => {
                exams[studentID].remainingTime--;

                io.to(studentID).emit("timer-update", exams[studentID].remainingTime);

                await Exam.updateOne({ studentID }, { remainingTime: exams[studentID].remainingTime });

                if (exams[studentID].remainingTime <= 0) {
                    clearInterval(exams[studentID].interval);
                    io.to(studentID).emit("force-submit", "Time is up!");

                    await Exam.deleteOne({ studentID });
                    delete exams[studentID];

                    io.emit("exam-ended", { studentID, reason: "Time expired" });
                }
            }, 1000);
        } catch (error) {
            console.error("Error starting exam:", error);
        }
    });

    // Handle student reconnection
    socket.on("reconnect-student", async ({ studentID }) => {
        try {
            const exam = await Exam.findOne({ studentID });

            if (exam) {
                socket.join(studentID);
                socket.emit("timer-update", exam.remainingTime);
            }
        } catch (error) {
            console.error("Error handling reconnection:", error);
        }
    });

    // Admin requests all active exams
    socket.on("get-active-exams", async () => {
        if (socket.role === "admin") {
            const activeExams = await Exam.find();
            socket.emit("active-exams", activeExams);
        }
    });

    // Admin forces submission of an exam
    socket.on("force-submit-exam", async ({ studentID }) => {
        if (exams[studentID]) {
            clearInterval(exams[studentID].interval);
            io.to(studentID).emit("force-submit", "Exam forcibly submitted by Admin.");

            await Exam.deleteOne({ studentID });
            delete exams[studentID];

            io.emit("exam-ended", { studentID, reason: "Force-submitted by Admin" });
        }
    });

    // Handle user login (Fetch from Redis)
    socket.on("login", async ({ userID, password }) => {
        redisClient.get(userID, (err, storedPassword) => {
            if (err) {
                console.error("Redis Error:", err);
                socket.emit("error-message", "Server error. Try again later.");
                return;
            }

            if (!storedPassword) {
                socket.emit("error-message", "User not found.");
            } else if (storedPassword !== password) {
                socket.emit("error-message", "Incorrect password.");
            } else {
                socket.emit("login-success", { userID });
            }
        });
    });

    // Store registration details in Redis
    socket.on("register", async ({ userID, password }) => {
        redisClient.set(userID, password, (err, reply) => {
            if (err) {
                console.error("Redis Error:", err);
                socket.emit("error-message", "Registration failed.");
            } else {
                socket.emit("register-success", "Registration successful!");
            }
        });
    });

    // User disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
app.post("/register", async (req, res) => {
    try {
      const { name, email, password, role, studentID } = req.body;
  
      // Validate required fields
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Ensure the role is either "student" or "admin"
      if (role !== "student" && role !== "admin") {
        return res.status(400).json({ message: "Invalid role. Must be 'student' or 'admin'." });
      }
  
      // If role is student, studentID is required
      if (role === "student" && !studentID) {
        return res.status(400).json({ message: "Student ID is required for students" });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      console.log("Registering new user...");
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        studentID: role === "student" ? studentID : undefined, // Store studentID only for students
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error("Error in /register:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if credentials exist in Redis
      const cachedUser = await redisClient.get(email);
      if (cachedUser) {
        return res.json({ message: "Login successful (from Redis)", user: JSON.parse(cachedUser) });
      }
  3
      // Check user in MongoDB
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Store user in Redis for fast login (expires in 1 hour)
      await redisClient.set(email, JSON.stringify(user), { EX: 3600 });
  
      res.json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Logout & Remove Credentials from Redis
  app.post("/logout", async (req, res) => {
    try {
      const { email } = req.body;
  
      // Remove user session from Redis
      await redisClient.del(email);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

// Start Server
const PORT=process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});