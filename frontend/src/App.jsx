import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);     // the list shown on screen
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- Load all tasks once, when the page opens (requirement B2) ---------- */
  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Could not load tasks. Is the backend running on port 5000?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);                                     // [] = run only once

  /* ---------- Add (POST) ---------- */
  async function handleAdd(title) {
    try {
      const newTask = await createTask(title);
      // Put the new task at the top. A NEW array is made with the spread
      // operator - React only re-renders when the array identity changes.
      setTasks([newTask, ...tasks]);
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  /* ---------- Toggle complete / incomplete (PUT) ---------- */
  async function handleToggle(task) {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      // Replace just the one task that changed, keep the rest as they are.
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  /* ---------- Delete (DELETE) ---------- */
  async function handleDelete(id) {
    try {
      await deleteTask(id);
      // filter() returns a new array without that task
      setTasks(tasks.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <p className="subtitle">MERN Stack Assignment &mdash; 23CSB40B</p>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="empty">Loading tasks...</p>
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          {tasks.length > 0 && (
            <p className="count">
              {doneCount} of {tasks.length} completed
            </p>
          )}
        </>
      )}
    </div>
  );
}
