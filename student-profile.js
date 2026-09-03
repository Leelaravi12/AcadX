document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PROFILE ELEMENTS
    ========================== */

    const profileCard = document.querySelector(".profile-card");
    const editButton = document.querySelector(".edit-button");
    const editForm = document.getElementById("edit-form");
    const saveProfileButton = document.getElementById("save-profile");

    const nameInput = document.getElementById("student-name");
    const branchInput = document.getElementById("student-branch");
    const collegeInput = document.getElementById("student-college");
    const yearInput = document.getElementById("student-year");

    /* =========================
       EDIT PROFILE
    ========================== */

    if (editButton && editForm) {
        editButton.addEventListener("click", () => {
            editForm.classList.toggle("profile-form-visible");

            const savedProfile = JSON.parse(
                localStorage.getItem("acadxProfile") || "null"
            );

            if (savedProfile) {
                nameInput.value = savedProfile.name || "";
                branchInput.value = savedProfile.branch || "";
                collegeInput.value = savedProfile.college || "";
                yearInput.value = savedProfile.year || "";
            }
        });
    }

    /* =========================
       DISPLAY PROFILE
    ========================== */

    function displayProfile() {
        const savedProfile = JSON.parse(
            localStorage.getItem("acadxProfile") || "null"
        );

        if (!savedProfile) return;

        const profileName = profileCard?.querySelector(".profile-info h2");
        const profileDetails = profileCard?.querySelector(".profile-info");

        if (profileName) {
            profileName.textContent = savedProfile.name || "Student Name";
        }

        if (profileDetails) {
            const paragraphs = profileDetails.querySelectorAll("p");

            if (paragraphs[0]) {
                paragraphs[0].textContent =
                    savedProfile.branch || "Computer Science & Engineering";
            }

            if (paragraphs[1]) {
                paragraphs[1].textContent =
                    savedProfile.college || "College Name";
            }

            if (paragraphs[2]) {
                paragraphs[2].textContent =
                    savedProfile.year || "1st Year";
            }
        }
    }

    displayProfile();

    /* =========================
       SAVE PROFILE
    ========================== */

    if (saveProfileButton) {
        saveProfileButton.addEventListener("click", async (event) => {

            event.preventDefault();

            const name = nameInput.value.trim();
            const branch = branchInput.value.trim();
            const college = collegeInput.value.trim();
            const year = yearInput.value.trim();

            if (!name) {
                alert("Please enter your name.");
                return;
            }

            if (!branch) {
                alert("Please enter your branch.");
                return;
            }

            if (!college) {
                alert("Please enter your college.");
                return;
            }

            if (!year) {
                alert("Please enter your year.");
                return;
            }

            /* Save profile locally */

            const profile = {
                name: name,
                branch: branch,
                college: college,
                year: year
            };

            localStorage.setItem(
                "acadxProfile",
                JSON.stringify(profile)
            );

            localStorage.setItem(
                "acadxName",
                name
            );

            localStorage.setItem(
                "acadxBranch",
                branch
            );

            localStorage.setItem(
                "acadxCollege",
                college
            );

            localStorage.setItem(
                "acadxYear",
                year
            );

            localStorage.setItem(
                "profileCompleted",
                "true"
            );

            displayProfile();

            if (editForm) {
                editForm.classList.remove("profile-form-visible");
            }

            /* =========================
               SAVE TO DATABASE
            ========================== */

            try {

                const user = JSON.parse(
                    localStorage.getItem("acadxUser") || "null"
                );

                const email =
                    user?.email ||
                    localStorage.getItem("acadxEmail") ||
                    `${name.toLowerCase().replace(/\s+/g, ".")}@acadx.local`;

                const response = await fetch(
                    "http://localhost:5000/students",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            department: branch,
                            year: year
                        })
                    }
                );

                if (response.ok) {

                    const data = await response.json();

                    if (data.studentId) {
                        localStorage.setItem(
                            "acadxStudentId",
                            data.studentId
                        );
                    }

                    console.log("Profile saved to database.");
                } else {
                    console.log(
                        "Database save failed, but profile was saved locally."
                    );
                }

            } catch (error) {

                console.log(
                    "Backend unavailable. Profile saved locally."
                );

            }

            /* =========================
               FINAL REDIRECT
               SAVE PROFILE → DASHBOARD
            ========================== */

            alert("Profile saved successfully!");

            window.location.replace("dashboard.html");
        });
    }

    /* =========================
       SKILLS
    ========================== */

    const skillsContainer =
        document.getElementById("skills-container");

    const newSkillInput =
        document.getElementById("new-skill");

    const addSkillButton =
        document.getElementById("add-skill-button");

    let skills = JSON.parse(
        localStorage.getItem("acadxSkills") || "null"
    );

    if (!skills) {
        skills = [
            "Python",
            "Java",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "Git & GitHub"
        ];
    }

    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }

    function displaySkills() {

        if (!skillsContainer) return;

        skillsContainer.innerHTML = "";

        skills.forEach((skill) => {

            const span = document.createElement("span");

            span.className = "skill-tag";
            span.textContent = skill;

            skillsContainer.appendChild(span);
        });
    }

    displaySkills();

    if (addSkillButton && newSkillInput) {

        addSkillButton.addEventListener("click", async () => {

            const skill = newSkillInput.value.trim();

            if (!skill) {
                alert("Please enter a skill.");
                return;
            }

            const exists = skills.some(
                item => item.toLowerCase() === skill.toLowerCase()
            );

            if (exists) {
                alert("This skill is already added.");
                return;
            }

            skills.push(skill);

            localStorage.setItem(
                "acadxSkills",
                JSON.stringify(skills)
            );

            displaySkills();

            newSkillInput.value = "";

            /* Save skill to database */

            const studentId =
                localStorage.getItem("acadxStudentId");

            if (studentId) {

                try {

                    await fetch(
                        `http://localhost:5000/students/${studentId}/skills`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                skillName: skill
                            })
                        }
                    );

                } catch (error) {

                    console.log(
                        "Could not save skill to database."
                    );

                }
            }
        });
    }

    /* =========================
       PROJECTS
    ========================== */

    const projectsContainer =
        document.getElementById("projects-container");

    const addProjectButton =
        document.getElementById("add-project-button");

    const projectTitle =
        document.getElementById("project-title");

    const projectDescription =
        document.getElementById("project-description");

    const projectTechnologies =
        document.getElementById("project-technologies");

    let projects = JSON.parse(
        localStorage.getItem("acadxProjects") || "null"
    );

    if (!projects) {
        projects = [
            {
                title: "Food Waste Management System",
                description:
                    "A web platform that connects food donors with organizations to help reduce food wastage.",
                technologies:
                    "HTML, CSS, JavaScript, Firebase"
            }
        ];
    }

    function displayProjects() {

        if (!projectsContainer) return;

        projectsContainer.innerHTML = "";

        projects.forEach((project) => {

            const article = document.createElement("article");

            article.className = "project-card";

            article.innerHTML = `
                <h3>${escapeHTML(project.title)}</h3>

                <p>
                    ${escapeHTML(project.description)}
                </p>

                <div class="project-tech">
                    ${project.technologies
                        .split(",")
                        .map(
                            tech =>
                                `<span>${escapeHTML(
                                    tech.trim()
                                )}</span>`
                        )
                        .join("")}
                </div>

                <button class="project-button">
                    View Project
                </button>
            `;

            projectsContainer.appendChild(article);
        });
    }

    displayProjects();

    if (addProjectButton) {

        addProjectButton.addEventListener("click", () => {

            const title = projectTitle.value.trim();
            const description = projectDescription.value.trim();
            const technologies =
                projectTechnologies.value.trim();

            if (!title || !description) {
                alert("Please enter project title and description.");
                return;
            }

            projects.push({
                title: title,
                description: description,
                technologies:
                    technologies || "Not specified"
            });

            localStorage.setItem(
                "acadxProjects",
                JSON.stringify(projects)
            );

            displayProjects();

            projectTitle.value = "";
            projectDescription.value = "";
            projectTechnologies.value = "";
        });
    }

    /* =========================
       CERTIFICATIONS
    ========================== */

    const certificationsContainer =
        document.getElementById("certifications-container");

    const addCertificateButton =
        document.getElementById("add-certificate-button");

    const certificateName =
        document.getElementById("certificate-name");

    const certificateIssuer =
        document.getElementById("certificate-issuer");

    const certificateYear =
        document.getElementById("certificate-year");

    const certificateLink =
        document.getElementById("certificate-link");

    let certifications = JSON.parse(
        localStorage.getItem("acadxCertifications") || "null"
    );

    if (!certifications) {
        certifications = [
            {
                name: "Python Programming",
                issuer: "Organization Name",
                year: "2026",
                link: ""
            }
        ];
    }

    function displayCertifications() {

        if (!certificationsContainer) return;

        certificationsContainer.innerHTML = "";

        certifications.forEach((certificate) => {

            const div = document.createElement("div");

            div.className = "certification-card";

            div.innerHTML = `
                <h3>${escapeHTML(certificate.name)}</h3>

                <p>
                    Issued by:
                    ${escapeHTML(certificate.issuer)}
                </p>

                <p>
                    Year:
                    ${escapeHTML(certificate.year)}
                </p>

                ${
                    certificate.link
                        ? `<button
                            class="certificate-button"
                            onclick="window.open('${encodeURIComponent(
                                certificate.link
                            )}', '_blank')">
                            View Certificate
                           </button>`
                        : ""
                }
            `;

            certificationsContainer.appendChild(div);
        });
    }

    displayCertifications();

    if (addCertificateButton) {

        addCertificateButton.addEventListener("click", () => {

            const name = certificateName.value.trim();
            const issuer = certificateIssuer.value.trim();
            const year = certificateYear.value.trim();
            const link = certificateLink.value.trim();

            if (!name || !issuer || !year) {
                alert("Please fill in certificate name, issuer and year.");
                return;
            }

            certifications.push({
                name: name,
                issuer: issuer,
                year: year,
                link: link
            });

            localStorage.setItem(
                "acadxCertifications",
                JSON.stringify(certifications)
            );

            displayCertifications();

            certificateName.value = "";
            certificateIssuer.value = "";
            certificateYear.value = "";
            certificateLink.value = "";
        });
    }

    /* =========================
       ACHIEVEMENTS
    ========================== */

    const achievementsContainer =
        document.getElementById("achievements-container");

    const addAchievementButton =
        document.getElementById("add-achievement-button");

    const achievementTitle =
        document.getElementById("achievement-title");

    const achievementDescription =
        document.getElementById("achievement-description");

    let achievements = JSON.parse(
        localStorage.getItem("acadxAchievements") || "null"
    );

    if (!achievements) {
        achievements = [
            {
                title: "Hackathon Participation",
                description:
                    "Participated in a technology hackathon and developed a solution for a real-world problem."
            }
        ];
    }

    function displayAchievements() {

        if (!achievementsContainer) return;

        achievementsContainer.innerHTML = "";

        achievements.forEach((achievement) => {

            const div = document.createElement("div");

            div.className = "achievement-card";

            div.innerHTML = `
                <h3>${escapeHTML(achievement.title)}</h3>

                <p>
                    ${escapeHTML(achievement.description)}
                </p>
            `;

            achievementsContainer.appendChild(div);
        });
    }

    displayAchievements();

    if (addAchievementButton) {

        addAchievementButton.addEventListener("click", () => {

            const title =
                achievementTitle.value.trim();

            const description =
                achievementDescription.value.trim();

            if (!title || !description) {
                alert(
                    "Please enter achievement title and description."
                );
                return;
            }

            achievements.push({
                title: title,
                description: description
            });

            localStorage.setItem(
                "acadxAchievements",
                JSON.stringify(achievements)
            );

            displayAchievements();

            achievementTitle.value = "";
            achievementDescription.value = "";
        });
    }

});