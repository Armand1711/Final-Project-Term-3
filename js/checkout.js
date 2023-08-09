// js/checkout.js

$(document).ready(function() {
    function goToHome(this) {
      window.location.href = "trips.html";
    }
  
    const checkoutTrips = $(".checkout-trips");
    const selectedTrips = JSON.parse(localStorage.getItem("selectedTrips")) || [];
  
    if (selectedTrips.length > 0) {
      const tripsList = selectedTrips.map(trip => `<p>${trip}</p>`).join("");
      checkoutTrips.html(`<p class="checkout-alert">Selected Trips:</p>${tripsList}`);
    } else {
      checkoutTrips.html(`<p class="checkout-alert">No trips selected.</p>`);
    }
  });