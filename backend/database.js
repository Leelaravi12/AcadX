
const Database = require("better-sqlite3");

const db = new Database("acadx.db");

console.log("Database connected successfully!");

// Students table
db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        department TEXT,
        year INTEGER
    )
`).run();

// Skills table
db.prepare(`
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
`).run();

// Student skills table
db.prepare(`
    CREATE TABLE IF NOT EXISTS student_skills (
        student_id INTEGER,
        skill_id INTEGER,
        level TEXT,
        PRIMARY KEY (student_id, skill_id),
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (skill_id) REFERENCES skills(id)
    )
`).run();

// Companies table
db.prepare(`
    CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`).run();

// Opportunities table
db.prepare(`
    CREATE TABLE IF NOT EXISTS opportunities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (company_id) REFERENCES companies(id)
    )
`).run();

// Required skills for each opportunity
db.prepare(`
    CREATE TABLE IF NOT EXISTS opportunity_skills (
        opportunity_id INTEGER,
        skill_id INTEGER,
        required_level TEXT,
        PRIMARY KEY (opportunity_id, skill_id),
        FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
        FOREIGN KEY (skill_id) REFERENCES skills(id)
    )
`).run();

console.log("Database tables created successfully!");
// Industry tables

db.exec(`
    CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        job_role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS industry_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        industry_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        required_level TEXT NOT NULL,
        FOREIGN KEY (industry_id) REFERENCES industries(id),
        FOREIGN KEY (skill_id) REFERENCES skills(id),
        UNIQUE(industry_id, skill_id)
    );
`);
module.exports = db;