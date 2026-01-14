/* ============================================================
   THE 5 LOTUS — PREMIUM JS
   Fixes:
   - Carousel (auto + dots + manual)
   - Modal (centered + smooth animation)
   - Qualifications toggle
   - Mobile menu
   ============================================================ */


/* ===========================
   MOBILE MENU
=========================== */

const burger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (burger) {
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
}

document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        mobileMenu.classList.remove("active");
    }
});


/* ===========================
   QUALIFICATIONS EXPAND / COLLAPSE
=========================== */

document.querySelectorAll(".qualifications-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".team-card");
        const list = card.querySelector(".qualifications-list");
        const isVisible = list.style.display === "block";

        list.style.display = isVisible ? "none" : "block";
        btn.textContent = isVisible ? "View Qualifications" : "Hide Qualifications";
    });
});


/* ============================================================
   MODAL — PERFECT CENTER + SMOOTH
   (Used on Team Page)
============================================================ */

const modalOverlay = document.querySelector(".modal-overlay");

if (modalOverlay) {
    const modalContent = modalOverlay.querySelector(".modal-content");
    const modalClose = modalOverlay.querySelector(".modal-close");

    // OPEN buttons
    document.querySelectorAll("[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
            modalOverlay.classList.add("open");
            document.body.classList.add("modal-open");
        });
    });

    // CLOSE button
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modalOverlay.classList.remove("open");
            document.body.classList.remove("modal-open");
        });
    }

    // CLICK outside modal closes it
    modalOverlay.addEventListener("click", (e) => {
        if (!modalContent.contains(e.target)) {
            modalOverlay.classList.remove("open");
            document.body.classList.remove("modal-open");
        }
    });
}



/* ============================================================
   PREMIUM AUTO CAROUSEL
============================================================ */

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".carousel-dots .dot");

let index = 0;
let interval;

function updateCarousel() {
    if (!track || slides.length === 0) return;

    track.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function autoSlide() {
    interval = setInterval(() => {
        index = (index + 1) % slides.length;
        updateCarousel();
    }, 3500);
}

// DOT CLICK
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        clearInterval(interval);
        autoSlide();
    });
});

// Initialize
if (slides.length > 0) {
    updateCarousel();
    autoSlide();
}


/* ============================================================
   SMOOTH PAGE-FADE ON LOAD (For About/Services)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".page-hero");
    if (hero) {
        hero.style.opacity = 1;
        hero.style.transform = "translateY(0)";
    }
});

