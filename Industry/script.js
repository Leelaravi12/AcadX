
// ==========================================
// INDUSTRY PORTAL MVP
// ==========================================


// Store skills for the role currently being created
let currentSkills = [];


// Store published roles
let roles = JSON.parse(localStorage.getItem("industryRoles")) || [];


// ==========================================
// OPEN ROLE FORM
// ==========================================

function openRoleForm() {

    const section = document.getElementById("roleFormSection");

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// ADD SKILL
// ==========================================

function addSkill() {

    const skillInput = document.getElementById("skillInput");

    const skillLevel = document.getElementById("skillLevel");

    const skillName = skillInput.value.trim();


    // Don't allow empty skills

    if (skillName === "") {

        alert("Please enter a skill.");

        return;

    }


    // Add skill to array

    currentSkills.push({

        name: skillName,

        level: skillLevel.value

    });


    // Clear input

    skillInput.value = "";


    // Update screen

    displaySkills();

}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills() {

    const skillList = document.getElementById("skillList");


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

document
    .getElementById("roleForm")
    .addEventListener("submit", function(event) {


        // Prevent page refresh

        event.preventDefault();


        // Check skills

        if (currentSkills.length === 0) {

            alert("Please add at least one required skill.");

            return;

        }


        // Get role information

        const role = {

            id: Date.now(),

            title:
                document.getElementById("roleTitle").value,

            type:
                document.getElementById("roleType").value,

            location:
                document.getElementById("roleLocation").value,

            duration:
                document.getElementById("roleDuration").value,

            description:
                document.getElementById("roleDescription").value,

            skills:
                [...currentSkills],

            status:
                "Published"

        };


        // Add role

        roles.push(role);


        // Save to browser

        localStorage.setItem(
            "industryRoles",
            JSON.stringify(roles)
        );


        // Show roles

        displayRoles();


        // Clear form

        clearForm();


        // Show success message

        alert("Opportunity published successfully!");


        // Scroll to roles

        document
            .getElementById("roles")
            .scrollIntoView({
                behavior: "smooth"
            });

});


// ==========================================
// DISPLAY PUBLISHED ROLES
// ==========================================

function displayRoles() {

    const roleList =
        document.getElementById("roleList");


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

        return;

    }


    roleList.innerHTML = "";


    roles.forEach(role => {


        const roleCard =
            document.createElement("div");


        roleCard.className = "role-card";


        // Create skill tags

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

}


// ==========================================
// GET ROLE INITIALS
// ==========================================

function getInitials(title) {

    const words = title.split(" ");

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

    document.getElementById("roleForm").reset();

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


    // Main dashboard

    document.getElementById("activeRoles")
        .textContent = publishedRoles;


    document.getElementById("totalSkills")
        .textContent = totalSkills;


    document.getElementById("opportunityCount")
        .textContent = publishedRoles;


    // Right summary card

    document.getElementById("skillCount")
        .textContent = totalSkills;


    document.getElementById("roleCount")
        .textContent = publishedRoles;


    document.getElementById("draftCount")
        .textContent = 0;

}


// ==========================================
// LOAD SAVED DATA WHEN PAGE OPENS
// ==========================================

displaySkills();

displayRoles();

updateCounts();





// ==========================================
// DEMO STUDENT SKILLS
// ==========================================

const demoStudentSkills = {
    "Python": "Advanced",
    "Data Structures": "Beginner",
    "SQL": "Intermediate"
};


// ==========================================
// DISPLAY SKILL MATCH
// ==========================================

function displaySkillMatch() {

    const industryBox =
        document.getElementById("industryRequirements");

    const studentBox =
        document.getElementById("studentSkills");

    const scoreBox =
        document.getElementById("matchScore");

    const gapBox =
        document.getElementById("gapMessage");


    // Get the latest published role

    if (roles.length === 0) {

        industryBox.innerHTML =
            "<p class='empty-message'>No published role available.</p>";

        studentBox.innerHTML =
            "<p class='empty-message'>No student profile available.</p>";

        return;
    }


    const role = roles[roles.length - 1];


    // Clear old content

    industryBox.innerHTML = "";
    studentBox.innerHTML = "";


    let matchedSkills = 0;
    let skillGaps = [];


    // Compare every required skill

    role.skills.forEach(skill => {

        const studentLevel =
            demoStudentSkills[skill.name];


        // Industry requirement

        const industryItem =
            document.createElement("div");

        industryItem.className = "match-item";

        industryItem.innerHTML = `
            <span class="match-item-name">
                ${skill.name}
            </span>

            <span class="match-item-level">
                Required: ${skill.level}
            </span>
        `;

        industryBox.appendChild(industryItem);


        // Student skill result

        const studentItem =
            document.createElement("div");

        studentItem.className = "match-item";


        if (studentLevel) {

            const meetsRequirement =
                getLevelValue(studentLevel)
                >=
                getLevelValue(skill.level);


            if (meetsRequirement) {

                matchedSkills++;

                studentItem.innerHTML = `
                    <span class="match-item-name">
                        ${skill.name}
                    </span>

                    <span class="match-status good">
                        ✓ ${studentLevel}
                    </span>
                `;

            } else {

                skillGaps.push(skill.name);

                studentItem.innerHTML = `
                    <span class="match-item-name">
                        ${skill.name}
                    </span>

                    <span class="match-status gap">
                        ⚠ ${studentLevel}
                    </span>
                `;

            }

        } else {

            skillGaps.push(skill.name);

            studentItem.innerHTML = `
                <span class="match-item-name">
                    ${skill.name}
                </span>

                <span class="match-status gap">
                    ⚠ Not available
                </span>
            `;

        }


        studentBox.appendChild(studentItem);

    });


    // Calculate percentage

    const totalSkills = role.skills.length;

    const percentage =
        Math.round(
            (matchedSkills / totalSkills) * 100
        );


    scoreBox.textContent =
        percentage + "%";
        const progressBar =
    document.getElementById("matchProgressBar");

progressBar.style.width =
    percentage + "%";


    // Display skill-gap message

    if (skillGaps.length === 0) {

        gapBox.textContent =
            "Student meets all industry requirements.";

    } else {

        gapBox.textContent =
            "Skill gap: " + skillGaps.join(", ");

    }

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


// Display match after page loads

displaySkillMatch();
