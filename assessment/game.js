// ==========================================
// ACADX - SKILL SPRINT GAME
// ==========================================


// ==========================================
// QUESTIONS
// ==========================================

const gameQuestions = [

    {
        question: "Which symbol is used to assign a value to a variable in Python?",
        options: ["=", "==", "+", "#"],
        answer: "=",
        skill: "Python"
    },

    {
        question: "Which one is a Python data type?",
        options: ["Integer", "Website", "Browser", "Folder"],
        answer: "Integer",
        skill: "Python"
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        options: ["<h1>", "<p>", "<img>", "<br>"],
        answer: "<p>",
        skill: "HTML"
    },

    {
        question: "Which CSS property is used to change text color?",
        options: ["background", "font-size", "color", "border"],
        answer: "color",
        skill: "CSS"
    },

    {
        question: "Which JavaScript keyword can be used to declare a variable?",
        options: ["let", "make", "variable", "create"],
        answer: "let",
        skill: "JavaScript"
    },

    {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        answer: "Stack",
        skill: "DSA"
    },

    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
        skill: "DSA"
    },

    {
        question: "What is the result of 10 + 5?",
        options: ["12", "15", "20", "50"],
        answer: "15",
        skill: "Programming"
    },

    {
        question: "Which device is used to type text into a computer?",
        options: ["Monitor", "Keyboard", "Speaker", "Printer"],
        answer: "Keyboard",
        skill: "Computer Basics"
    },

    {
        question: "What does a loop help a program do?",
        options: [
            "Repeat instructions",
            "Delete the computer",
            "Change the monitor",
            "Open a browser"
        ],
        answer: "Repeat instructions",
        skill: "Programming"
    }

];


// ==========================================
// GAME VARIABLES
// ==========================================

let currentGameQuestion = 0;

let gameScore = 0;

let correctAnswers = 0;

let timeLeft = 10;

let timer = null;

let answered = false;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const startGameButton =
    document.getElementById("startGameButton");

const startScreen =
    document.getElementById("start-screen");

const gameScreen =
    document.getElementById("game-screen");

const resultScreen =
    document.getElementById("result-screen");

const gameQuestion =
    document.getElementById("game-question");

const gameOptions =
    document.getElementById("game-options");

const timerElement =
    document.getElementById("timer");

const scoreElement =
    document.getElementById("score");

const questionNumber =
    document.getElementById("question-number");

const progressBar =
    document.getElementById("progress-bar");

const skillName =
    document.getElementById("skill-name");

const nextGameButton =
    document.getElementById("next-game-button");


// ==========================================
// START GAME
// ==========================================

if (startGameButton) {

    startGameButton.addEventListener(
        "click",
        startGame
    );

}


function startGame() {

    currentGameQuestion = 0;

    gameScore = 0;

    correctAnswers = 0;

    scoreElement.textContent = "0";

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    showGameQuestion();

}


// ==========================================
// SHOW QUESTION
// ==========================================

function showGameQuestion() {

    clearInterval(timer);

    timeLeft = 10;

    answered = false;

    timerElement.textContent = timeLeft;

    nextGameButton.classList.add("hidden");


    const question =
        gameQuestions[currentGameQuestion];


    // Question number

    questionNumber.textContent =
        `Challenge ${currentGameQuestion + 1} of ${gameQuestions.length}`;


    // Skill

    skillName.textContent =
        question.skill;


    // Question

    gameQuestion.textContent =
        question.question;


    // Progress bar

    const progress =
        ((currentGameQuestion + 1) /
            gameQuestions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Remove old options

    gameOptions.innerHTML = "";


    // Create answer buttons

    question.options.forEach(
        function (option) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "game-option";

            button.textContent =
                option;


            button.addEventListener(
                "click",
                function () {

                    selectGameAnswer(
                        button,
                        option
                    );

                }
            );


            gameOptions.appendChild(
                button
            );

        }
    );


    startTimer();

}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    timer = setInterval(
        function () {

            timeLeft--;

            timerElement.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                clearInterval(timer);

                timeUp();

            }

        },
        1000
    );

}


// ==========================================
// TIME UP
// ==========================================

function timeUp() {

    if (answered) {
        return;
    }

    answered = true;

    disableOptions();

    showCorrectAnswer();

    nextGameButton.classList.remove(
        "hidden"
    );

}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectGameAnswer(
    selectedButton,
    selectedOption
) {

    if (answered) {
        return;
    }


    answered = true;

    clearInterval(timer);


    const question =
        gameQuestions[currentGameQuestion];


    const allOptions =
        document.querySelectorAll(
            ".game-option"
        );


    // Disable all buttons

    allOptions.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    // Check answer

    if (
        selectedOption ===
        question.answer
    ) {

        selectedButton.classList.add(
            "correct"
        );


        correctAnswers++;


        // Score depends on remaining time

        gameScore +=
            100 + (timeLeft * 10);


        scoreElement.textContent =
            gameScore;

    }

    else {

        selectedButton.classList.add(
            "wrong"
        );


        showCorrectAnswer();

    }


    nextGameButton.classList.remove(
        "hidden"
    );

}


// ==========================================
// DISABLE OPTIONS
// ==========================================

function disableOptions() {

    const allOptions =
        document.querySelectorAll(
            ".game-option"
        );


    allOptions.forEach(
        function (button) {

            button.disabled = true;

        }
    );

}


// ==========================================
// SHOW CORRECT ANSWER
// ==========================================

function showCorrectAnswer() {

    const question =
        gameQuestions[currentGameQuestion];


    const allOptions =
        document.querySelectorAll(
            ".game-option"
        );


    allOptions.forEach(
        function (button) {

            if (
                button.textContent ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );

}


// ==========================================
// NEXT QUESTION
// ==========================================

if (nextGameButton) {

    nextGameButton.addEventListener(
        "click",
        nextGameQuestion
    );

}


function nextGameQuestion() {

    currentGameQuestion++;


    if (
        currentGameQuestion <
        gameQuestions.length
    ) {

        showGameQuestion();

    }

    else {

        showGameResult();

    }

}


// ==========================================
// SHOW RESULT
// ==========================================

function showGameResult() {

    clearInterval(timer);


    gameScreen.classList.add(
        "hidden"
    );


    resultScreen.classList.remove(
        "hidden"
    );


    // Final score

    document.getElementById(
        "final-score"
    ).textContent =
        gameScore;


    // Correct answers

    document.getElementById(
        "correct-count"
    ).textContent =
        `${correctAnswers}/${gameQuestions.length}`;


    // Accuracy

    const accuracy =
        Math.round(
            (correctAnswers /
                gameQuestions.length) * 100
        );


    document.getElementById(
        "accuracy"
    ).textContent =
        `${accuracy}%`;

}


// ==========================================
// PLAY AGAIN
// ==========================================

const playAgainButton =
    document.getElementById(
        "play-again-button"
    );


if (playAgainButton) {

    playAgainButton.addEventListener(
        "click",
        function () {

            resultScreen.classList.add(
                "hidden"
            );

            startScreen.classList.remove(
                "hidden"
            );

        }
    );

}