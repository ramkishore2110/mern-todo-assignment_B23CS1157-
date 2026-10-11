// All backend calls live here, so the components stay focused on the UI.
const BASE_URL = "http://localhost:5000/api/tasks";

// Every function throws on failure, so the caller can show an error message.
async function handle(response) {
  const data = await response.json();
  if (!response.ok) {
    // the backend always sends { message: "..." } on an error
    throw new Error(data.message || "Request failed");
  }
  return data;
}

// GET /api/tasks
export async function getTasks() {
  return handle(await fetch(BASE_URL));
}

// POST /api/tasks
export async function createTask(title) {
  return handle(
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
  );
}

// PUT /api/tasks/:id  - used for BOTH toggling completed and editing the title
export async function updateTask(id, updates) {
  return handle(
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    })
  );
}

// DELETE /api/tasks/:id
export async function deleteTask(id) {
  return handle(
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  );
}
