import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightbox__img: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};

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

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  // відкриття модального вікна
  window.addEventListener("keydown", closeByEscape);
  window.addEventListener("keydown", onKyePress);
  refs.btnClose.addEventListener("click", onModalClose);
  refs.overlay.addEventListener("click", onModalClose);

  refs.lightbox.classList.add("is-open");
  refs.lightbox__img.src = event.target.getAttribute("data-source");
  refs.lightbox__img.alt = event.target.getAttribute("alt");
}

// Закриття модального вікна
function onModalClose() {
  window.removeEventListener("keydown", closeByEscape);
  window.removeEventListener("keydown", onKyePress);
  refs.btnClose.removeEventListener("click", onModalClose);
  refs.overlay.removeEventListener("click", onModalClose);

  refs.lightbox__img.src = "";
  refs.lightbox__img.alt = "";
  refs.lightbox.classList.remove("is-open");
}

// Закриття модального вікна клавішою Escape
function closeByEscape(event) {
  if (event.code === "Escape") {
    onModalClose();
  }
}

// Прокрутка зображень клавішами ліво-право

function onKyePress(event) {
  let index = images.findIndex(
    (img) => img.original === refs.lightbox__img.src
  );

  if (event.code === "ArrowLeft") {
    if (index === 0) {
      return;
    }
    index -= 1;
  }

  if (event.code === "ArrowRight") {
    if (index === images.length - 1) {
      return;
    }
    index += 1;
  }

  refs.lightbox__img.src = images[index].original;
  refs.lightbox__img.alt = images[index].description;
}

// window.addEventListener("keydown", (event) => {
//   console.log("code:", event.code);
// });
