// ===== Questions Array =====
const questions = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "4", "5"],
    answer: "4"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C++", "JavaScript", "Python"],
    answer: "JavaScript"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];

// ===== Variables =====
let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

// ===== Shuffle Questions =====
function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

// ===== Start Timer =====
function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerText = "Time: " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// ===== Display Question =====
function displayQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.innerText = "";

  questionEl.innerText = questions[currentIndex].question;
  optionsEl.innerHTML = "";

  questions[currentIndex].options.forEach(option => {
    optionsEl.innerHTML += `
      <label>
        <input type="radio" name="option" value="${option}">
        ${option}
      </label>
    `;
  });
}

// ===== Check Answer =====
function checkAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  const feedbackEl = document.getElementById("feedback");

  if (!selected) return;

  if (selected.value === questions[currentIndex].answer) {
    score++;
    feedbackEl.innerText = "Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.innerText = "Wrong!";
    feedbackEl.style.color = "red";
  }
}

// ===== Next Question =====
function nextQuestion() {
  checkAnswer();
  clearInterval(timer);
  currentIndex++;

  if (currentIndex < questions.length) {
    displayQuestion();
    startTimer();
  } else {
    showScore();
  }
}

// ===== Show Final Score =====
function showScore() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("score").innerText =
    "Your Score: " + score + " / " + questions.length;
}

// ===== Start Quiz =====
function startQuiz() {
  shuffleQuestions();
  displayQuestion();
  startTimer();
}

// ===== Button Event =====
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

// Start quiz when page loads
startQuiz();
