// ==========================================
// INDUSTRY PORTAL MVP
// ==========================================

let currentSkills = [];

// Published roles for this browser session.
// Refreshing keeps them; closing the browser/tab clears them.
let roles = JSON.parse(sessionStorage.getItem("industryRoles") || "[]");


// ==========================================
// OPEN ROLE FORM
// ==========================================

function openRoleForm() {
    const section = document.getElementById("roleFormSection");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==========================================
// ADD SKILL
// ==========================================

function addSkill() {
    const skillInput = document.getElementById("skillInput");
    const skillLevel = document.getElementById("skillLevel");

    if (!skillInput || !skillLevel) {
        alert("Skill input or skill level field was not found.");
        return;
    }

    const skillName = skillInput.value.trim();

    if (skillName === "") {
        alert("Please enter a skill.");
        return;
    }

    currentSkills.push({
        name: skillName,
        level: skillLevel.value
    });

    skillInput.value = "";

    displaySkills();
}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills() {
    const skillList = document.getElementById("skillList");

    if (!skillList) return;

    if (currentSkills.length === 0) {
        skillList.innerHTML = `
            <p class="empty-message">
                No skills added yet.
            </p>
        `;

        updateCounts();
        return;
    }

    skillList.innerHTML = "";

    currentSkills.forEach((skill, index) => {
        const skillItem = document.createElement("div");

        skillItem.className = "skill-item";

        skillItem.innerHTML = `
            <div>
                <span class="skill-name">
                    ${skill.name}
                </span>
            </div>

            <div>
                <span class="skill-level">
                    ${skill.level}
                </span>

                <button
                    type="button"
                    onclick="removeSkill(${index})"
                    style="
                        margin-left:15px;
                        border:none;
                        background:none;
                        color:#9a6b6b;
                        cursor:pointer;
                    "
                >
                    Remove
                </button>
            </div>
        `;

        skillList.appendChild(skillItem);
    });

    updateCounts();
}


// ==========================================
// REMOVE SKILL
// ==========================================

function removeSkill(index) {
    currentSkills.splice(index, 1);

    displaySkills();
}


// ==========================================
// PUBLISH OPPORTUNITY
// ==========================================

function publishOpportunity(event) {
    if (event) {
        event.preventDefault();
    }

    if (currentSkills.length === 0) {
        alert("Please add at least one required skill.");
        return;
    }

    const role = {
        id: Date.now(),

        title:
            document.getElementById("roleTitle").value.trim(),

        type:
            document.getElementById("roleType").value,

        location:
            document.getElementById("roleLocation").value.trim(),

        duration:
            document.getElementById("roleDuration").value.trim(),

        description:
            document.getElementById("roleDescription").value.trim(),

        skills:
            [...currentSkills],

        status:
            "Published"
    };

    roles.push(role);

    sessionStorage.setItem(
        "industryRoles",
        JSON.stringify(roles)
    );

    displayRoles();

    clearForm();

    alert("Opportunity published successfully!");

    const rolesSection =
        document.getElementById("roles");

    if (rolesSection) {
        rolesSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==========================================
// DISPLAY PUBLISHED ROLES
// ==========================================

function displayRoles() {
    const roleList =
        document.getElementById("roleList");

    if (!roleList) return;

    if (roles.length === 0) {
        roleList.innerHTML = `
            <div class="empty-role">

                <h3>
                    No opportunities yet
                </h3>

                <p>
                    Create your first industry opportunity
                    using the form above.
                </p>

            </div>
        `;

        updateCounts();
        displaySkillMatch();

        return;
    }

    roleList.innerHTML = "";

    roles.forEach(role => {

        const roleCard =
            document.createElement("div");

        roleCard.className = "role-card";

        const skillTags =
            role.skills
                .map(skill => `
                    <span>
                        ${skill.name}
                        · ${skill.level}
                    </span>
                `)
                .join("");

        roleCard.innerHTML = `

            <div class="role-icon">
                ${getInitials(role.title)}
            </div>

            <div class="role-info">

                <h3>
                    ${role.title}
                </h3>

                <p>
                    ${role.type}
                    ·
                    ${role.location}
                    ·
                    ${role.duration}
                </p>

                <div class="role-skills">
                    ${skillTags}
                </div>

            </div>

            <div class="published">
                ✓ Published
            </div>

        `;

        roleList.appendChild(roleCard);
    });

    updateCounts();

    displaySkillMatch();
}


// ==========================================
// GET ROLE INITIALS
// ==========================================

function getInitials(title) {

    const words =
        title
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (words.length === 0) {
        return "OP";
    }

    if (words.length === 1) {
        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();
}


// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {

    const form =
        document.getElementById("roleForm");

    if (form) {
        form.reset();
    }

    currentSkills = [];

    displaySkills();
}


// ==========================================
// UPDATE DASHBOARD COUNTS
// ==========================================

function updateCounts() {

    const totalSkills =
        roles.reduce(
            (total, role) =>
                total + role.skills.length,
            0
        );

    const publishedRoles =
        roles.length;

    const activeRoles =
        document.getElementById("activeRoles");

    const totalSkillsBox =
        document.getElementById("totalSkills");

    const opportunityCount =
        document.getElementById("opportunityCount");

    const skillCount =
        document.getElementById("skillCount");

    const roleCount =
        document.getElementById("roleCount");

    const draftCount =
        document.getElementById("draftCount");

    if (activeRoles) {
        activeRoles.textContent =
            publishedRoles;
    }

    if (totalSkillsBox) {
        totalSkillsBox.textContent =
            totalSkills;
    }

    if (opportunityCount) {
        opportunityCount.textContent =
            publishedRoles;
    }

    if (skillCount) {
        skillCount.textContent =
            totalSkills;
    }

    if (roleCount) {
        roleCount.textContent =
            publishedRoles;
    }

    if (draftCount) {
        draftCount.textContent = 0;
    }
}


// ==========================================
// DEMO STUDENT SKILLS
// ==========================================

const demoStudentSkills = {

    "Python": "Advanced",

    "Data Structures": "Beginner",

    "DSA": "Beginner",

    "SQL": "Intermediate",

    "Java": "Intermediate"

};


// ==========================================
// NORMALIZE SKILL NAMES
// ==========================================

function normalizeSkillName(name) {

    const value =
        name.trim().toLowerCase();

    if (
        value === "dsa" ||
        value === "data structures" ||
        value === "data structure"
    ) {
        return "dsa";
    }

    return value;
}


// ==========================================
// DISPLAY SKILL MATCH FOR ALL ROLES
// ==========================================

function displaySkillMatch() {

    const matchRoleList =
        document.getElementById("matchRoleList");

    if (!matchRoleList) return;

    matchRoleList.innerHTML = "";

    if (roles.length === 0) {

        matchRoleList.innerHTML = `
            <div class="match-card">
                <p class="empty-message">
                    No published role available.
                </p>
            </div>
        `;

        return;
    }

    roles.forEach(role => {

        let totalRequired = 0;
        let totalMatched = 0;
        let skillGaps = [];

        let industryHTML = "";
        let studentHTML = "";

        role.skills.forEach(skill => {

            totalRequired++;

            const studentLevel =
                findStudentSkillLevel(skill.name);

            industryHTML += `
                <div class="match-item">
                    <span class="match-item-name">
                        ${skill.name}
                    </span>

                    <span class="match-item-level">
                        Required: ${skill.level}
                    </span>
                </div>
            `;

            if (studentLevel) {

                const meetsRequirement =
                    getLevelValue(studentLevel) >=
                    getLevelValue(skill.level);

                if (meetsRequirement) {

                    totalMatched++;

                    studentHTML += `
                        <div class="match-item">
                            <span class="match-item-name">
                                ${skill.name}
                            </span>

                            <span class="match-status good">
                                ✓ ${studentLevel}
                            </span>
                        </div>
                    `;

                } else {

                    skillGaps.push(skill.name);

                    studentHTML += `
                        <div class="match-item">
                            <span class="match-item-name">
                                ${skill.name}
                            </span>

                            <span class="match-status gap">
                                ⚠ ${studentLevel}
                            </span>
                        </div>
                    `;
                }

            } else {

                skillGaps.push(skill.name);

                studentHTML += `
                    <div class="match-item">
                        <span class="match-item-name">
                            ${skill.name}
                        </span>

                        <span class="match-status gap">
                            ⚠ Not available
                        </span>
                    </div>
                `;
            }

        });

        const percentage =
            totalRequired === 0
                ? 0
                : Math.round(
                    (totalMatched / totalRequired) * 100
                );

        const gapText =
            skillGaps.length === 0
                ? "Student meets all industry requirements."
                : "Skill gap: " + skillGaps.join(", ");

        const matchCard =
            document.createElement("div");

        matchCard.className = "match-card";

        matchCard.innerHTML = `

            <div class="match-header">

                <div>

                    <p class="card-label">
                        DEMO MATCH
                    </p>

                    <h3>
                        ${role.title}
                    </h3>

                </div>

                <div class="match-score">

                    <strong>
                        ${percentage}%
                    </strong>

                    <span>
                        Match
                    </span>

                    <div class="match-progress">
                        <div
                            class="match-progress-bar"
                            style="width:${percentage}%">
                        </div>
                    </div>

                </div>

            </div>

            <div class="match-content">

                <div class="match-column">

                    <h4>
                        Industry Requirements
                    </h4>

                    ${industryHTML}

                </div>

                <div class="match-column">

                    <h4>
                        Student Skills
                    </h4>

                    ${studentHTML}

                </div>

            </div>

            <div class="gap-summary">

                <strong>
                    Skill Gap
                </strong>

                <span>
                    ${gapText}
                </span>

            </div>

        `;

        matchRoleList.appendChild(matchCard);

    });

}

// ==========================================
// FIND STUDENT SKILL LEVEL
// ==========================================

function findStudentSkillLevel(skillName) {

    const wanted =
        normalizeSkillName(skillName);

    for (
        const key in demoStudentSkills
    ) {

        if (
            normalizeSkillName(key) ===
            wanted
        ) {

            return demoStudentSkills[key];

        }

    }

    return null;
}


// ==========================================
// CONVERT SKILL LEVEL TO NUMBER
// ==========================================

function getLevelValue(level) {

    const levels = {

        "Beginner": 1,

        "Intermediate": 2,

        "Advanced": 3

    };

    return levels[level] || 0;
}


// ==========================================
// START THE APP
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const roleForm =
            document.getElementById(
                "roleForm"
            );

        if (roleForm) {

            roleForm.addEventListener(
                "submit",
                publishOpportunity
            );

        }

        displaySkills();

        displayRoles();

        updateCounts();

        displaySkillMatch();

    }
);


// Make buttons in the HTML work

window.openRoleForm =
    openRoleForm;

window.addSkill =
    addSkill;

window.removeSkill =
    removeSkill;