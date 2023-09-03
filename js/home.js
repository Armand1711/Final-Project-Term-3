document.addEventListener('DOMContentLoaded', () => {
  const h1Element = document.querySelector('h1'); 

  
  h1Element.textContent = 'Welcome to AquaticNautica';

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
  $(".accordion-header").click(function () {
    $(this).toggleClass("active");
    $(this).next(".accordion-content").slideToggle();
  });

  // Fetch weather data from the API and update the page
  fetchWeatherDataAndDisplay();
});

// Function to fetch weather data and update the page
function fetchWeatherDataAndDisplay() {
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Centurion&units=metric&appid=4be64ad5b026bc9aff226d371d9692df';

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      const temperatureElement = document.getElementById('temperature');
      const weatherElement = document.getElementById('weather');

      // Update weather data on the homepage
      temperatureElement.textContent = data.main.temp.toFixed(1);
      weatherElement.textContent = data.weather[0].description;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Fetch weather data when the page loads
fetchWeatherDataAndDisplay();
