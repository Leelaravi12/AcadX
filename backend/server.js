
const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());
// Add a new student
app.post("/students", (req, res) => {
    const { name, email, department, year } = req.body;

    try {
        const result = db.prepare(`
            INSERT INTO students (name, email, department, year)
            VALUES (?, ?, ?, ?)
        `).run(name, email, department, year);

        res.json({
            message: "Student added successfully!",
            studentId: result.lastInsertRowid
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
//Get all students
app.get("/students", (req, res) => {
    try {
        const students = db.prepare("SELECT * FROM students").all();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Get skills of a student
app.get("/students/:studentId/skills", (req, res) => {
    try {
        const skills = db.prepare(`
            SELECT skills.id, skills.name, student_skills.level
            FROM student_skills
            JOIN skills ON student_skills.skill_id = skills.id
            WHERE student_skills.student_id = ?
        `).all(req.params.studentId);

        res.json(skills);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// Add a skill
app.post("/skills", (req, res) => {
    const { name } = req.body;

    try {
        const result = db.prepare(
            "INSERT INTO skills (name) VALUES (?)"
        ).run(name);

        res.json({
            message: "Skill added successfully!",
            skillId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
// Add a skill to a student
app.post("/students/:studentId/skills", (req, res) => {
    const { skillId, level } = req.body;
    const studentId = req.params.studentId;

    try {
        const result = db.prepare(`
            INSERT INTO student_skills (student_id, skill_id, level)
            VALUES (?, ?, ?)
        `).run(studentId, skillId, level);

        res.json({
            message: "Skill added to student successfully!",
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
// Get all skills
app.get("/skills", (req, res) => {
    try {
        const skills = db.prepare(
            "SELECT * FROM skills"
        ).all();

        res.json(skills);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
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
// Add industry
app.post("/industries", (req, res) => {
    const { company_name, job_role } = req.body;

    try {
        const result = db.prepare(`
            INSERT INTO industries (company_name, job_role)
            VALUES (?, ?)
        `).run(company_name, job_role);

        res.json({
            message: "Industry added successfully!",
            industryId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
// Add a required skill to an industry
app.post("/industries/:industryId/skills", (req, res) => {
    const { skillId, required_level } = req.body;
    const industryId = req.params.industryId;

    try {
        const result = db.prepare(`
            INSERT INTO industry_skills
            (industry_id, skill_id, required_level)
            VALUES (?, ?, ?)
        `).run(industryId, skillId, required_level);

        res.json({
            message: "Industry skill added successfully!",
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
// Get required skills for an industry
app.get("/industries/:industryId/skills", (req, res) => {
    const industryId = req.params.industryId;

    try {
        const skills = db.prepare(`
            SELECT
                industry_skills.id,
                skills.name AS skill,
                industry_skills.required_level
            FROM industry_skills
            JOIN skills ON industry_skills.skill_id = skills.id
            WHERE industry_skills.industry_id = ?
        `).all(industryId);

        res.json(skills);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
// Match a student with an industry/job
app.get("/match/:studentId/:industryId", (req, res) => {
    const studentId = req.params.studentId;
    const industryId = req.params.industryId;

    try {
        const studentSkills = db.prepare(`
            SELECT skills.name AS skill
            FROM student_skills
            JOIN skills ON student_skills.skill_id = skills.id
            WHERE student_skills.student_id = ?
        `).all(studentId);

        const requiredSkills = db.prepare(`
            SELECT skills.name AS skill, industry_skills.required_level
            FROM industry_skills
            JOIN skills ON industry_skills.skill_id = skills.id
            WHERE industry_skills.industry_id = ?
        `).all(industryId);

        const studentSkillNames = studentSkills.map(s => s.skill.toLowerCase());

        const matchedSkills = [];
        const skillGap = [];

        requiredSkills.forEach(required => {
            if (studentSkillNames.includes(required.skill.toLowerCase())) {
                matchedSkills.push(required.skill);
            } else {
                skillGap.push(required.skill);
            }
        });

        const matchScore = requiredSkills.length === 0
            ? 0
            : Math.round((matchedSkills.length / requiredSkills.length) * 100);

        res.json({
            studentId: Number(studentId),
            industryId: Number(industryId),
            matchScore: matchScore + "%",
            matchedSkills: matchedSkills,
            skillGap: skillGap,
            recommendation: skillGap.length === 0
                ? "Student is a good match for this job!"
                : "Student should improve: " + skillGap.join(", ")
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
const PORT = 5000;

app.listen(PORT, () => {
console.log("Server running on http://localhost:5000");
});