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
import { getCurrentTraveler, getCurrentTravelerCompleteTrips } from './script-definitions';

////////////////////* Import from dom-updates.js *////////////////////
import { updateGreeting, updatePastTripsList } from './dom-updates';

////////////////////* Event Listeners *////////////////////
window.addEventListener('load', () => {
  fetchAllData(50)
    .then(data => {
      // console.log(data);
      const traveler = data[0];
      const allTravelers = data[1];
      const allTrips = data[2];
      const allDestinations = data[3];
      // console.log("Individual traveler:", traveler);
      // console.log("All Travelers:", allTravelers);
      // console.log("All Trips:", allTrips);
      // console.log("All Destinations:", allDestinations);
      const currentTraveler = getCurrentTraveler(traveler, allTrips, allDestinations);
      console.log("Current Traveler:", currentTraveler);
      updateGreeting(currentTraveler);
      const currentTravelerCompleteTrips = getCurrentTravelerCompleteTrips(currentTraveler.trips, currentTraveler.destinations);
      updatePastTripsList(currentTravelerCompleteTrips);
    })
});