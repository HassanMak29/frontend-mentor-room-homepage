const imagesTrack = document.querySelector(".hero-img ul");
const slides = Array.from(imagesTrack.children);
const infoTrack = document.querySelector(".main-info ul");
const infoSlides = Array.from(infoTrack.children);
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const burgerMenu = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close");
const nav = document.querySelector("nav ul");
const overlay = document.querySelector(".overlay");

lineUpSlides(slides);
lineUpSlides(infoSlides);

window.addEventListener("resize", () => {
  lineUpSlides(infoSlides);
  lineUpSlides(slides);
});

leftBtn.addEventListener("click", () => {
  moveSlide(imagesTrack, slides, "prev");
  moveSlide(infoTrack, infoSlides, "prev");
});
rightBtn.addEventListener("click", () => {
  moveSlide(imagesTrack, slides, "next");
  moveSlide(infoTrack, infoSlides, "next");
});

burgerMenu.addEventListener("click", openNav);
closeMenu.addEventListener("click", closeNav);
overlay.addEventListener("click", closeNav);

function openNav() {
  nav.classList.add("open");
  overlay.classList.add("open");
  closeMenu.style.display = "block";
}

function closeNav() {
  nav.classList.remove("open");
  overlay.classList.remove("open");
  closeMenu.style.display = "none";
}

function moveSlide(track, slides, sibling) {
  const currentSlide = track.querySelector("[data-active]");
  const currentSlideIndex = slides.findIndex((slide) => slide === currentSlide);

  let nextSlide;
  if (sibling === "next" && currentSlideIndex === slides.length - 1)
    nextSlide = slides[0];
  else if (sibling === "prev" && currentSlideIndex === 0)
    nextSlide = slides[slides.length - 1];
  else {
    nextSlide =
      sibling === "prev"
        ? currentSlide.previousElementSibling
        : currentSlide.nextElementSibling;
  }

  const amountToMove = nextSlide.style.left;

  track.style.transform = `translateX(-${amountToMove})`;

  delete currentSlide.dataset.active;
  nextSlide.dataset.active = true;
}

function lineUpSlides(elements) {
  console.log("window resized");
  elements.forEach((el, i) => {
    if (el.style.display === "none") return;
    const elWidth = el.getBoundingClientRect().width;
    el.style.left = elWidth * i + "px";
  });
}
