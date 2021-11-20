"use strict";

const headerBtn = document.getElementById("header-btn"),
  menu = document.querySelector(".menu-js"),
  rightBlock = document.querySelector(".right-block-js"),
  rangeA = document.getElementById("rangeA"),
  rangeB = document.getElementById("rangeB"),
  aboutContent = document.querySelectorAll(".about-js"),
  reviews = document.querySelectorAll(".reviews-js");

// Мобильный Header
headerBtn.addEventListener("click", () => activeMenu());
function activeMenu() {
  menu.classList.toggle("navActive");
  rightBlock.classList.toggle("navActive");
}

// открывающийся список
aboutContent.forEach((elem) => {
  elem.addEventListener("click", () => aboutActiveContent(elem));
});

function aboutActiveContent(elem) {
  let content = document.querySelectorAll(".about-content-js");
  content.forEach((item) => {
    if (item.dataset.id === elem.dataset.id) {
      item.classList.toggle("show");
    } else {
      item.classList.remove("show");
    }
  });
}

// REVIEWS
const star = "../img/star.svg";
reviews.forEach((item) => {
  item.innerHTML = `<span><img src="${star}"></span><span><img src="${star}"></span><span><img src="${star}"></span><span><img src="${star}"></span><span><img src="${star}"></span> <span>5k Reviews</span>`;
});

let range = document.querySelector(".range"),
  rangeForm = document.querySelector(".range__item"),
  lowerSlider = document.querySelector("#lower"),
  upperSlider = document.querySelector("#upper"),
  totalMin = document.querySelector(".total-min"),
  totalMax = document.querySelector(".total-max"),
  lowerVal = parseInt(lowerSlider.value),
  upperVal = parseInt(upperSlider.value);

range.addEventListener("click", function (e) {
  if (e.target.closest(".range__item")) return;
  rangeForm.classList.toggle("navActive");
});

upperSlider.addEventListener("input", function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  totalMax.innerHTML = "$" + upperVal;
});
lowerSlider.addEventListener("input", function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  totalMin.innerHTML = "$" + lowerVal;
});
