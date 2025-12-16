// Apply saved theme preference as early as possible
(() => {
  const html = document.documentElement;
  const currentTheme = localStorage.getItem("theme") || "light";
  html.classList.toggle("dark", currentTheme === "dark");
})();

// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (!themeToggle) return;

  // Set initial icon visibility
  const updateIcons = () => {
    if (html.classList.contains("dark")) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  };

  updateIcons();

  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    const newTheme = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    updateIcons();
  });

  // Mobile drawer toggle
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const mobileDrawerClose = document.getElementById("mobileDrawerClose");

  if (mobileToggle && mobileDrawer && mobileBackdrop) {
    const openDrawer = () => {
      mobileDrawer.classList.add("open");
      mobileDrawer.setAttribute("aria-hidden", "false");
      mobileBackdrop.classList.add("show");
      mobileBackdrop.hidden = false;
      // prevent body scroll
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("aria-hidden", "true");
      mobileBackdrop.classList.remove("show");
      mobileBackdrop.hidden = true;
      document.body.style.overflow = "";
    };

    mobileToggle.addEventListener("click", openDrawer);
    mobileDrawerClose &&
      mobileDrawerClose.addEventListener("click", closeDrawer);
    mobileBackdrop.addEventListener("click", closeDrawer);

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        closeDrawer();
      }
    });

    // Close when clicking a mobile link
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => closeDrawer());
    });
  }
});
