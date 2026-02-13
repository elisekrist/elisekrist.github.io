document.addEventListener("DOMContentLoaded", function () {
  const isEnglish = document.documentElement.lang === "en";
  const scoreHud = document.createElement("div");
  scoreHud.id = "pop-score";
  scoreHud.className = "window window--white";
  scoreHud.hidden = true;
  scoreHud.setAttribute("aria-hidden", "true");
  scoreHud.setAttribute("role", "status");
  scoreHud.setAttribute("aria-live", "polite");
  scoreHud.setAttribute("aria-atomic", "true");
  scoreHud.innerHTML = `
    <div class="window__top window__top--pink"></div>
    <div class="window__content window__content--small">
      <span class="pop-score__label">${isEnglish ? "Pop" : "Poppet"}:</span>
      <span id="pop-score-value">0</span>
    </div>
  `;
  document.body.appendChild(scoreHud);
  const scoreValue = scoreHud.querySelector("#pop-score-value");
  let popScore = 0;

  const incrementScore = () => {
    if (popScore === 0) {
      scoreHud.hidden = false;
      scoreHud.setAttribute("aria-hidden", "false");
    }
    popScore += 1;
    scoreValue.textContent = String(popScore);
  };

  const spawnSkyElement = (layer, containerClass, childElement) => {
    const newContainer = document.createElement("div");
    newContainer.className = containerClass;
    const newChild = childElement.cloneNode(false);
    newChild.textContent = childElement.textContent;
    newContainer.appendChild(newChild);
    layer.appendChild(newContainer);
    newContainer.addEventListener("click", handleClick);
  };

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

  const clouds = document.querySelectorAll(".cloud__container");
  const stars = document.querySelectorAll(".star__container");

  const handleClick = (event) => {
    const element = event.currentTarget;
    if (element.classList.contains("pop")) {
      return;
    }
    element.classList.add("pop");
    incrementScore();

    // Fjern elementet etter at animasjonen er ferdig
    element.addEventListener("animationend", () => {
      const child = element.querySelector(".cloud, .star");
      const layer = element.closest(".clouds, .stars");
      const containerClass = element.classList.contains("cloud__container")
        ? "cloud__container"
        : "star__container";
      const animationDuration = child
        ? parseFloat(getComputedStyle(child).animationDuration)
        : 0;
      const respawnDelayMs = animationDuration
        ? animationDuration * 1000
        : 2000;
      element.remove();
      if (child && layer) {
        window.setTimeout(() => {
          spawnSkyElement(layer, containerClass, child);
        }, respawnDelayMs);
      }
    });
  };

  clouds.forEach((cloud) => cloud.addEventListener("click", handleClick));
  stars.forEach((star) => star.addEventListener("click", handleClick));

  // Kjedelig modus
  const simpleModeButton = document.getElementById("simple-mode-button");

  // Sjekk om simple mode er lagret fra før
  if (localStorage.getItem("simpleMode") === "on") {
    document.body.classList.add("simple-mode");
  }

  simpleModeButton.addEventListener("click", () => {
    document.body.classList.toggle("simple-mode");
    if (document.body.classList.contains("simple-mode")) {
      localStorage.setItem("simpleMode", "on");
    } else {
      localStorage.removeItem("simpleMode");
    }
  });
});
