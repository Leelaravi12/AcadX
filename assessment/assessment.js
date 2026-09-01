// ==========================================
// ACADX - SKILL ASSESSMENT
// ==========================================


// ==========================================
// QUESTIONS
// ==========================================

const questions = [

    {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "define", "fun"],
        answer: "def",
        skill: "Python"
    },

    {
        question: "Which data type is used to store True or False?",
        options: ["String", "Integer", "Boolean", "Float"],
        answer: "Boolean",
        skill: "Python"
    },

    {
        question: "Which symbol is used for a comment in Python?",
        options: ["//", "#", "/*", "!--"],
        answer: "#",
        skill: "Python"
    },

    {
        question: "Which method adds an item to the end of a Python list?",
        options: ["add()", "insert()", "append()", "push()"],
        answer: "append()",
        skill: "Python"
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language",
        skill: "Web Development"
    },

    {
        question: "Which language is mainly used to style a webpage?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: "CSS",
        skill: "Web Development"
    },

    {
        question: "Which language makes webpages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript",
        skill: "Web Development"
    },

    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
        skill: "DSA"
    },

    {
        question: "What is the result of 5 + 3 * 2?",
        options: ["16", "11", "13", "10"],
        answer: "11",
        skill: "Problem Solving"
    },

    {
        question: "Which of these is a programming language?",
        options: ["Python", "Chrome", "Windows", "Photoshop"],
        answer: "Python",
        skill: "Problem Solving"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let selectedRole = "";


// ==========================================
// SKILL SCORE
// ==========================================

let skillScores = {

    "Python": {
        correct: 0,
        total: 0
    },

    "Web Development": {
        correct: 0,
        total: 0
    },

    "DSA": {
        correct: 0,
        total: 0
    },

    "Problem Solving": {
        correct: 0,
        total: 0
    }

};


// ==========================================
// START BUTTON
// ==========================================

const startButton =
    document.getElementById("startButton");


// ==========================================
// SELECT TARGET ROLE
// ==========================================

function selectRole(role) {

    selectedRole = role;

    // Find all role cards
    const roleButtons =
        document.querySelectorAll(".role-card");

    // Remove previous selection
    roleButtons.forEach(button => {

        button.classList.remove("selected");

    });

    // Add selection to clicked role
    roleButtons.forEach(button => {

        if (
            button.textContent
                .trim()
                .includes(role)
        ) {

            button.classList.add("selected");

        }

    });

    // Enable Start Assessment button
    if (startButton) {

        startButton.disabled = false;

    }

}


// ==========================================
// START ASSESSMENT
// ==========================================

if (startButton) {

    startButton.addEventListener(
        "click",
        function () {

            if (selectedRole === "") {

                alert("Please select a target role first.");

                return;

            }

            showQuestion();

        }
    );

}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    selectedAnswer = null;

    const q =
        questions[currentQuestion];

    const card =
        document.querySelector(".welcome-card");

    if (!card) {

        console.error(
            "welcome-card not found"
        );

        return;

    }


    card.innerHTML = `

        <p class="label">
            ACADX SKILL ASSESSMENT
        </p>


        <h1>
            Question ${currentQuestion + 1}
            of ${questions.length}
        </h1>


        <p class="description">
            ${q.question}
        </p>


        <div class="options">

            ${q.options.map(
                (option, index) => `

                <button
                    type="button"
                    class="option"
                    onclick="selectAnswer(${index})">

                    ${option}

                </button>

            `
            ).join("")}

        </div>


        <button
            type="button"
            id="nextButton"
            class="next-button"
            disabled>

            ${
                currentQuestion ===
                questions.length - 1

                ? "Finish Assessment"

                : "Next Question →"
            }

        </button>

    `;


    // Add click event to Next button
    const nextButton =
        document.getElementById(
            "nextButton"
        );

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextQuestion
        );

    }

}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(index) {

    selectedAnswer = index;


    const options =
        document.querySelectorAll(".option");


    options.forEach(
        (button, i) => {

            button.classList.remove(
                "selected"
            );


            if (i === index) {

                button.classList.add(
                    "selected"
                );

            }

        }
    );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (nextButton) {

        nextButton.disabled = false;

    }

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (selectedAnswer === null) {

        return;

    }


    const current =
        questions[currentQuestion];


    const selected =
        current.options[selectedAnswer];


    const isCorrect =
        selected === current.answer;


    // Overall score
    if (isCorrect) {

        score++;

    }


    // Skill score
    if (skillScores[current.skill]) {

        skillScores[
            current.skill
        ].total++;


        if (isCorrect) {

            skillScores[
                current.skill
            ].correct++;

        }

    }


    // Go to next question
    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    }

    else {

        showResult();

    }

}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    // Overall level
    let level;


    if (percentage >= 80) {

        level = "Advanced";

    }

    else if (percentage >= 60) {

        level = "Intermediate";

    }

    else {

        level = "Beginner";

    }


    // ======================================
    // CREATE SKILL BARS
    // ======================================

    let skillResults = "";


    for (const skill in skillScores) {

        const data =
            skillScores[skill];


        let skillPercentage = 0;


        if (data.total > 0) {

            skillPercentage =
                Math.round(
                    (data.correct /
                        data.total) * 100
                );

        }


        // Skill status
        let status;


        if (skillPercentage >= 80) {

            status = "Strong";

        }

        else if (skillPercentage >= 60) {

            status = "Moderate";

        }

        else {

            status = "Needs Improvement";

        }


        skillResults += `

            <div class="skill-result">

                <div class="skill-header">

                    <span>
                        ${skill}
                    </span>


                    <div>

                        <strong>
                            ${skillPercentage}%
                        </strong>


                        <span class="skill-status">
                            ${status}
                        </span>

                    </div>

                </div>


                <div class="skill-bar">

                    <div
                        class="skill-fill"
                        style="width: ${skillPercentage}%;">
                    </div>

                </div>

            </div>

        `;

    }


    // ======================================
    // RESULT PAGE
    // ======================================

    const card =
        document.querySelector(
            ".welcome-card"
        );


    if (!card) {

        console.error(
            "welcome-card not found"
        );

        return;

    }


    card.innerHTML = `

        <div class="icon">
            🏆
        </div>


        <p class="label">
            ACADX ASSESSMENT COMPLETE
        </p>


        <h1>
            Your Skill Report
        </h1>


        <div class="target-role">

            <span>
                Target Role
            </span>


            <strong>
                ${selectedRole}
            </strong>

        </div>


        <div class="result-score">
            ${percentage}%
        </div>


        <p class="description">

            You answered
            ${score}
            out of
            ${questions.length}
            questions correctly.

        </p>


        <h2 class="skill-level">
            ${level}
        </h2>


        <div class="skill-results">

            ${skillResults}

        </div>


        <button
            type="button"
            onclick="location.reload()">

            Retake Assessment

        </button>

    `;

}