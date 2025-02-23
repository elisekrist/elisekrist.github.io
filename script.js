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
});
