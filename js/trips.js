// js/trips.js

const maxTripsAllowed = 3; // Maximum number of trips allowed in the checkout

let selectedTrips = [];

function isTripSelected(card) {
  return selectedTrips.some((trip) => trip.dataset.tripId === card.dataset.tripId);
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
  tripClone.querySelector('.trip-overlay').remove(); // Remove overlay from cloned card

  const checkoutTrips = document.querySelector('.checkout-trips');
  checkoutTrips.appendChild(tripClone);

  selectedTrips.push(tripClone);

  updateCheckoutButton();
}

function updateCheckoutButton() {
  const checkoutButton = document.querySelector('.checkout-button');
  if (selectedTrips.length > 0) {
    checkoutButton.removeAttribute('disabled');
  } else {
    checkoutButton.setAttribute('disabled', 'disabled');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tripCards = document.querySelectorAll('.trip');

  tripCards.forEach((card) => {
    card.addEventListener('click', () => {
      addToCheckout(card);
    });
  });
});



$(document).ready(function() {
  $(".image-wrapper img").click(function() {
    
    alert("Image Clicked!");
  });
});