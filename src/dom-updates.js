////////////////////* Query Selectors *////////////////////
const greeting = document.querySelector('#travelerDashboardHeader');
const pastTripsList = document.querySelector('#pastTrips');
const pendingTripsList = document.querySelector('#pendingTrips');
const upcomingTripsList = document.querySelector('#upcomingTrips');
const totalSpendAmount = document.querySelector('#totalSpendAmount');

////////////////////* DOM Updates *////////////////////
const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';

  if (!currentTraveler) {
    greeting.innerHTML = `<li>Welcome, Traveler!</li>`;
  }

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

  if (!currentTravelerPastTrip) {
    pastTripsList.innerHTML = `<li>You currently have no past trips.</li>`;
  }

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

  if (!currentTravelerPendingTrip) {
    pendingTripsList.innerHTML = `<li>You currently have no pending trips.</li>`;
  }

  pendingTripsList.innerHTML += currentTravelerPendingTrip;
}

const updateUpcomingTripsList = (currentTravelerCompleteTrips) => {
  upcomingTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if ((Date.parse(trip.tripDate) > Date.parse(new Date())) && trip.status === 'approved') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPastTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="Image of ${trip.destination}" width="100%" height="auto"><p>${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('<br>');

  if (!currentTravelerPastTrip) {
    upcomingTripsList.innerHTML = `<li>You currently have no upcoming trips.</li>`;
  }
  upcomingTripsList.innerHTML += currentTravelerPastTrip;
}

const updateTotalSpendAmount = (totalSpend) => {
  totalSpendAmount.innerHTML = '';
  totalSpendAmount.innerHTML = totalSpend;
}

////////////////////* Exports *////////////////////
export {
  updateGreeting,
  updatePastTripsList,
  updatePendingTripsList,
  updateUpcomingTripsList,
  updateTotalSpendAmount
}