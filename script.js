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
const lines = document.querySelectorAll(".line");
const carousel = document.querySelector(".carousel");
const tableRows = document.querySelectorAll(".table-body tbody tr");
const modal = document.getElementById("event-modal");
const modalEventName = document.getElementById("modal-event-name");
const modalEventDate = document.getElementById("modal-event-date");
const modalEventDescription = document.getElementById("modal-event-description");


const slideInterval = 5000; // Auto-slide interval in milliseconds (5 seconds)
let autoSlideInterval; // To store the interval ID

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

// Carousel Functionality for the Previous/Next Buttons
carouselBtn.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
    
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    switchSlide(newIndex);
    resetAutoSlide(); // Reset the interval when user interacts
  });
});

// Function to update the lines and slides
const switchSlide = (newIndex) => {
  const slides = document.querySelector("[data-slides]");
  const activeSlide = slides.querySelector("[data-active]");
  
  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;

  // Update the lines
  updateLines(newIndex);
}

// Function to update the lines based on active slide
const updateLines = (activeIndex) => {
  lines.forEach((line, index) => {
    if (index === activeIndex) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });
}

// Add event listener to each line for switching slides
lines.forEach((line, index) => {
  line.addEventListener("click", () => {
    switchSlide(index);
    resetAutoSlide(); // Reset the interval when user interacts
  });
});

// Function to automatically slide through items
const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + 1;
    
    if (newIndex >= slides.children.length) newIndex = 0;

    switchSlide(newIndex);
  }, slideInterval);
}

// Function to reset the auto-slide interval when user interacts
const resetAutoSlide = () => {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

carousel.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval); // Pause on hover
});

carousel.addEventListener("mouseleave", () => {
  startAutoSlide(); // Resume when the mouse leaves
});

// Modal - Open and populate on row click
tableRows.forEach(row => {
  row.addEventListener('click', () => {
    const eventName = row.cells[0].textContent;
    const eventDate = row.cells[1].textContent;
    modalEventName.textContent = eventName;
    modalEventDate.textContent = eventDate;
    // Set a default or retrieved description here
    modalEventDescription.textContent = "Sample description for " + eventName;

    modal.style.display = 'flex';
  });
});

// Close modal on click of close button
document.querySelector('.close-btn').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Initial setup
updateLines(0); // Activate the first line initially
startAutoSlide(); // Start the auto-slide when the page loads
