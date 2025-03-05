const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    studentID: { type: String, required: true, unique: true },
    remainingTime: { type: Number, required: true },
    startTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", examSchema);
