// DOM Elements
const body = document.body
const themeToggle = document.getElementById("theme-toggle")
const themeToggleIcon = themeToggle.querySelector("i")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link")
const navLinks = document.querySelectorAll(".nav-link")
const backToTopButton = document.getElementById("back-to-top")
const contactForm = document.getElementById("contact-form")
const toast = document.getElementById("toast")
const toastClose = document.querySelector(".toast-close")
const currentYearSpan = document.getElementById("current-year")
const heroCanvas = document.getElementById("hero-canvas")

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear()

// Check for saved theme preference or use system preference
function getThemePreference() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// Apply theme
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode")
    themeToggleIcon.classList.remove("fa-moon")
    themeToggleIcon.classList.add("fa-sun")
  } else {
    body.classList.remove("dark-mode")
    themeToggleIcon.classList.remove("fa-sun")
    themeToggleIcon.classList.add("fa-moon")
  }
  localStorage.setItem("theme", theme)
}

// Initialize theme
applyTheme(getThemePreference())

// Theme toggle event
themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light"
  const newTheme = currentTheme === "light" ? "dark" : "light"
  applyTheme(newTheme)
})

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")

  // Toggle hamburger animation
  const spans = mobileMenuToggle.querySelectorAll("span")
  if (mobileMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking a link
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    const spans = mobileMenuToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })

      mobileMenuLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Back to top button visibility
function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
}

// Scroll event listeners
window.addEventListener("scroll", () => {
  setActiveNavLink()
  toggleBackToTopButton()
  animateOnScroll()
})

// Back to top button click event
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // In a real application, you would send this data to a server
  console.log("Form submitted:", { name, email, message })

  // Show success message
  showToast("Message sent successfully!")

  // Reset form
  contactForm.reset()
})

// Toast notification
function showToast(message) {
  const toastMessage = document.querySelector(".toast-message")
  toastMessage.textContent = message
  toast.classList.add("show")

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideToast()
  }, 5000)
}

function hideToast() {
  toast.classList.remove("show")
}

// Close toast on click
toastClose.addEventListener("click", hideToast)

// Animate elements on scroll
function animateOnScroll() {
  const animatedElements = document.querySelectorAll("[data-aos]")

  animatedElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight * 0.85) {
      element.classList.add("aos-animate")
    }
  })
}

// Initialize animations on load
window.addEventListener("load", animateOnScroll)

// Hero canvas animation
function initHeroCanvas() {
  if (!heroCanvas) return

  const ctx = heroCanvas.getContext("2d")
  heroCanvas.width = heroCanvas.parentElement.offsetWidth
  heroCanvas.height = heroCanvas.parentElement.offsetHeight

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * heroCanvas.width
      this.y = Math.random() * heroCanvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > heroCanvas.width) this.x = 0
      else if (this.x < 0) this.x = heroCanvas.width
      if (this.y > heroCanvas.height) this.y = 0
      else if (this.y < 0) this.y = heroCanvas.height
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particlesArray = []
  const numberOfParticles = 50

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height)

    // Draw and update particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    // Draw connections
    connectParticles()

    requestAnimationFrame(animate)
  }

  // Connect particles with lines
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1000})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Start animation
  animate()

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    heroCanvas.width = heroCanvas.parentElement.offsetWidth
    heroCanvas.height = heroCanvas.parentElement.offsetHeight
  })
}
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        alert("you can't save Fauwaz Portfolio. download the resume");
    }
});

// Initialize hero canvas
initHeroCanvas()
