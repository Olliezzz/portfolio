// Mobile navigation: beginner-friendly toggle for small screens
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
      document.body.classList.remove("menu-open");
    });
  });
}

// Scroll reveal: add the .reveal class to any section or card you want to animate in
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// Back to top button: appears after some scrolling
const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  const toggleBackToTop = () => {
    const shouldShow = window.scrollY > 500;
    backToTopButton.classList.toggle("is-visible", shouldShow);
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Simple cursor follower: stays subtle and enlarges over interactive items
const cursorFollower = document.querySelector(".cursor-follower");
const interactiveItems = document.querySelectorAll("a, button, .project-card, .archive-card");

if (cursorFollower && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorFollower.style.left = `${event.clientX}px`;
    cursorFollower.style.top = `${event.clientY}px`;
  });

  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursorFollower.classList.add("is-active");
    });

    item.addEventListener("mouseleave", () => {
      cursorFollower.classList.remove("is-active");
    });
  });
}
