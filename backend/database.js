const Database = require("better-sqlite3");
const path = require("path");

// Always use the database inside the backend folder
const dbPath = path.join(__dirname, "acadx.db");

const db = new Database(dbPath);

console.log("Database connected successfully!");
console.log("Database file:", dbPath);

// ==========================================
// STUDENTS TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        department TEXT,
        year INTEGER
    )
`).run();

// ==========================================
// SKILLS TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
`).run();

// ==========================================
// STUDENT SKILLS TABLE
// ==========================================

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

// ==========================================
// COMPANIES TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`).run();

// ==========================================
// OPPORTUNITIES TABLE
// ==========================================

// Check whether opportunities table already exists
const opportunitiesTable = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    AND name = 'opportunities'
`).get();

if (!opportunitiesTable) {

    // Create the new opportunities table
    db.prepare(`
        CREATE TABLE opportunities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            role_title TEXT NOT NULL,
            opportunity_type TEXT NOT NULL,
            location TEXT NOT NULL,
            duration TEXT NOT NULL,
            description TEXT,
            skills TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Published',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    console.log("New opportunities table created.");

} else {

    // ==========================================
    // MIGRATE OLD OPPORTUNITIES TABLE
    // ==========================================

    const columns = db.prepare(`
        PRAGMA table_info(opportunities)
    `).all();

    const columnNames = columns.map(column => column.name);

    // Add company_name if missing
    if (!columnNames.includes("company_name")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN company_name TEXT
        `).run();

        // Try to copy company names from old company_id
        if (columnNames.includes("company_id")) {

            db.prepare(`
                UPDATE opportunities
                SET company_name = (
                    SELECT companies.name
                    FROM companies
                    WHERE companies.id = opportunities.company_id
                )
                WHERE company_name IS NULL
            `).run();

        }

        db.prepare(`
            UPDATE opportunities
            SET company_name = 'Unknown Company'
            WHERE company_name IS NULL
        `).run();

        console.log("Added company_name column.");
    }

    // Add role_title if missing
    if (!columnNames.includes("role_title")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN role_title TEXT
        `).run();

        // Copy old title into new role_title
        if (columnNames.includes("title")) {

            db.prepare(`
                UPDATE opportunities
                SET role_title = title
                WHERE role_title IS NULL
            `).run();

        }

        db.prepare(`
            UPDATE opportunities
            SET role_title = 'Untitled Opportunity'
            WHERE role_title IS NULL
        `).run();

        console.log("Added role_title column.");
    }

    // Add opportunity_type if missing
    if (!columnNames.includes("opportunity_type")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN opportunity_type TEXT
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET opportunity_type = 'Internship'
            WHERE opportunity_type IS NULL
        `).run();

        console.log("Added opportunity_type column.");
    }

    // Add location if missing
    if (!columnNames.includes("location")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN location TEXT
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET location = 'Not specified'
            WHERE location IS NULL
        `).run();

        console.log("Added location column.");
    }

    // Add duration if missing
    if (!columnNames.includes("duration")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN duration TEXT
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET duration = 'Not specified'
            WHERE duration IS NULL
        `).run();

        console.log("Added duration column.");
    }

    // Add skills if missing
    if (!columnNames.includes("skills")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN skills TEXT
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET skills = '[]'
            WHERE skills IS NULL
        `).run();

        console.log("Added skills column.");
    }

    // Add status if missing
    if (!columnNames.includes("status")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN status TEXT DEFAULT 'Published'
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET status = 'Published'
            WHERE status IS NULL
        `).run();

        console.log("Added status column.");
    }

    // Add created_at if missing
    if (!columnNames.includes("created_at")) {

        db.prepare(`
            ALTER TABLE opportunities
            ADD COLUMN created_at DATETIME
        `).run();

        db.prepare(`
            UPDATE opportunities
            SET created_at = CURRENT_TIMESTAMP
            WHERE created_at IS NULL
        `).run();

        console.log("Added created_at column.");
    }

    console.log("Existing opportunities table migrated successfully.");
}

// ==========================================
// OPPORTUNITY SKILLS TABLE
// ==========================================

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

// ==========================================
// INDUSTRIES TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        job_role TEXT NOT NULL
    )
`).run();

// ==========================================
// INDUSTRY SKILLS TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS industry_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        industry_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        required_level TEXT NOT NULL,
        FOREIGN KEY (industry_id) REFERENCES industries(id),
        FOREIGN KEY (skill_id) REFERENCES skills(id),
        UNIQUE(industry_id, skill_id)
    )
`).run();

// ==========================================
// APPLICATIONS TABLE
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        opportunity_id INTEGER NOT NULL,
        opportunity_title TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        resume_name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Submitted',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
`).run();

console.log("Database tables created successfully!");

module.exports = db;