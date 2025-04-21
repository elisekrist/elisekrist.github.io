document.addEventListener("DOMContentLoaded", function () {
  // Dark mode
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = themeToggle.querySelector(".action-button__content");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");

    if (theme === "dark") {
      themeText.textContent = "☀️ Light mode";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      themeText.textContent = "🌙 Dark mode";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
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
