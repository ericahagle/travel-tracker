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
  fetchAllData
} from './api-calls';

////////////////////* Import from script-definitions.js *////////////////////
import {
  getCurrentTraveler,
  getCurrentTravelerCompleteTrips,
  getTotalSpendThisYear,
  getCostOfRequestedTrip
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
  tripRequestForm,
  requestedTripDate,
  requestedTripDuration,
  requestedTripTravelers,
  destinationsDropDown,
  tripRequestSubmitButton
} from './dom-updates';

////////////////////* Event Listeners *////////////////////
window.addEventListener('load', () => {
  fetchAllData(7)
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

tripRequestSubmitButton.addEventListener('click', () => {
  if (requestedTripDate.value && requestedTripDuration.value && requestedTripTravelers.value && destinationsDropDown.value) {
    fetchTrips()
      .then(data => {
        const allTrips = data;
        const newTrip = getNewTripObject(7, allTrips);
        postNewTrip(newTrip)
          .then(data => {
            console.log(allTrips);
            updatePendingTripsList(newTrip);
          });

      });
  }
});