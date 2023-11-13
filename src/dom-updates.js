////////////////////* Query Selectors *////////////////////
const greeting = document.querySelector('#travelerDashboardHeader');
const pastTripsList = document.querySelector('#pastTrips');
const pendingTripsList = document.querySelector('#pendingTrips');

////////////////////* DOM Updates *////////////////////
const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1>Welcome back, ${currentTraveler.traveler.name}!</h1>`;
}

const updatePastTripsList = (currentTravelerCompleteTrips) => {
  pastTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if ((Date.parse(trip.tripDate) < Date.parse(new Date())) && trip.status === 'approved') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPastTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="Image of ${trip.destination}" width="100%" height="auto"><p>${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('<br>');
  pastTripsList.innerHTML += currentTravelerPastTrip;
}

const updatePendingTripsList = (currentTravelerCompleteTrips) => {
  pendingTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if (trip.status === 'pending') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPendingTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="Image of ${trip.destination}" width="100%" height="auto"><p>${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('<br>');
  pendingTripsList.innerHTML += currentTravelerPendingTrip;
}

////////////////////* Exports *////////////////////
export { updateGreeting, updatePastTripsList, updatePendingTripsList }