// Mobile menu toggle for smaller screens
const navToggle = document.querySelector(".nav-toggle");
const sideNav = document.querySelector(".side-nav");

if (navToggle && sideNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = sideNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", isOpen);
  });

  sideNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sideNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
      document.body.classList.remove("menu-open");
    });
  });
}

// Subtle fade-in on scroll
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
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
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

// Highlight the current section in the fixed menu
const navLinks = document.querySelectorAll(".side-nav a[data-section]");
const sections = document.querySelectorAll("main section[data-section]");

if ("IntersectionObserver" in window && navLinks.length && sections.length) {
  const setActiveLink = (sectionName) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === sectionName);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.dataset.section);
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-10% 0px -45% 0px",
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
