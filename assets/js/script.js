'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

const menuItems = [
  {
    title: 'Rotolos',
    day: '',
    price: '8,50€',
    description: "Un rouleau de pâtes farci d'épinards et de ricotta.",
    img: '../assets/images/plats_du_jours/rotolo-di-pasta.png'
  },
  {
    title: 'Lasagnes saumon épignard',
    day: 'DIMANCHE',
    price: '8,50€',
    description: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices',
    img: '../assets/images/desserts/charlotte_fruits_rouges.jpg'
  },
  {
    title: "Souris d'agneau",
    day: 'LUNDI',
    price: '14,50€',
    description: 'Une pièce tendre et savoureuse de viande d\'agneau cuite lentement, offrant une texture fondante et des saveurs riches.',
    img: '../assets/images/desserts/moelleux_chocolat.jpg'
  },
  {
    title: 'Tartelette fraise frangipane',
    day: '',
    price: '39.00€',
    description: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.',
    img: '../assets/images/desserts/tartelettes_fraise_frangipane.jpg'
  },
  {
    title: 'Tiramisu',
    day: '',
    price: '25.00€',
    description: 'Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.',
    img: '../assets/images/desserts/tiramisu.jpg'
  }
];

// Obtenir le jour actuel en français
const joursSemaine = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
const date = new Date();
const jourActuel = joursSemaine[date.getDay()];

// Générer le code HTML avec les éléments du tableau menuItems
let html = '';
menuItems.forEach((menuItem) => {
  if (menuItem.day === '' || menuItem.day.toUpperCase() === jourActuel) {
    const badgeText = (menuItem.day !== '') ? 'Plat du jour' : menuItem.day;
    html += `
      <li>
        <div class="menu-card hover:card">
          <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
            <img src="${menuItem.img}" width="100" height="100" loading="lazy" alt="${menuItem.title}" class="img-cover">
          </figure>
          <div>
            <div class="title-wrapper">
              <h3 class="title-3">
                <a href="#" class="card-title">${menuItem.title}</a>
              </h3>
              <span class="badge label-1">${badgeText}</span>
              <span class="span title-2">${menuItem.price}</span>
            </div>
            <p class="card-text label-1">
              ${menuItem.description}
            </p>
          </div>
        </div>
      </li>`;
  }
});

// Insérer le code HTML dans l'élément avec la classe "grid-list plats"
const gridListPlats = document.querySelector('.grid-list.plats');
gridListPlats.innerHTML = html;
