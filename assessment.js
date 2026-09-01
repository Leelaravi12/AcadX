const questions = [
    {
        question: "What does HTML primarily define?",
        options: [
            "Web page structure and content",
            "Database connections",
            "Server hardware",
            "Operating system settings"
        ],
        answer: 0
    },
    {
        question: "What is CSS mainly used for?",
        options: [
            "Creating databases",
            "Styling web pages",
            "Managing servers",
            "Writing operating systems"
        ],
        answer: 1
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        answer: 2
    },
    {
        question: "Which property is used to change text color in CSS?",
        options: [
            "font-size",
            "color",
            "background",
            "text-style"
        ],
        answer: 1
    },
    {
        question: "Which HTML tag is used to create a link?",
        options: [
            "<link>",
            "<a>",
            "<url>",
            "<href>"
        ],
        answer: 1
    },
    {
        question: "Which CSS property controls the space inside an element?",
        options: [
            "margin",
            "padding",
            "border",
            "spacing"
        ],
        answer: 1
    },
    {
        question: "Which HTML tag is used to display an image?",
        options: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>"
        ],
        answer: 2
    },
    {
        question: "Which CSS property changes the background color?",
        options: [
            "background-color",
            "color",
            "bg-color",
            "background-style"
        ],
        answer: 0
    },
    {
        question: "Which HTML element creates an unordered list?",
        options: [
            "<ol>",
            "<list>",
            "<ul>",
            "<li>"
        ],
        answer: 2
    },
    {
        question: "Which CSS layout system is commonly used for one-dimensional layouts?",
        options: [
            "Flexbox",
            "Table",
            "Float",
            "Position"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionCount = document.querySelector(".question-count");
const questionTitle = document.querySelector(".question-header h2");
const questionScore = document.querySelector(".question-score");
const answerOptions = document.querySelector(".answer-options");
const nextButton = document.querySelector(".next-button");
const progressFill = document.querySelector(".question-progress-fill");

function loadQuestion() {

    const question = questions[currentQuestion];

    questionCount.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    questionTitle.textContent = question.question;

    questionScore.textContent =
        `${score} / ${questions.length}`;

    selectedAnswer = null;

    answerOptions.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";

        button.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>
        `;

        const optionText =
        document.createElement("span");
        optionText.textContent = option;

        button.appendChild(optionText);

        button.addEventListener("click", () => {

            selectedAnswer = index;

            document
                .querySelectorAll(".answer-option")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");
        });

        answerOptions.appendChild(button);
    });

    const progress =
        (currentQuestion / questions.length) * 100;

    progressFill.style.width = `${progress}%`;
}


nextButton.addEventListener("click", () => {

    if (selectedAnswer === null) {
        alert("Please select an answer first.");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});


function showResult() {

    progressFill.style.width = "100%";

    questionCount.textContent = "ASSESSMENT COMPLETED";

    questionTitle.textContent =
        `Your Score: ${score} / ${questions.length}`;

    questionScore.textContent =
        `${score} / ${questions.length}`;

    answerOptions.innerHTML = `
        <div class="result-message">
            <h3>Great job! 🎉</h3>
            <p>
                You have completed the HTML & CSS assessment.
            </p>
        </div>
    `;

    nextButton.textContent = "Back to Skills →";

    nextButton.onclick = () => {
        window.location.href = "skills.html";
    };
}


loadQuestion();