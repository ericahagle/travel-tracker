////////////////////* Import CSS File *////////////////////
import './css/styles.css';

////////////////////* Import images *////////////////////
import './images/turing-logo.png';

////////////////////* Import from api-calls.js *////////////////////
import {
  travelerUserID,
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
  getNewTripObject,
  verifyUserName,
  verifyPassword,
  travelerID
} from './script-definitions';

////////////////////* Import from dom-updates.js *////////////////////
import {
  addLoginErrorMessage,
  clearLoginErrorMessage,
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
  loginForm,
  travelerDashboard,
  tripRequestForm,
  requestedTripDate,
  requestedTripDuration,
  requestedTripTravelers,
  destinationsDropDown,
  tripRequestSubmitButton,
  estimatedTripCost
} from './dom-updates';

////////////////////* Event Listeners *////////////////////
loginForm.addEventListener('input', (event) => {
  event.preventDefault();
  clearLoginErrorMessage();
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (verifyUserName(username.value) && verifyPassword(password.value)) {
    travelerID = parseInt(username.value.slice(8));
    clearLoginErrorMessage();
    loginForm.classList.add('hidden');
    travelerDashboard.classList.remove('hidden');
    fetchAllData(travelerID)
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
  } else {
    addLoginErrorMessage();
  };
});

tripRequestForm.addEventListener('input', (event) => {
  event.preventDefault();
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
    fetchTrips()
      .then(data => {
        const allTrips = data;
        const newTrip = getNewTripObject(travelerID, destinationsDropDown.value, requestedTripTravelers.value, requestedTripDate.value, requestedTripDuration.value, allTrips);
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