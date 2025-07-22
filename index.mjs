import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbConnection } from './db.mjs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Flexible port with fallback

// Set up view engine and static folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => {
  res.render('index', { title: 'Online Learning Platform' });
});

// Courses Page
app.get('/courses', async (req, res) => {
  const db = await getDbConnection();
  const courses = await db.all('SELECT * FROM courses');
  res.render('courses', { title: 'Courses', courses });
});

// AJAX Course Search
app.get('/search-courses', async (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  const db = await getDbConnection();
  const results = await db.all(
    'SELECT * FROM courses WHERE LOWER(name) LIKE ?',
    [`%${searchQuery}%`]
  );
  res.json(results);
});

// Instructors Page
app.get('/instructors', async (req, res) => {
  const db = await getDbConnection();
  const instructors = await db.all('SELECT * FROM instructors');
  res.render('instructors', { title: 'Instructors', instructors });
});

// Contact Page (GET + AJAX POST)
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us', message: null });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const db = await getDbConnection();
  await db.run(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );

  res.json({ success: true, message: 'Thank you for your message!' });
});

// FAQ Page
app.get('/faq', (req, res) => {
  res.render('faq', { title: 'FAQs' });
});

// Events Page (AJAX filtering support)
app.get('/events', (req, res) => {
  res.render('events', { title: 'Live Events' });
});

// AJAX Event Filtering API
app.get('/api/events', async (req, res) => {
  const { year, type } = req.query;
  const db = await getDbConnection();

  let query = 'SELECT * FROM events WHERE 1=1';
  let params = [];

  if (year) {
    query += ' AND strftime("%Y", date) = ?';
    params.push(year);
  }
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }

  const events = await db.all(query, params);
  res.json(events);
});

// Event Detail Page
app.get('/event/:id', async (req, res) => {
  const db = await getDbConnection();
  const event = await db.get('SELECT * FROM events WHERE id = ?', [req.params.id]);

  if (!event) return res.status(404).send('Event not found');

  const isPast = new Date(event.date) < new Date();
  res.render('eventDetail', {
    title: event.title,
    event,
    status: isPast ? 'This event has already taken place.' : 'Registration is open.'
  });
});

// Interactive Activity Page
app.get('/activity', (req, res) => {
  res.render('activity', { title: 'Guess the Term' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
