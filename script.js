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



document.addEventListener("DOMContentLoaded", function () {

  fetch('mcq.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('mcq-container');

      data.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('question');

        div.innerHTML = `
          <p class="question-text"><strong>प्रश्न ${index + 1}:</strong> ${item.question}</p>
          <p class="answer" style="display:none;">उत्तर: ${item.answer}</p>
        `;

        // 👇 click event
        div.addEventListener("click", () => {
          const ans = div.querySelector(".answer");
          ans.style.display = ans.style.display === "none" ? "block" : "none";
        });

        container.appendChild(div);
      });
    });

});