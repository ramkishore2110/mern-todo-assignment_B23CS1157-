// One row of the list (requirements B4, B5).
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "task-item done" : "task-item"}>
      {/* Checkbox calls PUT through the parent */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />

      {/* .done in index.css gives this the strike-through */}
      <span className="task-title">{task.title}</span>

      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}
