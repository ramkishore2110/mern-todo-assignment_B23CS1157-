import { useState } from "react";

// Controlled form for adding a task (requirement B3).
// The parent (App) does the actual API call through onAdd.
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();                 // stop the browser reloading the page

    if (title.trim() === "") return;    // ignore empty input

    setSaving(true);
    const ok = await onAdd(title);
    setSaving(false);

    // Only clear the box if the task was really saved (requirement B3)
    if (ok) setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}                              /* value comes from state   */
        onChange={(e) => setTitle(e.target.value)} /* state updates on typing  */
      />
      <button type="submit" disabled={saving}>
        {saving ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
