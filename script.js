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

function checkAnswer(btn, correctAnswer) {
  const parent = btn.parentElement;
  const result = parent.querySelector(".result");

  // disable all buttons
  const buttons = parent.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (btn.innerText === correctAnswer) {
    result.innerHTML = "✅ सही उत्तर";
    result.style.color = "green";
    score++;
  } else {
    result.innerHTML = `❌ गलत! सही उत्तर: ${correctAnswer}`;
    result.style.color = "red";
  }

  updateScore();
}

function updateScore() {
  document.getElementById("score").innerText = `Score: ${score}`;
}