// backend/server.js

const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

// ==========================================
// CORS
// ==========================================

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// ==========================================
// DATABASE TABLES
// ==========================================

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
        FOREIGN KEY (industry_id)
            REFERENCES industries(id),
        FOREIGN KEY (skill_id)
            REFERENCES skills(id),
        UNIQUE(industry_id, skill_id)
    );

    CREATE TABLE IF NOT EXISTS opportunities (
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
    );

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
        FOREIGN KEY (student_id)
            REFERENCES students(id)
    );
`);

// ==========================================
// STUDENTS
// ==========================================

app.post("/students", (req, res) => {
    const {
        name,
        email,
        department,
        year
    } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    try {
        const existingStudent = db.prepare(`
            SELECT id
            FROM students
            WHERE email = ?
        `).get(email);

        if (existingStudent) {
            db.prepare(`
                UPDATE students
                SET name = ?,
                    department = ?,
                    year = ?
                WHERE id = ?
            `).run(
                name,
                department,
                year,
                existingStudent.id
            );

            return res.json({
                message: "Student updated successfully!",
                studentId: existingStudent.id
            });
        }

        const result = db.prepare(`
            INSERT INTO students
            (name, email, department, year)
            VALUES (?, ?, ?, ?)
        `).run(
            name,
            email,
            department,
            year
        );

        res.json({
            message: "Student added successfully!",
            studentId: result.lastInsertRowid
        });

    } catch (error) {
        console.error("STUDENT DATABASE ERROR:", error);

        res.status(400).json({
            error: error.message
        });
    }
});

app.get("/students", (req, res) => {
    try {
        const students = db.prepare(`
            SELECT *
            FROM students
        `).all();

        res.json(students);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// ==========================================
// STUDENT SKILLS
// ==========================================

app.get("/students/:studentId/skills", (req, res) => {
    try {
        const skills = db.prepare(`
            SELECT
                skills.id,
                skills.name,
                student_skills.level
            FROM student_skills
            JOIN skills
                ON student_skills.skill_id = skills.id
            WHERE student_skills.student_id = ?
        `).all(req.params.studentId);

        res.json(skills);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/students/:studentId/skills", (req, res) => {

    const studentId = req.params.studentId;

    const {
        skillId,
        skillName,
        level
    } = req.body;

    try {

        let finalSkillId = skillId;

        if (!finalSkillId && skillName) {

            db.prepare(`
                INSERT OR IGNORE INTO skills (name)
                VALUES (?)
            `).run(skillName);

            const skill = db.prepare(`
                SELECT id
                FROM skills
                WHERE name = ?
            `).get(skillName);

            finalSkillId = skill.id;
        }

        if (!finalSkillId) {
            return res.status(400).json({
                error: "Skill ID or skill name is required"
            });
        }

        db.prepare(`
            INSERT INTO student_skills
            (student_id, skill_id, level)
            VALUES (?, ?, ?)
            ON CONFLICT(student_id, skill_id)
            DO UPDATE SET level = excluded.level
        `).run(
            studentId,
            finalSkillId,
            level || "Not Assessed"
        );

        res.json({
            message: "Skill saved successfully!",
            studentId: Number(studentId),
            skillId: finalSkillId
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// ==========================================
// SKILLS
// ==========================================

app.post("/skills", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Skill name is required"
        });
    }

    try {

        db.prepare(`
            INSERT OR IGNORE INTO skills (name)
            VALUES (?)
        `).run(name);

        const skill = db.prepare(`
            SELECT *
            FROM skills
            WHERE name = ?
        `).get(name);

        res.json({
            message: "Skill saved successfully!",
            skillId: skill.id
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});

app.get("/skills", (req, res) => {

    try {

        const skills = db.prepare(`
            SELECT *
            FROM skills
        `).all();

        res.json(skills);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

// ==========================================
// INDUSTRY ROUTES
// ==========================================

app.post("/industries", (req, res) => {

    const {
        company_name,
        job_role
    } = req.body;

    try {

        const result = db.prepare(`
            INSERT INTO industries
            (company_name, job_role)
            VALUES (?, ?)
        `).run(
            company_name,
            job_role
        );

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

app.post(
    "/industries/:industryId/skills",
    (req, res) => {

        const {
            skillId,
            required_level
        } = req.body;

        const industryId =
            req.params.industryId;

        try {

            const result = db.prepare(`
                INSERT INTO industry_skills
                (
                    industry_id,
                    skill_id,
                    required_level
                )
                VALUES (?, ?, ?)
                ON CONFLICT(industry_id, skill_id)
                DO UPDATE SET
                    required_level = excluded.required_level
            `).run(
                industryId,
                skillId,
                required_level
            );

            res.json({
                message:
                    "Industry skill saved successfully!",
                id: result.lastInsertRowid
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    }
);

app.get(
    "/industries/:industryId/skills",
    (req, res) => {

        const industryId =
            req.params.industryId;

        try {

            const skills = db.prepare(`
                SELECT
                    industry_skills.id,
                    skills.name AS skill,
                    industry_skills.required_level
                FROM industry_skills
                JOIN skills
                    ON industry_skills.skill_id = skills.id
                WHERE industry_skills.industry_id = ?
            `).all(industryId);

            res.json(skills);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    }
);

// ==========================================
// STUDENT - INDUSTRY MATCHING
// ==========================================

app.get(
    "/match/:studentId/:industryId",
    (req, res) => {

        const studentId =
            req.params.studentId;

        const industryId =
            req.params.industryId;

        try {

            const studentSkills = db.prepare(`
                SELECT
                    skills.name AS skill,
                    student_skills.level
                FROM student_skills
                JOIN skills
                    ON student_skills.skill_id = skills.id
                WHERE student_skills.student_id = ?
            `).all(studentId);

            const requiredSkills = db.prepare(`
                SELECT
                    skills.name AS skill,
                    industry_skills.required_level
                FROM industry_skills
                JOIN skills
                    ON industry_skills.skill_id = skills.id
                WHERE industry_skills.industry_id = ?
            `).all(industryId);

            const studentSkillNames =
                studentSkills.map(
                    skill =>
                        skill.skill.toLowerCase()
                );

            const matchedSkills = [];
            const skillGap = [];

            requiredSkills.forEach(
                required => {

                    if (
                        studentSkillNames.includes(
                            required.skill.toLowerCase()
                        )
                    ) {

                        matchedSkills.push(
                            required.skill
                        );

                    } else {

                        skillGap.push(
                            required.skill
                        );

                    }

                }
            );

            const matchScore =
                requiredSkills.length === 0
                    ? 0
                    : Math.round(
                        (
                            matchedSkills.length /
                            requiredSkills.length
                        ) * 100
                    );

            res.json({

                studentId:
                    Number(studentId),

                industryId:
                    Number(industryId),

                matchScore:
                    matchScore + "%",

                matchedSkills:
                    matchedSkills,

                skillGap:
                    skillGap,

                recommendation:
                    skillGap.length === 0
                        ? "Student is a good match for this job!"
                        : "Student should improve: " +
                          skillGap.join(", ")

            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    }
);

// ==========================================
// OPPORTUNITIES
// ==========================================

// Publish opportunity
app.post("/opportunities", (req, res) => {

    const {
        company,
        title,
        type,
        location,
        duration,
        description,
        skills
    } = req.body;

    if (
        !company ||
        !title ||
        !type ||
        !location ||
        !duration ||
        !Array.isArray(skills) ||
        skills.length === 0
    ) {
        return res.status(400).json({
            error: "All opportunity fields and at least one skill are required"
        });
    }

    try {

        const result = db.prepare(`
            INSERT INTO opportunities
            (
                company_name,
                role_title,
                opportunity_type,
                location,
                duration,
                description,
                skills,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            company,
            title,
            type,
            location,
            duration,
            description || "",
            JSON.stringify(skills),
            "Published"
        );

        console.log(
            "OPPORTUNITY SAVED. ID:",
            result.lastInsertRowid
        );

        res.status(201).json({
            message: "Opportunity published successfully!",
            opportunityId:
                Number(result.lastInsertRowid),
            status: "Published"
        });

    } catch (error) {

        console.error(
            "OPPORTUNITY DATABASE ERROR:",
            error
        );

        res.status(500).json({
            error:
                "Could not save opportunity: " +
                error.message
        });

    }
});

// Get all opportunities
app.get("/opportunities", (req, res) => {

    try {

        const opportunities = db.prepare(`
            SELECT *
            FROM opportunities
            ORDER BY created_at DESC
        `).all();

        const formattedOpportunities =
            opportunities.map(opportunity => {

                let parsedSkills = [];

                try {
                    parsedSkills =
                        JSON.parse(opportunity.skills || "[]");
                } catch (error) {
                    parsedSkills = [];
                }

                return {
                    id: opportunity.id,

                    company:
                        opportunity.company_name,

                    title:
                        opportunity.role_title,

                    type:
                        opportunity.opportunity_type,

                    location:
                        opportunity.location,

                    duration:
                        opportunity.duration,

                    description:
                        opportunity.description,

                    skills:
                        parsedSkills,

                    status:
                        opportunity.status,

                    created_at:
                        opportunity.created_at
                };

            });

        res.json(formattedOpportunities);

    } catch (error) {

        console.error(
            "GET OPPORTUNITIES ERROR:",
            error
        );

        res.status(500).json({
            error: error.message
        });

    }
});

// ==========================================
// APPLICATIONS
// ==========================================

app.post("/applications", (req, res) => {

    console.log(
        "APPLICATION REQUEST:",
        req.body
    );

    const {
        studentId,
        opportunityId,
        opportunityTitle,
        name,
        email,
        phone,
        resumeName
    } = req.body;

    if (
        opportunityId === undefined ||
        !opportunityTitle ||
        !name ||
        !email ||
        !phone ||
        !resumeName
    ) {
        return res.status(400).json({
            error: "All application fields are required"
        });
    }

    try {

        const existingApplication = db.prepare(`
            SELECT id
            FROM applications
            WHERE opportunity_id = ?
            AND email = ?
        `).get(
            Number(opportunityId),
            email
        );

        if (existingApplication) {

            return res.status(409).json({
                error:
                    "You have already applied for this opportunity."
            });
        }

        const result = db.prepare(`
            INSERT INTO applications
            (
                student_id,
                opportunity_id,
                opportunity_title,
                name,
                email,
                phone,
                resume_name,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            studentId ? Number(studentId) : null,
            Number(opportunityId),
            opportunityTitle,
            name,
            email,
            phone,
            resumeName,
            "Submitted"
        );

        console.log(
            "APPLICATION SAVED. ID:",
            result.lastInsertRowid
        );

        return res.status(201).json({
            message:
                "Application submitted successfully!",
            applicationId:
                Number(result.lastInsertRowid),
            status: "Submitted"
        });

    } catch (error) {

        console.error(
            "APPLICATION DATABASE ERROR:",
            error
        );

        return res.status(500).json({
            error:
                "Could not save application: " +
                error.message
        });

    }
});

// ==========================================
// GET ALL APPLICATIONS
// ==========================================

app.get("/applications", (req, res) => {

    try {

        const applications = db.prepare(`
            SELECT
                applications.*,
                students.department,
                students.year
            FROM applications
            LEFT JOIN students
                ON applications.student_id = students.id
            ORDER BY applications.created_at DESC
        `).all();

        res.json(applications);

    } catch (error) {

        console.error(
            "GET APPLICATIONS ERROR:",
            error
        );

        res.status(500).json({
            error: error.message
        });

    }
});

// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

app.put(
    "/applications/:applicationId/status",
    (req, res) => {

        const applicationId =
            Number(req.params.applicationId);

        const { status } = req.body;

        const allowedStatuses = [
            "Submitted",
            "Under Review",
            "Accepted",
            "Rejected"
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                error:
                    "Invalid application status"
            });
        }

        try {

            const application = db.prepare(`
                SELECT id
                FROM applications
                WHERE id = ?
            `).get(applicationId);

            if (!application) {
                return res.status(404).json({
                    error:
                        "Application not found"
                });
            }

            db.prepare(`
                UPDATE applications
                SET status = ?
                WHERE id = ?
            `).run(
                status,
                applicationId
            );

            console.log(
                `APPLICATION ${applicationId} STATUS UPDATED: ${status}`
            );

            res.json({
                message:
                    "Application status updated successfully!",
                applicationId:
                    applicationId,
                status:
                    status
            });

        } catch (error) {

            console.error(
                "UPDATE APPLICATION STATUS ERROR:",
                error
            );

            res.status(500).json({
                error: error.message
            });

        }
    }
);

// ==========================================
// GET APPLICATIONS FOR ONE STUDENT
// ==========================================

app.get(
    "/students/:studentId/applications",
    (req, res) => {

        try {

            const applications = db.prepare(`
                SELECT *
                FROM applications
                WHERE student_id = ?
                ORDER BY created_at DESC
            `).all(
                Number(req.params.studentId)
            );

            res.json(applications);

        } catch (error) {

            console.error(
                "GET STUDENT APPLICATIONS ERROR:",
                error
            );

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});