# 📝 Noted — Full Stack Note Taking App

A clean, full stack note taking app built with **Node.js**, **Express**, and **SQLite** — no cloud database needed, everything runs locally.

![Noted App](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20SQLite-6c5ce7?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- ✅ Create, edit, and delete notes
- 📌 Pin important notes to the top
- 🏷️ Tag notes (Work, Study, Personal, Ideas, General)
- 🔍 Search notes by title or content
- 🗂️ Filter notes by tag
- 💾 Data stored in local SQLite database (no cloud needed)
- ⌨️ Keyboard shortcut: `Ctrl+N` to create a new note

---

## 🛠 Tech Stack

| Layer    | Technology         |
|----------|--------------------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend  | Node.js + Express  |
| Database | SQLite (better-sqlite3) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/noted-app.git

# 2. Go into the project folder
cd noted-app

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### Then open your browser and visit:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
noted-app/
├── server.js          # Express server + API routes
├── package.json       # Project config & dependencies
├── notes.db           # SQLite database (auto-created on first run)
└── public/
    ├── index.html     # Frontend UI
    ├── style.css      # All styles (dark theme)
    └── app.js         # Frontend logic (fetch API calls)
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | /api/notes       | Get all notes (supports `?search=` and `?tag=`) |
| GET    | /api/notes/:id   | Get a single note       |
| POST   | /api/notes       | Create a new note       |
| PUT    | /api/notes/:id   | Update a note           |
| DELETE | /api/notes/:id   | Delete a note           |
| GET    | /api/tags        | Get all unique tags     |

---

## 📸 What it Looks Like

- Dark sidebar with tag navigation and search
- Masonry-style card grid for notes
- Modal popup for creating/editing notes
- Toast notifications for actions

---

## 📬 Future Ideas

- User authentication (login/signup)
- Rich text editor (markdown support)
- Export notes as PDF
- Note sharing via link

---

## 📄 License

MIT — free to use and modify.
