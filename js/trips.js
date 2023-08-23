document.addEventListener('DOMContentLoaded', () => {
  const maxTripsAllowed = 3;
  const tripCards = document.querySelectorAll('.trip');
  const selectedTrips = [];
  let filterCategory = 'All'; // Default filter category

  function isTripSelected(card) {
    const tripId = card.dataset.tripId;
    return selectedTrips.some((trip) => trip.dataset.tripId === tripId);
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

    const tripIndex = Array.from(tripCards).indexOf(card);
    const tripClone = card.cloneNode(true);
    tripClone.classList.remove('trip');
    tripClone.classList.add('checkout-trip');
    tripClone.querySelector('.trip-overlay').remove();

    selectedTrips.push(tripClone);
    updateCheckoutButton();

    const checkoutTrips = document.querySelector('.checkout-trips');
    checkoutTrips.appendChild(tripClone);
  }

  function updateCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (selectedTrips.length > 0) {
      checkoutButton.removeAttribute('disabled');
    } else {
      checkoutButton.setAttribute('disabled', 'disabled');
    }
  }

  function applyFilter(category) {
    filterCategory = category;
    tripCards.forEach((card) => {
      const tripId = parseInt(card.dataset.tripId);

      if ((filterCategory === 'All') ||
          (filterCategory === 'Short' && [4, 5, 8, 9].includes(tripId)) ||
          (filterCategory === 'Long' && [1, 2, 3, 7, 9, 12].includes(tripId)) ||
          (filterCategory === 'Single' && [1, 2, 3, 4, 9, 10, 11, 12].includes(tripId)) ||
          (filterCategory === 'Multi' && [5, 6, 7, 8].includes(tripId)) ||
          (filterCategory === 'Round' && [5, 8, 9, 11, 12].includes(tripId)) ||
          (filterCategory === 'RowBoat' && [2, 7, 11, 12].includes(tripId))) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Reset all filter buttons to default style
    filterButtons.forEach((button) => {
      button.style.backgroundColor = '';
      button.style.color = '';
    });

    // Set style for the selected filter button
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

  tripCards.forEach((card) => {
    card.addEventListener('click', () => {
      addToCheckout(card);
    });
  });
});
