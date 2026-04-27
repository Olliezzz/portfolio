// Mobile menu toggle for smaller screens
const navToggle = document.querySelector(".nav-toggle");
const sideNav = document.querySelector(".side-nav");

if (navToggle && sideNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = sideNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "×" : "+";
    document.body.classList.toggle("menu-open", isOpen);
  });

  sideNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sideNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "+";
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
  const visibleSections = new Map();

  const setActiveLink = (sectionName) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === sectionName);
    });
  };

  const updateActiveSection = () => {
    let activeSection = "";
    let highestRatio = 0;

    visibleSections.forEach((ratio, sectionName) => {
      if (ratio > highestRatio) {
        highestRatio = ratio;
        activeSection = sectionName;
      }
    });

    if (activeSection) {
      setActiveLink(activeSection);
    }
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionName = entry.target.dataset.section;

        if (entry.isIntersecting) {
          visibleSections.set(sectionName, entry.intersectionRatio);
        } else {
          visibleSections.delete(sectionName);
        }
      });

      updateActiveSection();
    },
    {
      threshold: [0.15, 0.3, 0.5, 0.7],
      rootMargin: "-35% 0px -35% 0px",
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  setActiveLink("about");
}

// Small tap-state helper so case hover styling can also appear on touch devices
const caseBlocks = document.querySelectorAll(".case-block");

caseBlocks.forEach((block) => {
  block.addEventListener("touchstart", () => {
    caseBlocks.forEach((item) => {
      if (item !== block) {
        item.classList.remove("is-tapped");
      }
    });

    block.classList.add("is-tapped");
  }, { passive: true });

  block.addEventListener("touchend", () => {
    window.setTimeout(() => {
      block.classList.remove("is-tapped");
    }, 220);
  }, { passive: true });
});
