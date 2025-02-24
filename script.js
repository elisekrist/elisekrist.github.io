document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const { target } = event;

    // Håndter lukking av vinduer
    if (target.matches(".window__close-button")) {
      const parentDiv = target.closest(".window");
      if (parentDiv) {
        const id = parentDiv.id;
        if (id === "main-menu" || id === "easter-egg") {
          parentDiv.classList.toggle("show");
        } else {
          parentDiv.remove();
        }
      }
    }

    // Håndter åpning/lukking av spesifikke elementer
    if (target.matches("#menu-button, #easter-egg-button")) {
      const popupId = target.id === "menu-button" ? "main-menu" : "easter-egg";
      document.getElementById(popupId).classList.toggle("show");
    }
  });

  // Dark mode
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = themeToggle.querySelector(".action-button__content");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");

    if (theme === "dark") {
      themeText.textContent = "☀️ Lyst modus";
      themeToggle.setAttribute("aria-label", "Bytt til lyst tema");
    } else {
      themeText.textContent = "🌙 Mørkt modus";
      themeToggle.setAttribute("aria-label", "Bytt til mørkt tema");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  themeToggle.addEventListener("click", function () {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
