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
const ctx = document.getElementById("barChart");
const carouselBtn = document.querySelectorAll("[data-carousel-button]");

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

// Initialize the bar chart
const barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: '',
      data: [700, 900, 800, 400, 1000, 500, 850, 350, 840, 650, 950, 600],
      borderWidth: 1,
      backgroundColor: '#8576FF'
    }]
  },
  options: {
    scales: {
      x: {
        ticks: {
          color: '#64748B'
        },
        grid: {
          color: '#E2E8F0',
          borderDash: [5, 5]
        }
      },
      y: {
        ticks: {
          color: '#64748B',
          stepSize: 200
        },
        grid: {
          color: '#E2E8F0',
          borderDash: [10, 5]
        }
      }
    }
  }
});

// Carousel Functionalities
carouselBtn.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  })
})
