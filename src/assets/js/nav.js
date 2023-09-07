// JavaScript to toggle the mobile menu
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
