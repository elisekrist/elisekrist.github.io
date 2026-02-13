document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    return;
  }
  const themeText = themeToggle.querySelector(".action-button__content");
  const isEnglish = document.documentElement.lang === "en";

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");

    if (theme === "dark") {
      themeText.textContent = isEnglish ? "☀️ Light mode" : "☀️ Lyst modus";
      themeToggle.setAttribute(
        "aria-label",
        isEnglish ? "Switch to light mode" : "Bytt til lyst tema"
      );
    } else {
      themeText.textContent = isEnglish ? "🌙 Dark mode" : "🌙 Mørkt modus";
      themeToggle.setAttribute(
        "aria-label",
        isEnglish ? "Switch to dark mode" : "Bytt til mørkt tema"
      );
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
