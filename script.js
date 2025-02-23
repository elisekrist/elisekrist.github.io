document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".window__close-button")) {
      const parentDiv = event.target.closest(".window");
      if (parentDiv) {
        if (parentDiv.matches("#main-menu")) {
          var popup = document.getElementById("main-menu");
          popup.classList.toggle("show");
        } else if (parentDiv.matches("#easter-egg")) {
          var popup = document.getElementById("easter-egg");
          popup.classList.toggle("show");
        } else {
          parentDiv.remove();
        }
      }
    }
    if (event.target.matches("#menu-button")) {
      var popup = document.getElementById("main-menu");
      popup.classList.toggle("show");
    }
    if (event.target.matches("#easter-egg-button")) {
      var popup = document.getElementById("easter-egg");
      popup.classList.toggle("show");
    }
  });

  // Darkmode

  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }

  // Sjekk om brukeren har en lagret preferanse
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Bruk systeminnstillingene hvis ingen preferanse er lagret
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }

  // Lytt etter endringer i systeminnstillingene
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
  });
});
