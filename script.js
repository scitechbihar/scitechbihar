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