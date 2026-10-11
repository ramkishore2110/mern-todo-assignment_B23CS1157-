// Mongoose model for one task document (requirement A3).
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // required: true -> Mongoose refuses to save a task without a title
  title: {
    type: String,
    required: true,
    trim: true
  },
  // default: false -> a new task always starts as "not done"
  completed: {
    type: Boolean,
    default: false
  },
  // default: Date.now -> the time is filled in automatically on create
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// The model name "Task" becomes the MongoDB collection "tasks".
module.exports = mongoose.model("Task", taskSchema);
