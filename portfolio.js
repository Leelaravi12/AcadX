const profile =
    JSON.parse(localStorage.getItem("acadxProfile")) || {};

const skills =
    JSON.parse(localStorage.getItem("acadxSkills")) || [];

const projects =
    JSON.parse(localStorage.getItem("acadxProjects")) || [];

const certifications =
    JSON.parse(
        localStorage.getItem("acadxCertifications")
    ) || [];

const achievements =
    JSON.parse(
        localStorage.getItem("acadxAchievements")
    ) || [];


// Profile

document.querySelector("#portfolio-name").textContent =
    profile.name || "Student Name";

document.querySelector("#portfolio-branch").textContent =
    profile.branch || "Computer Science & Engineering";

document.querySelector("#portfolio-college").textContent =
    profile.college || "College Name";

document.querySelector("#portfolio-year").textContent =
    profile.year || "2nd Year";


// Skills

const skillsContainer =
    document.querySelector("#portfolio-skills");

skills.forEach(function (skill) {

    const skillTag =
        document.createElement("span");

    skillTag.classList.add("portfolio-skill");

    skillTag.textContent = skill;

    skillsContainer.appendChild(skillTag);

});


// Projects

const projectsContainer =
    document.querySelector("#portfolio-projects");

projects.forEach(function (project) {

    const projectCard =
        document.createElement("div");

    projectCard.classList.add(
        "portfolio-project"
    );

    projectCard.innerHTML = `
        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <div class="portfolio-project-tech">

            ${project.technologies
                .map(function (tech) {

                    return `<span>${tech}</span>`;

                })
                .join("")}

        </div>
    `;

    projectsContainer.appendChild(
        projectCard
    );

});


// Certifications

const certificationsContainer =
    document.querySelector(
        "#portfolio-certifications"
    );

certifications.forEach(function (certificate) {

    const certificateCard =
        document.createElement("div");

    certificateCard.classList.add(
        "portfolio-certificate"
    );

    certificateCard.innerHTML = `
        <h3>${certificate.name}</h3>

        <p>
            Issued by: ${certificate.issuer}
        </p>

        <p>
            Year: ${certificate.year}
        </p>
    `;

    certificationsContainer.appendChild(
        certificateCard
    );

});


// Achievements

const achievementsContainer =
    document.querySelector(
        "#portfolio-achievements"
    );

achievements.forEach(function (achievement) {

    const achievementCard =
        document.createElement("div");

    achievementCard.classList.add(
        "portfolio-achievement"
    );

    achievementCard.innerHTML = `
        <h3>${achievement.title}</h3>

        <p>${achievement.description}</p>
    `;

    achievementsContainer.appendChild(
        achievementCard
    );

});