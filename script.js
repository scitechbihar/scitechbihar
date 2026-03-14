function toggleMenu(){
    const nav = document.getElementById("nav-links");
    const burger = document.querySelector(".hamburger");

    nav.classList.toggle("active");
    burger.classList.toggle("active");
}

<script>
function searchLetters() {

let input = document.getElementById("searchInput");
let filter = input.value.toLowerCase();
let letters = document.getElementsByClassName("letter");

for (let i = 0; i < letters.length; i++) {

let text = letters[i].textContent || letters[i].innerText;

if (text.toLowerCase().indexOf(filter) > -1) {
letters[i].style.display = "";
} else {
letters[i].style.display = "none";
}

}

}

</script>

fetch("latest-letter.html")
.then(response => response.text())
.then(data => {
document.getElementById("latestLetter").innerHTML = data;
});