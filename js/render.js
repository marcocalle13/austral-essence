window.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".slider-track");
  const btnRight = document.querySelector(".slider-btn-right");
  const btnLeft = document.querySelector(".slider-btn-left");
  const sliderWindow = document.querySelector(".slider-window");

  let startIndex = 0;
  let cardsPerPage = 3; // Valor por defecto para desktop
  let allCards = [];
  let isAnimating = false;

  // Función para determinar cuántas cartas mostrar según el ancho de pantalla
  function getCardsPerPage() {
    const width = window.innerWidth;
    if (width < 544) {
      // 34em = 544px (asumiendo 16px de font-size base)
      return 1;
    } else if (width < 768) {
      return 2;
    } else {
      return 3;
    }
  }

  // Crear todas las cartas y guardarlas como elementos HTML
  function createAllCards() {
    allCards = perfumesMen.map((perfume) => {
      const article = document.createElement("article");
      article.className = "service-card";
      article.innerHTML = `
        <img
          src="${perfume.image}"
          alt="${perfume.name}"
          class="service-img"
        />
        <div class="service-content">
          <h3 class="service-title">${perfume.name}</h3>
          <p class="service-subtitle">${perfume.brand}</p>
          <p class="perfum-price">$${perfume.price}</p>
          <ul class="perfum-attributes">
            <br />
            <li class="perfum-attribute">
              <ion-icon class="perfum-icon" name="trophy-outline"></ion-icon>
              <span>${perfume.capacity}</span>
            </li>
            <li class="perfum-attribute">
              <ion-icon class="perfum-icon" name="time-outline"></ion-icon>
              <span>Duración ${perfume.duration}</span>
            </li>
            <li class="perfum-attribute">
              <ion-icon class="perfum-icon" name="home-outline"></ion-icon>
              <span>Entrega incluida</span>
            </li>
          </ul>
        </div>
      `;
      return article;
    });
  }

  function renderCards(direction = 0) {
    // Limpiar el track
    sliderTrack.innerHTML = "";

    // Obtener el número actual de cartas por página
    cardsPerPage = getCardsPerPage();

    // Añadir solo las cartas visibles
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < cardsPerPage; i++) {
      const index = (startIndex + i) % allCards.length;
      const clone = allCards[index].cloneNode(true);

      // Añadir efecto de entrada
      if (direction !== 0) {
        clone.style.opacity = "0";
        clone.style.transform = `translateX(${direction * 30}px)`;
      }

      fragment.appendChild(clone);
    }

    sliderTrack.appendChild(fragment);

    // Animar entrada de las cartas si hay dirección
    if (direction !== 0) {
      const cards = sliderTrack.querySelectorAll(".service-card");
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
          card.style.opacity = "1";
          card.style.transform = "translateX(0)";
        }, index * 100);
      });
    }
  }

  function nextCards() {
    if (isAnimating) return;
    isAnimating = true;

    cardsPerPage = getCardsPerPage();
    startIndex = (startIndex + cardsPerPage) % allCards.length;
    renderCards(-1);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function previousCards() {
    if (isAnimating) return;
    isAnimating = true;

    cardsPerPage = getCardsPerPage();
    startIndex =
      (startIndex - cardsPerPage + allCards.length) % allCards.length;
    renderCards(1);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Recalcular cuando se redimensione la ventana
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newCardsPerPage = getCardsPerPage();
      if (newCardsPerPage !== cardsPerPage) {
        cardsPerPage = newCardsPerPage;
        // Asegurar que el índice no sea mayor que el total
        if (startIndex >= allCards.length) {
          startIndex = 0;
        }
        renderCards(0);
      }
    }, 250);
  }

  // Inicializar
  createAllCards();
  cardsPerPage = getCardsPerPage();
  renderCards(0);

  // Event listeners
  btnRight.addEventListener("click", nextCards);
  btnLeft.addEventListener("click", previousCards);
  window.addEventListener("resize", handleResize);
});
