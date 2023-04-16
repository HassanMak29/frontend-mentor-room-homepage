const imagesTrack = document.querySelector(".hero-img ul");
const slides = Array.from(imagesTrack.children);
const infoTrack = document.querySelector(".main-info ul");
const infoSlides = Array.from(infoTrack.children);
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

lineSlides(slides);
lineSlides(infoSlides);

leftBtn.addEventListener("click", () => {
  moveSlide(imagesTrack, slides, "prev");
  moveSlide(infoTrack, infoSlides, "prev");
});
rightBtn.addEventListener("click", () => {
  moveSlide(imagesTrack, slides, "next");
  moveSlide(infoTrack, infoSlides, "next");
});

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

function lineSlides(elements) {
  elements.forEach((el, i) => {
    const elWidth = el.getBoundingClientRect().width;
    el.style.left = elWidth * i + "px";
  });
}
