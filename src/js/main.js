// Import SCSS so Vite compiles it
import '../scss/style.scss';
import * as bootstrap from 'bootstrap';

// Scroll trigger: pop emojis when icon comes into viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

const funIcons = document.querySelectorAll(".fun-icon");

window.addEventListener("scroll", () => {
  funIcons.forEach(icon => {
    if (isInViewport(icon) && !icon.classList.contains("animated")) {
      icon.classList.add("animated");

      // Create a pop emoji
      const emoji = document.createElement("div");
      emoji.className = "pop-emoji";
      emoji.textContent = icon.dataset.emoji || "🎉";
      document.body.appendChild(emoji);

      const rect = icon.getBoundingClientRect();
      emoji.style.left = rect.left + rect.width/2 + "px";
      emoji.style.top = rect.top + "px";

      // Remove emoji after animation
      setTimeout(() => {
        emoji.remove();
      }, 1500);
    }
  });
});

// Optional: click interaction for humor
funIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    alert(`You clicked the ${icon.dataset.emoji} icon! 😂`);
  });
});

// Add/remove class based on scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 50) { // change 50 to adjust when background appears
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const heroVideo = document.getElementById('heroVideo');

setTimeout(() => {
  heroVideo.pause();   // stop the video
  heroVideo.currentTime = 0; // optional: reset to start
}, 15000); // 15000ms = 15 seconds

// Persistent YouTube-style likes with one-click per visitor
document.querySelectorAll('.btn-like').forEach(button => {
  const cardKey = button.getAttribute('data-card');
  const icon = button.querySelector('.like-icon');
  const count = button.querySelector('.like-count');

  // Load existing like count from localStorage
  let storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
  if (storedLikes[cardKey]) {
    count.textContent = storedLikes[cardKey].count;
    if (storedLikes[cardKey].clicked) {
      button.classList.add('active');
      button.disabled = true; // user cannot click twice
    }
  }

  button.addEventListener('click', () => {
    if (button.disabled) return; // prevent multiple clicks

    // Increment count
    let current = parseInt(count.textContent) + 1;
    count.textContent = current;

    // Add active state & animation
    button.classList.add('active');
    icon.style.animation = 'pop 0.3s ease';
    count.style.animation = 'pop 0.3s ease';

    // Store in localStorage
    storedLikes[cardKey] = { count: current, clicked: true };
    localStorage.setItem('likes', JSON.stringify(storedLikes));

    // Disable button after click
    button.disabled = true;

    // Remove pop animation after 300ms
    setTimeout(() => {
      icon.style.animation = '';
      count.style.animation = '';
    }, 300);
  });
});

button.classList.add('active'); // this keeps background filled
button.disabled = true;         // prevents multiple clicks

// Scroll reveal observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fade-in-left, .fade-in-right')
  .forEach(el => observer.observe(el));


const counters = document.querySelectorAll('.counter');

const options = {
  threshold: 0.5
};

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;

        const updateCount = () => {
          const current = +counter.innerText;
          if(current < target){
            counter.innerText = Math.ceil(current + increment);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
        obs.unobserve(counter); // stop counting after visible
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

document.addEventListener("DOMContentLoaded", () => {

  const typedCode = document.getElementById("typed-code");

  if (!typedCode) return; // Prevent errors if element not found

  const codeText = `const system = {
  performance: "optimized",
  scalability: "enterprise-ready",
  security: true,
  stack: ["HTML", "CSS", "JS", "Linux", "WordPress"]
};

function buildSolution(client) {
  return {
    architecture: "modern",
    speed: "high-performance",
    result: "digital excellence"
  };
};`;

  let index = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!isDeleting) {
      typedCode.textContent = codeText.substring(0, index++);
      if (index > codeText.length) {
        setTimeout(() => isDeleting = true, 1500);
      }
    } else {
      typedCode.textContent = codeText.substring(0, index--);
      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(typeLoop, isDeleting ? 15 : 20);
  }

  typeLoop();

});