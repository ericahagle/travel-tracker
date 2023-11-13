////////////////////* Query Selectors *////////////////////
const greeting = document.querySelector('#travelerDashboardHeader');
const pastTripsList = document.querySelector('#pastTrips');

////////////////////* DOM Updates *////////////////////
const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1>Welcome back, ${currentTraveler.traveler.name}!</h1>`;
}

const updatePastTripsList = (currentTravelerCompleteTrips) => {
  pastTripsList.innerHTML = '';

  const currentTravelerPastTrip = currentTravelerCompleteTrips.map(trip => 
    `<li><img src="${trip.destinationImage}" alt="Image of ${trip.destination}" width="100%" height="auto"><p>${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('<br>');
    pastTripsList.innerHTML += currentTravelerPastTrip;
}

////////////////////* Exports *////////////////////
export { updateGreeting, updatePastTripsList }