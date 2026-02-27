function toggleMenu(){
    const nav = document.getElementById("nav-links");
    const burger = document.querySelector(".hamburger");

    nav.classList.toggle("active");
    burger.classList.toggle("active");
}