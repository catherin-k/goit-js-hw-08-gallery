import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightbox__img: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};
console.log(refs.overlay);
// Створення розмітки по шаблону

const makeGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
    <a class="gallery__link" href=${original}>
  <img class="gallery__image"
  src=  ${preview} data-source=${original}
  alt=${description} /></a></li>`;

const galleryListMarkup = images.reduce(
  (acc, img) => acc + makeGalleryItem(img),
  ""
);
refs.gallery.innerHTML = galleryListMarkup;

// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.

refs.gallery.addEventListener("click", onGalleryClick);
refs.btnClose.addEventListener("click", onModalClose);
refs.overlay.addEventListener("click", onModalClose);
window.addEventListener("keydown", closeByEscape);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  // відкриття модального вікна
  refs.lightbox.classList.add("is-open");
  refs.lightbox__img.src = event.target.getAttribute("data-source");
}

function onModalClose(event) {
  refs.lightbox__img.src = "";
  refs.lightbox.classList.remove("is-open");
}

// Закриття модального вікна клавішою Escape
function closeByEscape(event) {
  if (event.code === "Escape") {
    refs.lightbox.classList.remove("is-open");
  }
}

console.dir(onGalleryClick);
