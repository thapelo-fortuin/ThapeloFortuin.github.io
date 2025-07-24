// Toggle navigation menu on mobile
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// Typing animation (basic simulation)
const typingText = document.querySelector(".typing-text span");
const roles = ["Final Year IT Student", "Web Developer", "Software Developer"];
let roleIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingText.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingText) type();
});
