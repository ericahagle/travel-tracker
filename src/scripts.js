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
  getTotalSpendThisYear
} from './script-definitions';

////////////////////* Import from dom-updates.js *////////////////////
import {
  updateGreeting,
  updatePastTripsList,
  updatePendingTripsList,
  updateUpcomingTripsList,
  updateTotalSpendAmount
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
    });
});