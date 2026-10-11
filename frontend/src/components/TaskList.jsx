import TaskItem from "./TaskItem";

// Turns the array of tasks into one TaskItem each.
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add your first one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key lets React tell the rows apart when the list changes
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
