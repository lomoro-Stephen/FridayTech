const cardsWrap = document.querySelector(".testmonial-cards");
const prevButton = document.querySelector(".controller.prev");
const nextButton = document.querySelector(".controller.next");

// Set initial state
let scrollAmount = 0;
const cardWidth = document.querySelector(".tcard").offsetWidth + 40; // Includes gap

// Auto-scroll function
function autoScroll() {
  if (scrollAmount >= cardsWrap.scrollWidth - cardsWrap.clientWidth) {
    scrollAmount = 0; // Reset scroll to the start
  } else {
    scrollAmount += cardWidth;
  }
  cardsWrap.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

// Scroll interval (auto-scroll every 3 seconds)
let autoScrollInterval = setInterval(autoScroll, 4000);

// Manual scroll (prev and next buttons)
prevButton.addEventListener("click", () => {
  clearInterval(autoScrollInterval); // Pause auto-scroll
  scrollAmount -= cardWidth;
  if (scrollAmount < 0) scrollAmount = cardsWrap.scrollWidth - cardsWrap.clientWidth;
  cardsWrap.scrollTo({ left: scrollAmount, behavior: "smooth" });
  autoScrollInterval = setInterval(autoScroll, 3000); // Resume auto-scroll
});

nextButton.addEventListener("click", () => {
  clearInterval(autoScrollInterval); // Pause auto-scroll
  scrollAmount += cardWidth;
  if (scrollAmount >= cardsWrap.scrollWidth) scrollAmount = 0;
  cardsWrap.scrollTo({ left: scrollAmount, behavior: "smooth" });
  autoScrollInterval = setInterval(autoScroll, 3000); // Resume auto-scroll
});

// Pause auto-scroll on hover
cardsWrap.addEventListener("mouseover", () => clearInterval(autoScrollInterval));
cardsWrap.addEventListener("mouseout", () => {
  autoScrollInterval = setInterval(autoScroll, 3000);
});
