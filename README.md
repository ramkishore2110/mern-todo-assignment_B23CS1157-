# MERN Stack To-Do List

Assignment 2 — 23CSB40B Web Technology, S7 CSE
Mar Baselios College of Engineering and Technology

A full-stack to-do list. Tasks are stored in MongoDB, served by an Express
REST API, and displayed by a React frontend. Every action (add, complete,
delete) calls the API and updates the screen without a page reload.

---

## Tech stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Database | MongoDB + Mongoose          |
| Backend  | Node.js + Express           |
| Frontend | React (Vite)                |

---

## Project structure

```
mern-todo/
├── backend/
│   ├── server.js            Express app, CORS, MongoDB connection
│   ├── models/Task.js       Mongoose schema (title, completed, createdAt)
│   ├── routes/tasks.js      GET / POST / PUT / DELETE  /api/tasks
│   ├── .env                 NOT committed - real values
│   ├── .env.example         committed - variable names only
│   └── .gitignore
├── frontend/
│   ├── index.html
│   ├── vite.config.js       dev server fixed to port 3000
│   └── src/
│       ├── main.jsx
│       ├── App.jsx          state, useEffect, add/toggle/delete handlers
│       ├── api.js           all fetch calls to the backend
│       ├── index.css
│       └── components/
│           ├── TaskForm.jsx   controlled input + Add button
│           ├── TaskList.jsx   maps the array to rows
│           └── TaskItem.jsx   one row: checkbox, title, delete
├── screenshots/
└── README.md
```

---

## How to run

You need **two terminals** — the backend and frontend run at the same time.

### 1. Start MongoDB

Either start MongoDB Community Server locally, or create a free
MongoDB Atlas cluster and copy its connection string.

### 2. Backend (terminal 1)

```
cd backend
npm install
```

Create a file named `.env` inside `backend/` (copy `.env.example`) and fill in:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todolist
CLIENT_URL=http://localhost:3000
```

For Atlas, use the connection string Atlas gives you as `MONGO_URI`.

```
npm start
```

Expected output:

```
Connected to MongoDB
Server running on http://localhost:5000
```

### 3. Frontend (terminal 2)

```
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

> The frontend must run on port 3000, because the backend only allows CORS
> requests from that address. The port is fixed in `frontend/vite.config.js`.

---

## Environment variables

| Variable     | Purpose                                | Example                                   |
|--------------|----------------------------------------|-------------------------------------------|
| `PORT`       | Port the Express server listens on     | `5000`                                    |
| `MONGO_URI`  | MongoDB connection string              | `mongodb://127.0.0.1:27017/todolist`      |
| `CLIENT_URL` | The only origin allowed by CORS        | `http://localhost:3000`                   |

`.env` is listed in `.gitignore` and is never committed. `.env.example`
is committed instead, so anyone cloning the repo knows which variables to set.

---

## API endpoints

| Method | Route             | Purpose                      | Success | Errors   |
|--------|-------------------|------------------------------|---------|----------|
| GET    | `/api/tasks`      | Fetch all tasks              | 200     | 500      |
| POST   | `/api/tasks`      | Create a task                | 201     | 400, 500 |
| PUT    | `/api/tasks/:id`  | Toggle complete / edit title | 200     | 400, 404 |
| DELETE | `/api/tasks/:id`  | Delete a task                | 200     | 400, 404 |

### Task schema

| Field       | Type    | Rule            |
|-------------|---------|-----------------|
| `title`     | String  | required        |
| `completed` | Boolean | default `false` |
| `createdAt` | Date    | default `now`   |

### Validation

Titles are passed through `String()` and `.trim()` before being saved.
An empty or whitespace-only title is rejected with **400 Bad Request**
and `{ "message": "Title is required" }`. A malformed MongoDB id returns
**400**, and an id that does not exist returns **404**.

---

## Testing the API with Postman

```
POST   http://localhost:5000/api/tasks     { "title": "Read chapter 4" }   -> 201
GET    http://localhost:5000/api/tasks                                      -> 200
PUT    http://localhost:5000/api/tasks/<id>  { "completed": true }          -> 200
DELETE http://localhost:5000/api/tasks/<id>                                 -> 200
```

Failing cases worth checking:

```
POST   /api/tasks   { "title": "   " }          -> 400 Title is required
DELETE /api/tasks/0123456789abcdef01234567      -> 404 Task not found
PUT    /api/tasks/abc   { "completed": true }   -> 400 Invalid task id
```

---

## Git workflow used

```
main
 ├── feature/backend    Express server, Task model, REST routes
 └── feature/frontend   React components, API calls
```

Both branches were pushed to GitHub and merged into `main` through
pull requests. Nothing was committed directly to `main`.

---

## Repository

GitHub: <paste your repository URL here>
