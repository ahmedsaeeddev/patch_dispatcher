document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  
    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
  
    if (dots.length > 0) {
      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          const index = this.getAttribute("data-index")
  
          // Hide all testimonials
          testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active")
          })
  
          // Remove active class from all dots
          dots.forEach((dot) => {
            dot.classList.remove("active")
          })
  
          // Show selected testimonial
          testimonials[index].classList.add("active")
          this.classList.add("active")
        })
      })
  
      // Auto rotate testimonials
      let currentIndex = 0
      const testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length
  
        // Hide all testimonials
        testimonials.forEach((testimonial) => {
          testimonial.classList.remove("active")
        })
  
        // Remove active class from all dots
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        // Show next testimonial
        testimonials[currentIndex].classList.add("active")
        dots[currentIndex].classList.add("active")
      }, 5000)
    }
  
    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll(".accordion-header")
  
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const accordionItem = this.parentElement
        accordionItem.classList.toggle("active")
  
        // Update the icon
        const icon = this.querySelector(".accordion-icon")
        if (accordionItem.classList.contains("active")) {
          icon.textContent = "−"
        } else {
          icon.textContent = "+"
        }
      })
    })
  
    // Form Validation
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
  
        // Reset error messages
        const errorMessages = document.querySelectorAll(".error-message")
        errorMessages.forEach((message) => {
          message.textContent = ""
        })
  
        // Validate name
        const name = document.getElementById("name")
        if (name.value.trim() === "") {
          document.getElementById("nameError").textContent = "Please enter your name"
          isValid = false
        }
  
        // Validate email
        const email = document.getElementById("email")
        if (email.value.trim() === "") {
          document.getElementById("emailError").textContent = "Please enter your email"
          isValid = false
        } else if (!isValidEmail(email.value)) {
          document.getElementById("emailError").textContent = "Please enter a valid email address"
          isValid = false
        }
  
        // Validate phone (optional)
        const phone = document.getElementById("phone")
        if (phone.value.trim() !== "" && !isValidPhone(phone.value)) {
          document.getElementById("phoneError").textContent = "Please enter a valid phone number"
          isValid = false
        }
  
        // Validate subject
        const subject = document.getElementById("subject")
        if (subject.value.trim() === "") {
          document.getElementById("subjectError").textContent = "Please enter a subject"
          isValid = false
        }
  
        // Validate message
        const message = document.getElementById("message")
        if (message.value.trim() === "") {
          document.getElementById("messageError").textContent = "Please enter your message"
          isValid = false
        }
  
        // If form is valid, show success message
        if (isValid) {
          const formSuccess = document.getElementById("formSuccess")
          formSuccess.style.display = "block"
          formSuccess.textContent = "Thank you! Your message has been sent successfully."
  
          // Reset form
          contactForm.reset()
  
          // Hide success message after 5 seconds
          setTimeout(() => {
            formSuccess.style.display = "none"
          }, 5000)
        }
      })
    }
  
    // Email validation helper function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    // Phone validation helper function
    function isValidPhone(phone) {
      const phoneRegex = /^[\d\s\-$$$$]+$/
      return phoneRegex.test(phone)
    }
  
    // Scroll to top button
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        if (!document.querySelector(".scroll-top")) {
          const scrollBtn = document.createElement("button")
          scrollBtn.classList.add("scroll-top")
          scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
          document.body.appendChild(scrollBtn)
  
          scrollBtn.addEventListener("click", () => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          })
        }
      } else {
        const scrollBtn = document.querySelector(".scroll-top")
        if (scrollBtn) {
          scrollBtn.remove()
        }
      }
    })
  })
  
  