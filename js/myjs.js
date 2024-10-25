var partnerSwiper = new Swiper(".partnerswiper", {
    slidesPerView: 2,
    speed: 1500,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000, // Adjust the delay to control how fast the slides change (in milliseconds)
        disableOnInteraction: false, // Allow autoplay to continue even after user interactions
    },
    breakpoints: {
        1100: {
            slidesPerView: 6,
        },
        900: {
            slidesPerView: 4,
        },
        576: {
            slidesPerView: 3,
        },
    },
});

// my counters 

// Function to animate the count for each milestone
function animateCount(elementId, start, end, duration) {
    let startTimestamp = null; // Initialize the start timestamp
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp; // Set start timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1); // Calculate progress
      document.getElementById(elementId).textContent = Math.floor(progress * (end - start) + start); // Update count
      if (progress < 1) {
        window.requestAnimationFrame(step); // Continue animation until complete
      }
    };
    window.requestAnimationFrame(step); // Start the animation
  }

  // Call animateCount for each milestone
  animateCount('count1', 0, 100, 2000); // Animate count for Lines of code
  animateCount('count2', 0, 100, 2000); // Animate count for Satisfaction rate
  animateCount('count3', 0, 100, 2000); // Animate count for Loved by
  animateCount('count4', 0, 100, 2000); // Animate count for Projects completed