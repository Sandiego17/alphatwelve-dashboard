const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");
const themeIcons = document.querySelectorAll(".theme-icon");
const linkItems = document.querySelectorAll(".link-item");
const modeElement = document.querySelector(".mode");
const logos = document.querySelectorAll(".logo");
const toggleIcons = document.querySelectorAll(".toggle-icon");

// Toggle sidebar collapse
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapse");

  if (sidebar.classList.contains("collapse")) {
    linkItems.forEach(item => {
      item.classList.add("centered");
    });

    modeElement.classList.add("centered");
  } else {
    linkItems.forEach(item => {
      item.classList.remove("centered");
    });

    modeElement.classList.remove("centered");
  }

  logos.forEach(logo => {
    logo.classList.toggle("display-none");
  });

  toggleIcons.forEach(icon => {
    icon.classList.toggle("display-none");
  });
});

// Toggle dark mode and icon classes
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  themeIcons.forEach(icon => {
    icon.classList.toggle("display-none");
  });

  modeText.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});
