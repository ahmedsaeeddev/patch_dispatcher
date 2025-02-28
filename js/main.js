// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all common functionality
  initThemeToggle();
  initMobileMenu();
  initLazyLoading();
  initCustomCursor();
  initPageTransitions();
  initAccessibilityPanel();
  initSectionReveal();
  initLanguageSelector();
  initFaqAccordion();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  themeToggle.addEventListener('click', function() {
    // Toggle theme classes
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    
    // Toggle icon
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save preference
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    
    // Add animation class
    body.classList.add('theme-transition');
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 1000);
  });
}

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Lazy Loading Images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-load');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load if src is already set
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.src;
      img.classList.add('loaded');
    });
  }
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  
  // Check if device has touch capability
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    return;
  }
  
  cursor.classList.add('active');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-card, .patch-card, .gallery-item, .faq-question');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// Page Transitions
function initPageTransitions() {
  const links = document.querySelectorAll('a[href^="index"], a[href^="about"], a[href^="services"], a[href^="contact"]');
  const pageTransition = document.querySelector('.page-transition');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if modifier keys are pressed
      if (e.metaKey || e.ctrlKey) return;
      
      e.preventDefault();
      
      // Animate transition
      pageTransition.classList.add('active');
      
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
  
  // Hide transition overlay when page loads
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      pageTransition.classList.remove('active');
    }
  });
  
  // Hide transition overlay after page load
  window.addEventListener('load', function() {
    setTimeout(() => {
      pageTransition.classList.remove('active');
    }, 500);
  });
}

// Accessibility Panel
function initAccessibilityPanel() {
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  const accessibilityPanel = document.querySelector('.accessibility-panel');
  const highContrastToggle = document.getElementById('high-contrast');
  const textToSpeechToggle = document.getElementById('text-to-speech');
  const decreaseFontBtn = document.getElementById('decrease-font');
  const resetFontBtn = document.getElementById('reset-font');
  const increaseFontBtn = document.getElementById('increase-font');
  
  // Toggle panel visibility
  accessibilityToggle.addEventListener('click', function() {
    accessibilityPanel.classList.toggle('active');
  });
  
  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (!accessibilityPanel.contains(e.target) && e.target !== accessibilityToggle) {
      accessibilityPanel.classList.remove('active');
    }
  });
  
  // High Contrast Mode
  highContrastToggle.addEventListener('change', function() {
    document.body.classList.toggle('high-contrast', this.checked);
    localStorage.setItem('high-contrast', this.checked ? 'enabled' : 'disabled');
  });
  
  // Text to Speech
  textToSpeechToggle.addEventListener('change', function() {
    if (this.checked) {
      enableTextToSpeech();
    } else {
      disableTextToSpeech();
    }
    localStorage.setItem('text-to-speech', this.checked ? 'enabled' : 'disabled');
  });
  
  // Font Size Controls
  decreaseFontBtn.addEventListener('click', function() {
    changeFontSize(-1);
  });
  
  resetFontBtn.addEventListener('click', function() {
    resetFontSize();
  });
  
  increaseFontBtn.addEventListener('click', function() {
    changeFontSize(1);
  });
  
  // Load saved accessibility preferences
  loadAccessibilityPreferences();
}

// Text to Speech Functionality
function enableTextToSpeech() {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a');
  
  textElements.forEach(el => {
    el.addEventListener('mouseenter', speakText);
  });
}

function disableTextToSpeech() {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a');
  
  textElements.forEach(el => {
    el.removeEventListener('mouseenter', speakText);
  });
  
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function speakText(e) {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    
    const text = e.target.textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    
    window.speechSynthesis.speak(utterance);
  }
}

// Font Size Controls
function changeFontSize(direction) {
  const html = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(html).fontSize);
  const newSize = currentSize + (direction * 2);
  
  // Limit font size changes
  if (newSize >= 12 && newSize <= 24) {
    html.style.fontSize = newSize + 'px';
    localStorage.setItem('font-size', newSize);
  }
}

function resetFontSize() {
  document.documentElement.style.fontSize = '16px';
  localStorage.setItem('font-size', 16);
}

// Load Accessibility Preferences
function loadAccessibilityPreferences() {
  const highContrastToggle = document.getElementById('high-contrast');
  const textToSpeechToggle = document.getElementById('text-to-speech');
  
  // High Contrast
  if (localStorage.getItem('high-contrast') === 'enabled') {
    highContrastToggle.checked = true;
    document.body.classList.add('high-contrast');
  }
  
  // Text to Speech
  if (localStorage.getItem('text-to-speech') === 'enabled') {
    textToSpeechToggle.checked = true;
    enableTextToSpeech();
  }
  
  // Font Size
  const savedFontSize = localStorage.getItem('font-size');
  if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize + 'px';
  }
}

// Section Reveal Animation
function initSectionReveal() {
  const revealSections = document.querySelectorAll('.reveal-section');
  
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealSections.forEach(section => {
      section.classList.add('active');
    });
  }
}

// Multi-language Support
function initLanguageSelector() {
  const languageSelect = document.getElementById('language-select');
  
  // Load saved language preference
  const savedLanguage = localStorage.getItem('language') || 'en';
  languageSelect.value = savedLanguage;
  
  // Apply translations on page load
  applyTranslations(savedLanguage);
  
  // Change language when selector changes
  languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    applyTranslations(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  });
}

// Apply translations based on selected language
function applyTranslations(language) {
  fetch(`js/translations/${language}.json`)
    .then(response => {
      // If the file doesn't exist, use English as fallback
      if (!response.ok) {
        return fetch('js/translations/en.json');
      }
      return response;
    })
    .then(response => response.json())
    .then(translations => {
      const elements = document.querySelectorAll('[data-translate-key]');
      
      elements.forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[key]) {
          element.textContent = translations[key];
        }
      });
    })
    .catch(error => {
      console.error('Error loading translations:', error);
    });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}
