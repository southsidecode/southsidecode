// ==========================================
// TECH MINIMAL - MAIN JAVASCRIPT
// ==========================================

// ==========================================
// 1. HIDE PRELOADER - FIXED
// ==========================================
(function hidePreloader() {
  const preloader = document.getElementById('preloader');
  
  // Function to hide preloader
  function hide() {
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }

  // Hide immediately if page is already loaded
  if (document.readyState === 'complete') {
    hide();
  } else {
    // Hide when everything loads
    window.addEventListener('load', hide);
  }
  
  // Safety fallback: Force hide after 2 seconds
  setTimeout(hide, 2000);
})();

// ==========================================
// 2. DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // ==========================================
  // THEME TOGGLE
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  
  // Check saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // ==========================================
  // MOBILE MENU - Close on link click
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const navMenu = document.getElementById('navMenu');
  
  if (navLinks.length && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
          try {
            const bsCollapse = new bootstrap.Collapse(navMenu, {
              toggle: true
            });
          } catch (error) {
            navMenu.classList.remove('show');
          }
        }
      });
    });
  }

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      if (isNaN(target)) return;
      
      const duration = 2000;
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      let step = 0;
      
      if (counter._interval) {
        clearInterval(counter._interval);
      }
      
      counter._interval = setInterval(() => {
        step++;
        current += stepValue;
        
        if (step >= steps) {
          counter.textContent = target + (target.toString().includes('%') ? '' : '+');
          clearInterval(counter._interval);
        } else {
          counter.textContent = Math.round(current) + (target.toString().includes('%') ? '' : '+');
        }
      }, duration / steps);
    });
  }

  // Trigger counters after delay
  setTimeout(animateCounters, 600);

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Close mobile menu first
          if (navMenu && navMenu.classList.contains('show')) {
            try {
              const bsCollapse = new bootstrap.Collapse(navMenu, {
                toggle: true
              });
            } catch (error) {
              navMenu.classList.remove('show');
            }
          }
          
          // Smooth scroll to target
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      }
    });
  });

  // ==========================================
  // CONTACT FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you within 24 hours.');
      this.reset();
    });
  }

  // ==========================================
  // KEYBOARD ACCESSIBILITY - Close menu on ESC
  // ==========================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
      try {
        const bsCollapse = new bootstrap.Collapse(navMenu, {
          toggle: true
        });
      } catch (error) {
        navMenu.classList.remove('show');
      }
    }
  });

  // ==========================================
  // CONSOLE WELCOME
  // ==========================================
  console.log('%c🚀 Tech Minimal', 'font-size: 24px; font-weight: bold; color: #00ff9d;');
  console.log('%c✅ Website loaded successfully!', 'color: #00ff9d;');

}); // End DOMContentLoaded

