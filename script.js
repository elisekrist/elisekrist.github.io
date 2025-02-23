document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    const { target } = event;

    if (target.matches(".window__close-button")) {
      const parentDiv = target.closest(".window");
      if (parentDiv) {
        if (parentDiv.id === "main-menu" || parentDiv.id === "easter-egg") {
          parentDiv.classList.toggle("show");
        } else {
          parentDiv.remove();
        }
      }
    }

    if (target.matches("#menu-button, #easter-egg-button")) {
      document.getElementById(target.dataset.target).classList.toggle("show");
    }
  });

  // Dark mode
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || (prefersDark.matches ? "dark" : "light"));

  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
