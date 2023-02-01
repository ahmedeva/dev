"use strict";

/*__________________ */
// REVEAL SECTIONS
/*__________________ */

const allSections = document.querySelectorAll("[data-section]");
const revealSections = function (entries, observer) {
  const [entry] = entries;
  //  GUARD CLAUSE
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};
const obsOptions = {
  root: null,
  threshold: 0.2,
};
const sectionsObserver = new IntersectionObserver(revealSections, obsOptions);

allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add("section-hidden");
});

/*__________________ */
// NAVIGATION BUTTON
/*__________________ */

const navigationParent = document.querySelector(".navigation");
const btnNav = document.querySelector(".navigation-btn");
btnNav.addEventListener("click", function (e) {
  e.preventDefault();
  navigationParent.classList.toggle("nav-open");
});

/*__________________ */
// STICKY NAV FOR DESKTOPS
/*__________________ */

const nav = document.querySelector(".navigation");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const headerIntersect = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else if (entry.isIntersecting) nav.classList.remove("sticky");
};

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observeHeader = new IntersectionObserver(headerIntersect, headerOptions);
observeHeader.observe(header);

/*__________________ */
// TABBED COMPONENT
/*__________________ */

const btnsTab = document.querySelectorAll(".section-tabbed__btn");
const btnsContainer = document.querySelector(".section-tabbed__btns");
const contentsTab = document.querySelectorAll(".section-tabbed__content");

btnsContainer.addEventListener("click", function (e) {
  const btnTarget = e.target.closest(".section-tabbed__btn");
  if (!btnTarget) return;
  btnsTab.forEach((btn) => {
    btn.classList.remove("section-tabbed__btn--active");
    btnTarget.classList.add("section-tabbed__btn--active");
  });

  const contentTarget = document.querySelector(
    `.section-tabbed__content--${btnTarget.dataset.tab}`
  );
  contentsTab.forEach((c) => {
    c.classList.remove("section-tabbed__content--active");
    contentTarget.classList.add("section-tabbed__content--active");
  });
});

// SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slider");
  const slideContainer = document.querySelector(".slided");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  // 0% - 100% - 200% DYNAMIC
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });
  let curSlide = 0;
  // NODELISTS HAVE THE LENGTH PROPERTY JUST LIKE ARRAYS
  const maxSlide = slides.length;

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slides.forEach((s, i) => {
      // Prev 0 - 1 * 100 New 1 - 1 * 100
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    slides.forEach((s, i) => {
      // Prev 0 - 1 * 100 New 1 - 1 * 100

      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight") return;
    nextSlide();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft") return;
    prevSlide();
  });
};
slider();
/*______________*/
// ACCORDION
/*______________*/

const accordion = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion__item");

accordion.addEventListener("click", function (e) {
  const target = e.target.closest(".accordion__item");
  if (!target) return;
  if (target.classList.contains("open")) {
    target.classList.toggle("open");
  } else {
    accordionItems.forEach((item) => {
      item.classList.remove("open");
      target.classList.add("open");
    });
  }
});
