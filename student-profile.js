const editButton = document.querySelector(".edit-button");
const editForm = document.querySelector("#edit-form");
const saveButton = document.querySelector("#save-profile");

let profile = JSON.parse(localStorage.getItem("acadxProfile")) || {
    name: "Student Name",
    branch: "Computer Science & Engineering",
    college: "College Name",
    year: "2nd Year"
};

function displayProfile() {

    document.querySelector(".profile-info h2").textContent =
        profile.name;

    document.querySelector(".profile-info p:nth-of-type(1)").textContent =
        profile.branch;

    document.querySelector(".profile-info p:nth-of-type(2)").textContent =
        profile.college;

    document.querySelector(".profile-info p:nth-of-type(3)").textContent =
        profile.year;

}

displayProfile();


editButton.addEventListener("click", function () {

    editForm.style.display = "block";

    document.querySelector("#student-name").value =
        profile.name;

    document.querySelector("#student-branch").value =
        profile.branch;

    document.querySelector("#student-college").value =
        profile.college;

    document.querySelector("#student-year").value =
        profile.year;

});


saveButton.addEventListener("click", function () {

    const name =
        document.querySelector("#student-name").value.trim();

    const branch =
        document.querySelector("#student-branch").value.trim();

    const college =
        document.querySelector("#student-college").value.trim();

    const year =
        document.querySelector("#student-year").value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;
    }

    profile = {
        name: name,
        branch: branch,
        college: college,
        year: year
    };

    localStorage.setItem(
        "acadxProfile",
        JSON.stringify(profile)
    );

    displayProfile();

    editForm.style.display = "none";

});
const addSkillButton = document.querySelector("#add-skill-button");
const newSkillInput = document.querySelector("#new-skill");
const skillsContainer = document.querySelector("#skills-container");

let skills = JSON.parse(localStorage.getItem("acadxSkills")) || [
    "Python",
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Git & GitHub"
];

function displaySkills() {

    skillsContainer.innerHTML = "";

    skills.forEach(function (skill) {

        const skillTag = document.createElement("span");

        skillTag.classList.add("skill-tag");

        skillTag.textContent = skill;

        skillsContainer.appendChild(skillTag);

    });

}

displaySkills();

addSkillButton.addEventListener("click", function () {

    const skill = newSkillInput.value.trim();

    if (skill === "") {
        alert("Please enter a skill.");
        return;
    }

    skills.push(skill);

    localStorage.setItem(
        "acadxSkills",
        JSON.stringify(skills)
    );

    displaySkills();

    newSkillInput.value = "";

});


const addProjectButton = document.querySelector("#add-project-button");
const projectsContainer = document.querySelector("#projects-container");

let projects = JSON.parse(localStorage.getItem("acadxProjects")) || [
    {
        title: "Food Waste Management System",
        description: "A web platform that connects food donors with organizations to help reduce food wastage.",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"]
    }
];

function displayProjects() {

    projectsContainer.innerHTML = "";

    projects.forEach(function (project, index) {

        const projectCard = document.createElement("article");

        projectCard.classList.add("project-card");

        projectCard.innerHTML = `
            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <div class="project-tech">
                ${project.technologies
                    .map(function (tech) {
                        return `<span>${tech}</span>`;
                    })
                    .join("")}
            </div>

            <button class="project-button">
                View Project
            </button>

            <button class="edit-project-button" data-index="${index}">
                Edit
            </button>

            <button class="delete-project-button" data-index="${index}">
                Delete
            </button>
        `;

        projectsContainer.appendChild(projectCard);

    });

}

displayProjects();


addProjectButton.addEventListener("click", function () {

    const title =
        document.querySelector("#project-title").value.trim();

    const description =
        document.querySelector("#project-description").value.trim();

    const technologies =
        document.querySelector("#project-technologies").value.trim();

    if (title === "" || description === "") {

        alert("Please enter the project title and description.");

        return;
    }

    const technologyList = technologies
        .split(",")
        .map(function (tech) {
            return tech.trim();
        })
        .filter(function (tech) {
            return tech !== "";
        });

    const newProject = {
        title: title,
        description: description,
        technologies: technologyList
    };

    projects.push(newProject);

    localStorage.setItem(
        "acadxProjects",
        JSON.stringify(projects)
    );

    displayProjects();

    document.querySelector("#project-title").value = "";
    document.querySelector("#project-description").value = "";
    document.querySelector("#project-technologies").value = "";

});
projectsContainer.addEventListener("click", function (event) {

    const index = event.target.dataset.index;

    if (event.target.classList.contains("delete-project-button")) {

        projects.splice(index, 1);

        localStorage.setItem(
            "acadxProjects",
            JSON.stringify(projects)
        );

        displayProjects();
    }


    if (event.target.classList.contains("edit-project-button")) {

        const project = projects[index];

        const newTitle = prompt(
            "Edit project title:",
            project.title
        );

        if (newTitle === null) {
            return;
        }

        const newDescription = prompt(
            "Edit project description:",
            project.description
        );

        if (newDescription === null) {
            return;
        }

        project.title = newTitle.trim();
        project.description = newDescription.trim();

        localStorage.setItem(
            "acadxProjects",
            JSON.stringify(projects)
        );

        displayProjects();
    }

});
    const addCertificateButton =
    document.querySelector("#add-certificate-button");

const certificationsContainer =
    document.querySelector("#certifications-container");

let certifications =
    JSON.parse(localStorage.getItem("acadxCertifications")) || [
        {
            name: "Python Programming",
            issuer: "Organization Name",
            year: "2026",
            link: ""
        }
    ];

function displayCertifications() {

    certificationsContainer.innerHTML = "";

    certifications.forEach(function (certificate, index) {

        const certificateCard =
            document.createElement("div");

        certificateCard.classList.add("certification-card");

        certificateCard.innerHTML = `
            <h3>${certificate.name}</h3>

            <p>Issued by: ${certificate.issuer}</p>

            <p>Year: ${certificate.year}</p>

            ${
                certificate.link
                    ? `<a href="${certificate.link}" target="_blank">
                        View Certificate
                       </a>`
                    : ""
            }

            <button
                class="delete-certificate-button"
                data-index="${index}">
                Delete
            </button>
        `;

        certificationsContainer.appendChild(certificateCard);

    });

}

displayCertifications();


addCertificateButton.addEventListener("click", function () {

    const name =
        document.querySelector("#certificate-name").value.trim();

    const issuer =
        document.querySelector("#certificate-issuer").value.trim();

    const year =
        document.querySelector("#certificate-year").value.trim();

    const link =
        document.querySelector("#certificate-link").value.trim();

    if (name === "" || issuer === "" || year === "") {

        alert(
            "Please enter the certificate name, issuer and year."
        );

        return;
    }

    const newCertificate = {

        name: name,
        issuer: issuer,
        year: year,
        link: link

    };

    certifications.push(newCertificate);

    localStorage.setItem(
        "acadxCertifications",
        JSON.stringify(certifications)
    );

    displayCertifications();

    document.querySelector("#certificate-name").value = "";
    document.querySelector("#certificate-issuer").value = "";
    document.querySelector("#certificate-year").value = "";
    document.querySelector("#certificate-link").value = "";

});
certificationsContainer.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "delete-certificate-button"
            )
        ) {

            const index =
                event.target.dataset.index;

            certifications.splice(index, 1);

            localStorage.setItem(
                "acadxCertifications",
                JSON.stringify(certifications)
            );

            displayCertifications();

        }

    }
);
    const addAchievementButton =
    document.querySelector("#add-achievement-button");

const achievementsContainer =
    document.querySelector("#achievements-container");

let achievements =
    JSON.parse(localStorage.getItem("acadxAchievements")) || [
        {
            title: "Hackathon Participation",
            description:
                "Participated in a technology hackathon and developed a solution for a real-world problem."
        }
    ];

function displayAchievements() {

    achievementsContainer.innerHTML = "";

    achievements.forEach(function (achievement, index) {

        const achievementCard =
            document.createElement("div");

        achievementCard.classList.add("achievement-card");

        achievementCard.innerHTML = `
            <h3>${achievement.title}</h3>

            <p>${achievement.description}</p>

            <button
                class="delete-achievement-button"
                data-index="${index}">
                Delete
            </button>
        `;

        achievementsContainer.appendChild(achievementCard);

    });

}

displayAchievements();


addAchievementButton.addEventListener("click", function () {

    const title =
        document.querySelector("#achievement-title").value.trim();

    const description =
        document.querySelector("#achievement-description").value.trim();

    if (title === "" || description === "") {

        alert(
            "Please enter the achievement title and description."
        );

        return;
    }

    const newAchievement = {

        title: title,
        description: description

    };

    achievements.push(newAchievement);

    localStorage.setItem(
        "acadxAchievements",
        JSON.stringify(achievements)
    );

    displayAchievements();

    document.querySelector("#achievement-title").value = "";
    document.querySelector("#achievement-description").value = "";

});
achievementsContainer.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "delete-achievement-button"
            )
        ) {

            const index =
                event.target.dataset.index;

            achievements.splice(index, 1);

            localStorage.setItem(
                "acadxAchievements",
                JSON.stringify(achievements)
            );

            displayAchievements();

        }

    }
);