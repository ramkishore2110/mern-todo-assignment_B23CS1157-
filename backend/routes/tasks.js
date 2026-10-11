// All four REST endpoints for /api/tasks (requirement A4).
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/**
 * Cleans a title coming from the request body (requirement A5).
 * String() guards against non-string values such as numbers, null or objects,
 * which would otherwise crash .trim().
 * Returns the cleaned title, or an empty string if it is not usable.
 */
function cleanTitle(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

/* ------------------------------------------------------------------
   GET /api/tasks  - fetch every task
------------------------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    // sort by newest first so the most recent task appears at the top
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);              // 200 OK
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/* ------------------------------------------------------------------
   POST /api/tasks  - create a new task
------------------------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);

    // An empty or whitespace-only title is rejected (requirement A5)
    if (title === "") {
      return res.status(400).json({ message: "Title is required" });  // 400 Bad Request
    }

    const task = await Task.create({ title });
    res.status(201).json(task);               // 201 Created
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

/* ------------------------------------------------------------------
   PUT /api/tasks/:id  - update a task
   Handles BOTH cases: toggling "completed" and editing the title.
------------------------------------------------------------------ */
router.put("/:id", async (req, res) => {
  try {
    // Build the update from only the fields that were actually sent,
    // so sending just { completed: true } does not wipe the title.
    const updates = {};

    if (req.body.title !== undefined) {
      const title = cleanTitle(req.body.title);
      if (title === "") {
        return res.status(400).json({ message: "Title is required" });
      }
      updates.title = title;
    }

    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // new: true returns the document AFTER the update, not before
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });     // 404 Not Found
    }

    res.status(200).json(task);
  } catch (err) {
    // A malformed MongoDB id (e.g. /api/tasks/abc) throws a CastError
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    res.status(500).json({ message: "Failed to update task" });
  }
});

/* ------------------------------------------------------------------
   DELETE /api/tasks/:id  - remove a task
------------------------------------------------------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
