document.addEventListener('DOMContentLoaded', () => {
  const maxTripsAllowed = 3;
  const tripCards = document.querySelectorAll('.trip');
  const selectedTrips = [];
  let filterCategory = 'All';

  function isTripSelected(card) {
    const tripId = card.dataset.tripId;
    return selectedTrips.some((trip) => trip.dataset.tripId === tripId);
  }

  function calculateTripCost(tripPrice, totalTickets) {
    return tripPrice * totalTickets;
  }

  function addToCheckout(card) {
    if (selectedTrips.length >= maxTripsAllowed) {
      alert('You can only select up to three trips.');
      return;
    }

    if (isTripSelected(card)) {
      alert('This trip is already selected.');
      return;
    }

    const tripClone = card.cloneNode(true);
    tripClone.classList.remove('trip');
    tripClone.classList.add('checkout-trip');
    const ticketQuantitySelect = tripClone.querySelector('.ticket-quantity');

    if (ticketQuantitySelect) {
      const tripPrice = parseFloat(card.dataset.tripPrice);
      const ticketQuantity = parseInt(ticketQuantitySelect.value);
      const tripCost = calculateTripCost(tripPrice, ticketQuantity);
      tripClone.querySelector('.trip-cost').textContent = `Cost: R${tripCost.toFixed(2)}`;

      selectedTrips.push(tripClone);
      updateCheckoutButton();

      const checkoutTrips = document.querySelector('.checkout-table tbody');
      checkoutTrips.appendChild(tripClone);
      addToCheckoutTable(card.dataset.tripCode, ticketQuantity, tripCost);
    } else {
      alert('This trip is missing ticket quantity information.');
    }
  }

  function updateCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
      checkoutButton.disabled = selectedTrips.length === 0;
    }
  }

  function applyFilter(category) {
    filterCategory = category;
    tripCards.forEach((card) => {
      const tripId = parseInt(card.dataset.tripId);
      const isVisible = (
        (filterCategory === 'All') ||
        (filterCategory === 'Short' && [4, 5, 8, 9].includes(tripId)) ||
        (filterCategory === 'Long' && [1, 2, 3, 7, 9, 12].includes(tripId)) ||
        (filterCategory === 'Single' && [1, 2, 3, 4, 9, 10, 11, 12].includes(tripId)) ||
        (filterCategory === 'Multi' && [5, 6, 7, 8].includes(tripId)) ||
        (filterCategory === 'Round' && [5, 8, 9, 11, 12].includes(tripId)) ||
        (filterCategory === 'RowBoat' && [2, 7, 11, 12].includes(tripId))
      );

      card.style.display = isVisible ? 'block' : 'none';
    });

    filterButtons.forEach((button) => {
      button.style.backgroundColor = '';
      button.style.color = '';
    });

    const selectedButton = document.querySelector(`[data-category="${filterCategory}"]`);
    if (selectedButton) {
      selectedButton.style.backgroundColor = 'orange';
      selectedButton.style.color = 'white';
    }
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      applyFilter(category);
    });
  });

  document.querySelectorAll('.weather-button').forEach((weatherButton) => {
    weatherButton.addEventListener('click', (event) => {
      event.stopPropagation();

      const tripId = weatherButton.getAttribute('data-trip-id');
      const cityName = weatherButton.closest('.trip').getAttribute('data-city');
      const weatherPopup = document.getElementById('weather-popup-' + tripId);
      const weatherInfo = document.getElementById('weather-info-' + tripId);

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4be64ad5b026bc9aff226d371d9692df`)
        .then((response) => response.json())
        .then((data) => {
          const weatherText = `Weather: ${data.weather[0].description}<br>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
          weatherInfo.innerHTML = weatherText;
          weatherPopup.style.display = 'block';
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    });
  });

  document.querySelectorAll('.purchase-button').forEach((purchaseButton) => {
    purchaseButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const tripCard = event.target.closest('.trip');
      addToCheckout(tripCard);
    });
  });

  const removeAllButton = document.querySelector('.remove-all-button');
  const purchaseButton = document.querySelector('.checkout-button');

  function purchaseTicket() {
    alert('Purchase successful!');
  }

  

  function removeTrip(tripElement) {
    tripElement.remove();
    const tripIndex = selectedTrips.indexOf(tripElement);
    if (tripIndex !== -1) {
      selectedTrips.splice(tripIndex, 1);
      updateCheckoutButton();
    }
  }

  removeAllButton.addEventListener('click', () => {
    const checkoutTable = document.querySelector('.checkout-table tbody');
    checkoutTable.innerHTML = '';
    selectedTrips.length = 0;
    updateCheckoutButton();
  });

  purchaseButton.addEventListener('click', () => {
    purchaseTicket();
  });

  const checkoutTable = document.querySelector('.checkout-table tbody');

  checkoutTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
      const tripElement = event.target.closest('.checkout-trip');
      removeTrip(tripElement);
    }
  });

  const selectedTripsFromStorage = JSON.parse(localStorage.getItem('selectedTrips')) || [];
  selectedTripsFromStorage.forEach((tripClone) => {
    checkoutTable.appendChild(tripClone);
    selectedTrips.push(tripClone);
  });

  updateCheckoutButton();
});
