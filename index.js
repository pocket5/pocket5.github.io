// Add or rename slide images here. Files live in the "img" folder.
const SLIDES = [
  { src: "img/slide-1.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-2.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-3.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-4.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-5.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-6.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-7.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-8.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-9.webp", alt: "POCKET5 design on a tee" },
  { src: "img/slide-10.webp", alt: "POCKET5 design on a tee" }
  
];

const show = document.querySelector(".show");
const carouselEl = document.getElementById("showCarousel");
const inner = carouselEl.querySelector(".carousel-inner");
const indicators = carouselEl.querySelector(".carousel-indicators");

// Only keep slides whose image actually loads
const loadImage = ({ src, alt }) =>
  new Promise(resolve => {
    const img = new Image();
    img.alt = alt;
    img.className = "d-block w-100 h-100 object-fit-cover";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

Promise.all(SLIDES.map(loadImage)).then(results => {
  const images = results.filter(Boolean);

  if (!images.length) {
    show.querySelector(".empty").classList.remove("d-none");
    carouselEl.classList.add("d-none");
    return;
  }

  images.forEach((img, n) => {
    const item = document.createElement("div");
    item.className = "carousel-item" + (n === 0 ? " active" : "");
    item.appendChild(img);
    inner.appendChild(item);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.dataset.bsTarget = "#showCarousel";
    dot.dataset.bsSlideTo = n;
    dot.setAttribute("aria-label", "Go to slide " + (n + 1));
    if (n === 0) dot.className = "active";
    indicators.appendChild(dot);
  });

  if (images.length === 1) {
    show.classList.add("single");
    return;
  }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  new bootstrap.Carousel(carouselEl, { interval: reduceMotion ? false : 4500, ride: reduceMotion ? false : "carousel" });
});