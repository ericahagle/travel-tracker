////////////////////* Import CSS File *////////////////////
import './css/styles.css';

////////////////////* Import images *////////////////////
import './images/turing-logo.png';

////////////////////* Import from api-calls.js *////////////////////
import {
  fetchTraveler,
  fetchAllTravelers,
  fetchTrips,
  fetchDestinations,
  fetchAllData,
  postNewTrip
} from './api-calls';

////////////////////* Import from script-definitions.js *////////////////////
import {
  getCurrentTraveler,
  getCurrentTravelerCompleteTrips,
  getTotalSpendThisYear,
  getCostOfRequestedTrip,
  getNewTripObject
} from './script-definitions';

////////////////////* Import from dom-updates.js *////////////////////
import {
  updateGreeting,
  updatePastTripsList,
  updatePendingTripsList,
  updateUpcomingTripsList,
  updateTotalSpendAmount,
  updateDestinationsDropDown,
  updateEstimatedTripCost,
  username,
  password,
  loginButton,
  tripRequestForm,
  requestedTripDate,
  requestedTripDuration,
  requestedTripTravelers,
  destinationsDropDown,
  tripRequestSubmitButton,
  estimatedTripCost
} from './dom-updates';

////////////////////* Event Listeners *////////////////////
loginButton.addEventListener('click', () => {
  if (username.value && password.value) {
    
  }
})

window.addEventListener('load', () => {
  fetchAllData(13)
    .then(data => {
      const traveler = data[0];
      const allTravelers = data[1];
      const allTrips = data[2];
      const allDestinations = data[3];
      const currentTraveler = getCurrentTraveler(traveler, allTrips, allDestinations);
      updateGreeting(currentTraveler);
      const currentTravelerCompleteTrips = getCurrentTravelerCompleteTrips(currentTraveler.trips, currentTraveler.destinations);
      updatePastTripsList(currentTravelerCompleteTrips);
      updatePendingTripsList(currentTravelerCompleteTrips);
      updateUpcomingTripsList(currentTravelerCompleteTrips);
      const today = new Date();
      const currentYear = today.getFullYear();
      const totalSpend = getTotalSpendThisYear(currentTravelerCompleteTrips, currentYear);
      updateTotalSpendAmount(totalSpend);
      updateDestinationsDropDown(allDestinations);
    });
});

tripRequestForm.addEventListener('input', () => {
  if (requestedTripDate.value && requestedTripDuration.value && requestedTripTravelers.value && destinationsDropDown.value) {
    fetchDestinations()
      .then(data => {
        const allDestinations = data;
        const estimatedCost = getCostOfRequestedTrip(requestedTripDuration.value, requestedTripTravelers.value, destinationsDropDown.value, allDestinations);
        updateEstimatedTripCost(estimatedCost);
      });
  };
});

tripRequestSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (requestedTripDate.value && requestedTripDuration.value && requestedTripTravelers.value && destinationsDropDown.value) {
    console.log("Destination Selected:", destinationsDropDown.value);
    fetchTrips()
      .then(data => {
        const allTrips = data;
        console.log("All Trips:", allTrips);
        const newTrip = getNewTripObject(13, destinationsDropDown.value, requestedTripTravelers.value, requestedTripDate.value, requestedTripDuration.value, allTrips);
        console.log("New Trip:", newTrip);
        postNewTrip(newTrip)
          .then(data => {
            requestedTripDate.value = '';
            requestedTripDuration.value = '';
            requestedTripTravelers.value = '';
            destinationsDropDown.value = '';
            estimatedTripCost.innerHTML = '';
            const traveler = data[0];
            const allTravelers = data[1];
            const allTrips = data[2];
            const allDestinations = data[3];
            const currentTraveler = getCurrentTraveler(traveler, allTrips, allDestinations);
            const currentTravelerCompleteTrips = getCurrentTravelerCompleteTrips(currentTraveler.trips, currentTraveler.destinations);
            updatePendingTripsList(currentTravelerCompleteTrips);
            const today = new Date();
            const currentYear = today.getFullYear();
            const totalSpend = getTotalSpendThisYear(currentTravelerCompleteTrips, currentYear);
            updateTotalSpendAmount(totalSpend);
          });
      });
  };
});