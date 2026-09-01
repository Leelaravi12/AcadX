const questions = [
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "define", "fun"],
        answer: "def"
    }
];

let currentQuestion = 0;
let score = 0;

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", showQuestion);

function showQuestion() {

    const q = questions[currentQuestion];

    document.querySelector(".welcome-card").innerHTML = `
        <p class="label">ACADX SKILL ASSESSMENT</p>

        <h1>Question ${currentQuestion + 1} of ${questions.length}</h1>

        <p class="description">
            ${q.question}
        </p>

        <div class="options">

            ${q.options.map(option => `
                <button class="option" onclick="checkAnswer('${option}')">
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function checkAnswer(selectedAnswer) {

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
        alert("Correct! 🎉");
    } else {
        alert("Not quite! The correct answer is " + correctAnswer);
    }
}