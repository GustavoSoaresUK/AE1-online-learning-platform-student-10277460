import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'learning_platform.db');

const seed = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Clear existing data
  await db.run(`DELETE FROM courses`);
  await db.run(`DELETE FROM instructors`);
  await db.run(`DELETE FROM contacts`);
  await db.run(`DELETE FROM events`);

  // Insert courses
  await db.run(`INSERT INTO courses (name, instructor, duration) VALUES
    ('Web Development Basics', 'Alice Smith', '6 weeks'),
    ('JavaScript for Beginners', 'Bob Johnson', '4 weeks')
  `);

  // Insert instructors
  await db.run(`INSERT INTO instructors (name, bio, subject, email) VALUES
    ('Alice Smith', 'Expert in HTML & CSS', 'Web Development', 'alice@example.com'),
    ('Bob Johnson', 'JavaScript enthusiast with 10 years of experience', 'JavaScript', 'bob@example.com')
  `);

  // Insert events
  await db.run(`INSERT INTO events (title, description, date, instructor, type) VALUES
    ('Live JavaScript Workshop', 'Hands-on session on JavaScript', '2025-06-10', 'Alice Smith', 'Workshop'),
    ('Guest Lecture: Web Security', 'Industry talk on cybersecurity.', '2025-06-15', 'Bob Johnson', 'Guest Lecture'),
    ('Live Q&A', 'Open session with all instructors.', '2024-10-05', 'Multiple Instructors', 'Q&A'),
    ('CSS Masterclass', 'Deep dive into CSS', '2023-11-20', 'Alice Smith', 'Recorded Session')
  `);

  console.log('✅ Sample data inserted successfully.');
};

seed();
