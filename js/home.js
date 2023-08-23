//  js/home.js
document.addEventListener('DOMContentLoaded', () => {
  const h1Element = document.querySelector('h1'); // Select the <h1> element

  // Change the text content of the <h1>
  h1Element.textContent = 'Welcome to AquaticNautica';
});
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

   // Get weather data from the API
   function getWeatherData(cityName) {
    const apiKey = '4be64ad5b026bc9aff226d371d9692df';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(weatherApiUrl)
      .then(response => response.json())
      .then(data => {
        const temperatureElement = document.getElementById('temperature');
        const weatherElement = document.getElementById('weather');

        // Update weather data on the homepage
        temperatureElement.textContent = data.main.temp;
        weatherElement.textContent = data.weather[0].description;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  // Fetch weather data when the page loads
  const cityName = "Centurion"; 
  getWeatherData(cityName);
});






