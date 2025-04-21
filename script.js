document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const { target } = event;

    // Håndter lukking av vinduer
    if (target.matches(".window__close-button")) {
      const parentDiv = target.closest(".window");
      if (parentDiv) {
        const id = parentDiv.id;
        if (
          id === "main-menu" ||
          id === "easter-egg" ||
          id === "pizza-egg" ||
          id === "possum"
        ) {
          parentDiv.classList.toggle("show");
        } else {
          parentDiv.remove();
        }
      }
    }

    if (
      target.matches(
        "#menu-button, #easter-egg-button, #pizza-egg-button, #possum-button, #possum-button-star"
      )
    ) {
      const popupId =
        target.id === "menu-button"
          ? "main-menu"
          : target.id === "easter-egg-button"
          ? "easter-egg"
          : target.id === "pizza-egg-button"
          ? "pizza-egg"
          : "possum";
      document.getElementById(popupId)?.classList.toggle("show");
    }
  });
});
