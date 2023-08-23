document.addEventListener('DOMContentLoaded', () => {
  const checkoutTrips = document.querySelector('.checkout-trips');

  // Retrieve selected trips from local storage
  const selectedTrips = JSON.parse(localStorage.getItem('selectedTrips')) || [];

  // Append selected trip to the checkout list
  selectedTrips.forEach((tripClone) => {
    checkoutTrips.appendChild(tripClone);
  });
});
