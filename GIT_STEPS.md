# Git & GitHub steps (Part C — 6 marks)

Part C is marked on your *history*, not just the final code. C1 asks for at
least 5 commits with clear messages and says a single bulk upload will not
count. So commit as you build, not at the end.

If you have already written all the code, you can still build an honest
history by committing it in logical stages, in the order below.

---

## 1. Start the repository

```bash
cd mern-todo
git init
git branch -M main
```

Check that `.gitignore` exists and contains `node_modules` and `.env`.

```bash
git add .gitignore README.md
git commit -m "Add README and gitignore"
```

## 2. Backend on its own branch

```bash
git checkout -b feature/backend
```

Commit the backend in stages:

```bash
git add backend/package.json backend/server.js backend/.env.example
git commit -m "Set up Express server and MongoDB connection"

git add backend/models/Task.js
git commit -m "Add Task model with title, completed and createdAt"

git add backend/routes/tasks.js
git commit -m "Add GET and POST endpoints for tasks"

# (edit routes/tasks.js, or just commit the rest)
git add backend/
git commit -m "Add PUT and DELETE endpoints with validation"
```

Push it:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin feature/backend
```

## 3. Frontend on its own branch

Branch off `main`, not off the backend branch:

```bash
git checkout main
git checkout -b feature/frontend

git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/main.jsx frontend/src/index.css
git commit -m "Set up React app with Vite on port 3000"

git add frontend/src/api.js
git commit -m "Add API helper for backend calls"

git add frontend/src/components/
git commit -m "Add TaskForm, TaskList and TaskItem components"

git add frontend/src/App.jsx
git commit -m "Connect React UI to the REST API"

git push -u origin feature/frontend
```

## 4. Pull requests (C3)

On GitHub, for **each** branch:

1. Open the repository → **Pull requests** → **New pull request**
2. base: `main` ← compare: `feature/backend`
3. **Create pull request** → **Merge pull request** → **Confirm merge**

Repeat for `feature/frontend`.

Then bring the merges back to your computer:

```bash
git checkout main
git pull origin main
```

## 5. Screenshot for submission

GitHub → **Pull requests** → **Closed** tab. Both PRs should show as
merged. Save that screenshot as `screenshots/4-pull-requests.png`.

## 6. Check before submitting

```bash
git log --oneline          # at least 5 commits, clear messages
git branch -a              # main, feature/backend, feature/frontend
```

On GitHub, confirm:

- The repository is **public**
- `node_modules` is **not** in the repo
- `.env` is **not** in the repo
- `.env.example` **is** in the repo

If `.env` was committed by mistake, remove it from tracking:

```bash
git rm --cached backend/.env
git commit -m "Remove .env from version control"
git push
```

Then change any password that was exposed.
