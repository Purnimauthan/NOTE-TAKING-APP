const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Database Setup ──
const db = new Database('notes.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag TEXT DEFAULT 'General',
    pinned INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    updated_at TEXT DEFAULT (datetime('now','localtime'))
  )
`);

// ── Middleware ──
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ──

// GET all notes (with optional search & tag filter)
app.get('/api/notes', (req, res) => {
  const { search, tag } = req.query;
  let query = 'SELECT * FROM notes WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (title LIKE ? OR content LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (tag && tag !== 'All') {
    query += ' AND tag = ?';
    params.push(tag);
  }

  query += ' ORDER BY pinned DESC, updated_at DESC';
  const notes = db.prepare(query).all(...params);
  res.json(notes);
});

// GET single note
app.get('/api/notes/:id', (req, res) => {
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// POST create note
app.post('/api/notes', (req, res) => {
  const { title, content, tag } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

  const result = db.prepare(
    'INSERT INTO notes (title, content, tag) VALUES (?, ?, ?)'
  ).run(title, content, tag || 'General');

  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(note);
});

// PUT update note
app.put('/api/notes/:id', (req, res) => {
  const { title, content, tag, pinned } = req.body;
  const existing = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Note not found' });

  db.prepare(`
    UPDATE notes SET
      title = ?,
      content = ?,
      tag = ?,
      pinned = ?,
      updated_at = datetime('now','localtime')
    WHERE id = ?
  `).run(
    title ?? existing.title,
    content ?? existing.content,
    tag ?? existing.tag,
    pinned !== undefined ? (pinned ? 1 : 0) : existing.pinned,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE note
app.delete('/api/notes/:id', (req, res) => {
  const result = db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Note not found' });
  res.json({ success: true });
});

// GET all unique tags
app.get('/api/tags', (req, res) => {
  const tags = db.prepare('SELECT DISTINCT tag FROM notes ORDER BY tag').all();
  res.json(['All', ...tags.map(t => t.tag)]);
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`✅ Noted app running at http://localhost:${PORT}`);
});
