//  js/home.js

// carousel
let slideIndex = 0;
showSlides(slideIndex);

function showSlides(index) {
  let slides = document.getElementsByClassName("carousel-slide");
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function startCarousel() {
  setInterval(() => {
    changeSlide(1);
  }, 3000);
}

startCarousel();

// accordion

$(document).ready(function() {
  $(".accordion-header").click(function() {
    $(this).toggleClass("active");
    $(this).next(".accordion-content").slideToggle();
  });
});
