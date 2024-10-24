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
