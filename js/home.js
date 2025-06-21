document.addEventListener("DOMContentLoaded", () => {
  // Initialize home page specific functionality
  initLocalTimeDisplay()
  initTestimonialsSlider()
})

// Display local time
function initLocalTimeDisplay() {
  const localTimeElement = document.getElementById("local-time")

  if (localTimeElement) {
    updateLocalTime()

    // Update time every minute
    setInterval(updateLocalTime, 60000)
  }
}

function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time")
  const now = new Date()

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }

  localTimeElement.textContent = now.toLocaleTimeString(undefined, options)
}

// Testimonials Slider
function initTestimonialsSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".testimonial-dots .dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")

  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  // Start auto-sliding
  startSlideInterval()

  // Previous button click
  prevBtn.addEventListener("click", () => {
    clearInterval(slideInterval)
    changeSlide(currentSlide - 1)
    startSlideInterval()
  })

  // Next button click
  nextBtn.addEventListener("click", () => {
    clearInterval(slideInterval)
    changeSlide(currentSlide + 1)
    startSlideInterval()
  })

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(index)
      startSlideInterval()
    })
  })

  function changeSlide(index) {
    // Handle index bounds
    if (index < 0) {
      index = slides.length - 1
    } else if (index >= slides.length) {
      index = 0
    }

    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Set new current slide
    currentSlide = index

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  function startSlideInterval() {
    // Auto-slide every 5 seconds
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1)
    }, 5000)
  }
}

