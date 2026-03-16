function toggleMenu() {
const nav = document.getElementById("navLinks");
nav.classList.toggle("active");
}



function toggleSearch(){
const box = document.getElementById("searchBox");
box.classList.toggle("active");
}


fetch("latest-letter.html")
.then(response => response.text())
.then(data => {
document.getElementById("latestLetter").innerHTML = data;
});