// main.js

// Theme toggle functionality

themeToggleButton.addEventListener("click", () => {
  // Toggle between light and dark themes
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  // Change the icon of the button accordingly
  const icon = themeToggleButton.querySelector("i");
  if (body.classList.contains("dark-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

// Mobile menu toggle functionality
const mobileMenuButton = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Language selector functionality
const languageSelector = document.getElementById("language-select");
if (languageSelector) {
  languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    console.log(`Language changed to: ${selectedLanguage}`);
    // Implement actual language change logic here
  });
}

// Accessibility controls for font size
const decreaseFontButton = document.getElementById("decrease-font");
const resetFontButton = document.getElementById("reset-font");
const increaseFontButton = document.getElementById("increase-font");

decreaseFontButton.addEventListener("click", () => {
  document.body.style.fontSize = "0.9em";
});
resetFontButton.addEventListener("click", () => {
  document.body.style.fontSize = "1em";
});
increaseFontButton.addEventListener("click", () => {
  document.body.style.fontSize = "1.1em";
});

// High Contrast Toggle
const highContrastCheckbox = document.getElementById("high-contrast");
highContrastCheckbox.addEventListener("change", () => {
  if (highContrastCheckbox.checked) {
    body.classList.add("high-contrast");
  } else {
    body.classList.remove("high-contrast");
  }
});

// Text to Speech Toggle
const textToSpeechCheckbox = document.getElementById("text-to-speech");
textToSpeechCheckbox.addEventListener("change", () => {
  if (textToSpeechCheckbox.checked) {
    const textElements = document.querySelectorAll(".translate");
    textElements.forEach((element) => {
      const text = element.textContent.trim();
      if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      }
    });
  }
});

// PDF generation for portfolio
const generatePdfButton = document.getElementById("generate-pdf");

generatePdfButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.html(document.querySelector(".portfolio-content"), {
    callback: function (doc) {
      doc.save("portfolio.pdf");
    },
    x: 10,
    y: 10,
    width: 180,
    windowWidth: 650
  });
});

// Page Transition
document.querySelectorAll('a').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetPage = link.getAttribute("href");
    // Proceed only if targetPage is a valid link and not just a placeholder
    if (targetPage && targetPage !== "#" && targetPage.trim() !== "") {
      e.preventDefault();
      const transitionOverlay = document.querySelector(".page-transition");
      if (transitionOverlay) {
        transitionOverlay.classList.add("active");
      }
      setTimeout(() => {
        window.location.href = targetPage;
      }, 1000);
    }
  });
});

// Theme toggle functionality
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;

themeToggleButton.addEventListener("click", () => {
  const icon = themeToggleButton.querySelector("i");

  if (body.classList.contains("dark-theme")) {
    // Currently dark, so switch to light theme
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    if (icon) {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  } else {
    // Currently light, so switch to dark theme
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    if (icon) {
      icon.classList.replace("fa-moon", "fa-sun");
    }
  }
});
