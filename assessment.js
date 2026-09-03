// ==========================================
// ACADX - SKILL ASSESSMENT
// ==========================================


// ==========================================
// ROLE-BASED QUESTIONS
// ==========================================

const roleQuestions = {

    "Software Developer": [

        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "define", "fun"],
            answer: "def",
            skill: "Python"
        },

        {
            question: "Which method adds an item to the end of a Python list?",
            options: ["add()", "insert()", "append()", "push()"],
            answer: "append()",
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
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            answer: "O(log n)",
            skill: "DSA"
        },

        {
            question: "What is the result of 5 + 3 * 2?",
            options: ["16", "11", "13", "10"],
            answer: "11",
            skill: "Problem Solving"
        }

    ],


    "Data Analyst": [

        {
            question: "Which language is commonly used for data analysis?",
            options: ["Python", "HTML", "CSS", "XML"],
            answer: "Python",
            skill: "Python"
        },

        {
            question: "Which Python library is mainly used for working with tables and datasets?",
            options: ["Pandas", "Turtle", "Pygame", "Tkinter"],
            answer: "Pandas",
            skill: "Python"
        },

        {
            question: "Which Python library is commonly used for numerical calculations?",
            options: ["NumPy", "Flask", "Django", "BeautifulSoup"],
            answer: "NumPy",
            skill: "Python"
        },

        {
            question: "Which SQL command is used to retrieve data from a table?",
            options: ["GET", "SELECT", "FETCHDATA", "READ"],
            answer: "SELECT",
            skill: "SQL"
        },

        {
            question: "Which SQL clause is used to filter records?",
            options: ["ORDER BY", "GROUP BY", "WHERE", "SORT"],
            answer: "WHERE",
            skill: "SQL"
        },

        {
            question: "Which SQL function calculates the average of a column?",
            options: ["SUM()", "COUNT()", "AVG()", "TOTAL()"],
            answer: "AVG()",
            skill: "SQL"
        },

        {
            question: "Which chart is commonly used to show trends over time?",
            options: ["Line chart", "Pie chart", "Scatter only", "Radar chart"],
            answer: "Line chart",
            skill: "Data Visualization"
        },

        {
            question: "What does a bar chart mainly help compare?",
            options: [
                "Categories",
                "Only dates",
                "Only text",
                "Programming languages"
            ],
            answer: "Categories",
            skill: "Data Visualization"
        },

        {
            question: "What is the median of 2, 4, 6, 8, 10?",
            options: ["4", "5", "6", "8"],
            answer: "6",
            skill: "Statistics"
        },

        {
            question: "If a dataset contains duplicate records, what should a data analyst generally do?",
            options: [
                "Ignore them always",
                "Identify and handle them",
                "Delete the entire dataset",
                "Convert everything to text"
            ],
            answer: "Identify and handle them",
            skill: "Problem Solving"
        }

    ],


    "AI / ML Engineer": [

        {
            question: "Which type of learning uses labelled training data?",
            options: [
                "Supervised learning",
                "Unsupervised learning",
                "Random learning",
                "Manual learning"
            ],
            answer: "Supervised learning",
            skill: "Machine Learning"
        },

        {
            question: "Which algorithm is commonly used for binary classification?",
            options: [
                "Linear Regression",
                "Logistic Regression",
                "K-Means",
                "PCA"
            ],
            answer: "Logistic Regression",
            skill: "Machine Learning"
        },

        {
            question: "What is the purpose of a training dataset?",
            options: [
                "To train a model",
                "To delete a model",
                "To design a webpage",
                "To store passwords"
            ],
            answer: "To train a model",
            skill: "Machine Learning"
        },

        {
            question: "Which Python library is widely used for machine learning?",
            options: [
                "Scikit-learn",
                "Pygame",
                "Tkinter",
                "OpenPyXL"
            ],
            answer: "Scikit-learn",
            skill: "Python"
        },

        {
            question: "Which Python library is commonly used for numerical computation?",
            options: [
                "NumPy",
                "Flask",
                "Django",
                "Requests"
            ],
            answer: "NumPy",
            skill: "Python"
        },

        {
            question: "What is overfitting?",
            options: [
                "A model performs very well on training data but poorly on new data",
                "A model has no training data",
                "A model has no features",
                "A model cannot run"
            ],
            answer: "A model performs very well on training data but poorly on new data",
            skill: "Machine Learning"
        },

        {
            question: "Which technique is commonly used to divide data into training and testing sets?",
            options: [
                "Train-test split",
                "Data deletion",
                "Data hiding",
                "Code splitting"
            ],
            answer: "Train-test split",
            skill: "Machine Learning"
        },

        {
            question: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Graph", "Tree"],
            answer: "Stack",
            skill: "DSA"
        },

        {
            question: "What is the purpose of feature scaling?",
            options: [
                "To put features on comparable scales",
                "To remove all data",
                "To create HTML pages",
                "To increase file size"
            ],
            answer: "To put features on comparable scales",
            skill: "Data Processing"
        },

        {
            question: "Which metric is commonly used to evaluate a classification model?",
            options: [
                "Accuracy",
                "File size",
                "Screen resolution",
                "Memory address"
            ],
            answer: "Accuracy",
            skill: "Problem Solving"
        }

    ],


    "Cloud Engineer": [

        {
            question: "What does IaaS stand for?",
            options: [
                "Infrastructure as a Service",
                "Internet as a System",
                "Information as a Service",
                "Infrastructure and Software"
            ],
            answer: "Infrastructure as a Service",
            skill: "Cloud Computing"
        },

        {
            question: "Which of these is a cloud computing platform?",
            options: [
                "AWS",
                "HTML",
                "CSS",
                "Git"
            ],
            answer: "AWS",
            skill: "Cloud Computing"
        },

        {
            question: "What is cloud computing?",
            options: [
                "Delivery of computing resources over the internet",
                "Only storing files on a laptop",
                "Creating webpages",
                "Writing only Python programs"
            ],
            answer: "Delivery of computing resources over the internet",
            skill: "Cloud Computing"
        },

        {
            question: "Which service model provides ready-to-use software over the internet?",
            options: [
                "SaaS",
                "IaaS",
                "LAN",
                "CPU"
            ],
            answer: "SaaS",
            skill: "Cloud Computing"
        },

        {
            question: "What is virtualization?",
            options: [
                "Creating virtual versions of computing resources",
                "Deleting physical computers",
                "Writing CSS",
                "Encrypting only passwords"
            ],
            answer: "Creating virtual versions of computing resources",
            skill: "Virtualization"
        },

        {
            question: "Which protocol is commonly used for secure remote server access?",
            options: [
                "SSH",
                "HTTP",
                "FTP",
                "HTML"
            ],
            answer: "SSH",
            skill: "Networking"
        },

        {
            question: "What does DNS primarily do?",
            options: [
                "Maps domain names to IP addresses",
                "Stores images",
                "Creates databases",
                "Compiles Python"
            ],
            answer: "Maps domain names to IP addresses",
            skill: "Networking"
        },

        {
            question: "Which concept allows cloud resources to automatically increase or decrease based on demand?",
            options: [
                "Auto scaling",
                "Formatting",
                "Compilation",
                "Debugging"
            ],
            answer: "Auto scaling",
            skill: "Cloud Computing"
        },

        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: "Queue",
            skill: "DSA"
        },

        {
            question: "A server suddenly becomes unavailable. What should a cloud engineer check first?",
            options: [
                "Server and service status",
                "Change the website color",
                "Delete the database",
                "Restart every computer"
            ],
            answer: "Server and service status",
            skill: "Problem Solving"
        }

    ]

};


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let selectedRole =
    localStorage.getItem("acadx_selected_role") || "";

let questions = [];
let skillScores = {};


// ==========================================
// START BUTTON
// ==========================================

const startButton =
    document.getElementById("startButton");


// ==========================================
// AUTOMATICALLY LOAD ROLE FROM DASHBOARD
// ==========================================

if (selectedRole && roleQuestions[selectedRole]) {

    questions =
        roleQuestions[selectedRole];

    if (startButton) {
        startButton.disabled = false;
    }

    const title =
        document.getElementById("assessmentTitle");

    const description =
        document.getElementById("assessmentDescription");

    if (title) {
        title.textContent =
            `${selectedRole} Assessment`;
    }

    if (description) {
        description.textContent =
            "Your assessment is based on the career role you selected.";
    }

} else {

    if (startButton) {
        startButton.disabled = true;
    }

    const description =
        document.getElementById("assessmentDescription");

    if (description) {
        description.textContent =
            "Please select a career role from the Dashboard before starting the assessment.";
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

                alert(
                    "Please select a target role first."
                );

                return;

            }

            questions =
                roleQuestions[selectedRole] || [];

            if (questions.length === 0) {

                alert(
                    "Questions for this role are not available."
                );

                return;

            }

            // Reset assessment
            currentQuestion = 0;

            score = 0;

            selectedAnswer = null;

            // Create skill score object
            skillScores = {};

            questions.forEach(question => {

                if (!skillScores[question.skill]) {

                    skillScores[question.skill] = {
                        correct: 0,
                        total: 0
                    };

                }

            });

            // Store selected role
            localStorage.setItem(
                "acadx_selected_role",
                selectedRole
            );

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


    // ======================================
    // SAVE ASSESSMENT RESULT
    // ======================================

    const roleKeys = {

        "Software Developer": "software",

        "Data Analyst": "data",

        "AI / ML Engineer": "ai",

        "Cloud Engineer": "cloud"

    };


    const roleKey =
        roleKeys[selectedRole];


    if (roleKey) {

        // Remember that this role is completed
        localStorage.setItem(
            "acadx_assessment_" + roleKey,
            "completed"
        );


        // Save score for this role
        localStorage.setItem(
            "acadx_score_" + roleKey,
            percentage
        );


        // Remember the selected role
        localStorage.setItem(
            "acadx_selected_role",
            selectedRole
        );

    }


    // ======================================
    // SAVE SKILL SCORES FOR SKILL GAP
    // ======================================

    const savedSkillScores = {};

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

        savedSkillScores[skill] =
            skillPercentage;

    }


    localStorage.setItem(
        "acadx_assessment_result",
        JSON.stringify({

            role: selectedRole,

            percentage: percentage,

            skills: savedSkillScores

        })
    );


    // ======================================
    // OVERALL LEVEL
    // ======================================

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
            onclick="location.href='assessment.html'">

            Retake Assessment

        </button>


        <button
            type="button"
            onclick="location.href='dashboard.html'">

            Back to Dashboard

        </button>

    `;

}