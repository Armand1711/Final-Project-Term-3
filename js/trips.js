// js/trips.js

$(document).ready(function() {
  $(".add-to-checkout").click(function() {
    const maxTrips = 3;
    const tripContainer = $(this).closest(".trip");
    const tripDescription = tripContainer.find("h2").text();

    if ($(".selected-trip").length < maxTrips) {
      tripContainer.addClass("selected-trip");
      $(this).text("Added to Checkout").prop("disabled", true);

      
      const selectedTrips = JSON.parse(localStorage.getItem("selectedTrips")) || [];
      selectedTrips.push(tripDescription);
      localStorage.setItem("selectedTrips", JSON.stringify(selectedTrips));
    } else {
      alert("You have reached the maximum number of booked trips (3).");
    }
  });
});

$(document).ready(function() {
  $(".image-wrapper img").click(function() {
    
    alert("Image Clicked!");
  });
});