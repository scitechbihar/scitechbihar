function toggleMenu() {
const nav = document.getElementById("navLinks");
nav.classList.toggle("active");
}


function toggleSearch() {
    const searchBox = document.getElementById("searchBox");
    searchBox.classList.toggle("active");
    
    // अगर सर्च बॉक्स खुल जाए, तो ऑटोमैटिक कर्सर वहां चला जाए
    if (searchBox.classList.contains("active")) {
        searchBox.querySelector("input").focus();
    }
}


fetch("latest-letter.html")
.then(response => response.text())
.then(data => {
document.getElementById("latestLetter").innerHTML = data;
});





let score = 0;

fetch("mcq.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("mcq-container");

    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("mcq");

      div.innerHTML = `
        <p><strong>Q${index + 1}. ${item.q}</strong></p>
        ${item.options.map(opt => 
          `<button onclick="checkAnswer(this, '${item.answer}')">${opt}</button>`
        ).join("")}
        <p class="result"></p>
      `;

      container.appendChild(div);
    });
  });





let currentQuestion = 0;

let timer;
let timeLeft = 30;
let questions = [];

fetch("mcq.json")
  .then(res => res.json())
  .then(data => {
    console.log("Loaded data:", data); // ✅ debug
    questions = data;

    if (questions.length > 0) {
      loadQuestion();   // 👉 यह जरूरी है
    } else {
      document.getElementById("mcq-container").innerHTML = "No questions found";
    }
  })
  .catch(err => {
    console.log("Error loading JSON:", err);
  });

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  startTimer();

  const container = document.getElementById("mcq-container");
  container.innerHTML = "";

  const q = questions[currentQuestion];

  const div = document.createElement("div");

  div.innerHTML = `
    <p><strong>Q${currentQuestion + 1}. ${q.q}</strong></p>
    ${q.options.map(opt =>
      `<button onclick="checkAnswer(this, '${q.answer}')">${opt}</button>`
    ).join("")}
    <p id="result"></p>
  `;

  container.appendChild(div);
}

function checkAnswer(btn, correctAnswer) {
  clearInterval(timer);

  const result = document.getElementById("result");
  const buttons = document.querySelectorAll("#mcq-container button");

  buttons.forEach(b => b.disabled = true);

  if (btn.innerText === correctAnswer) {
    result.innerHTML = "✅ सही उत्तर";
    result.style.color = "green";
    score++;
  } else {
    result.innerHTML = `❌ गलत! सही: ${correctAnswer}`;
    result.style.color = "red";
  }

  document.getElementById("score").innerText = `Score: ${score}`;

  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    document.getElementById("nextBtn").style.display = "none";
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById("nextBtn").style.display = "block";
    }
  }, 1000);
}

function showResult() {
  const container = document.getElementById("mcq-container");

  container.innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <h3>Your Score: ${score} / ${questions.length}</h3>
  `;

  document.getElementById("nextBtn").style.display = "none";
}  