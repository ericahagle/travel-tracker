////////////////////* Query Selectors *////////////////////
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginButton = document.querySelector('#loginButton');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#errorMessage');
const travelerDashboard = document.querySelector('#travelerDashboard');
const greeting = document.querySelector('#travelerDashboardHeader');
const pastTripsList = document.querySelector('#pastTrips');
const pendingTripsList = document.querySelector('#pendingTrips');
const upcomingTripsList = document.querySelector('#upcomingTrips');
const totalSpendAmount = document.querySelector('#totalSpendAmount');
const tripRequestForm = document.querySelector('#tripRequestForm');
const requestedTripDate = document.querySelector('#startDate');
const requestedTripDuration = document.querySelector('#duration');
const requestedTripTravelers = document.querySelector('#numOfTravelers');
const destinationsDropDown = document.querySelector('#destinations');
const estimatedTripCost = document.querySelector('#estimatedTripCost');
const tripRequestSubmitButton = document.querySelector('#tripRequestSubmitButton');

////////////////////* DOM Updates *////////////////////
const addLoginErrorMessage = () => {
  loginError.innerHTML = 'Invalid login credentials entered, please try again.';
}

const clearLoginErrorMessage = () => {
  loginError.innerHTML = '';
}

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
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

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
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

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
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

  if (!currentTravelerPastTrip) {
    upcomingTripsList.innerHTML = `<li>You currently have no upcoming trips.</li>`;
  }
  upcomingTripsList.innerHTML += currentTravelerPastTrip;
}

const updateTotalSpendAmount = (totalSpend) => {
  totalSpendAmount.innerHTML = '';
  totalSpendAmount.innerHTML = `$${totalSpend}`;
}

const updateDestinationsDropDown = (destinations) => {
  const destinationListItem = destinations.map((destination) => {
    return `<option value=${destination.id} name="${destination.destination}">${destination.destination}</option>`
  });
  destinationsDropDown.innerHTML += destinationListItem;
}

const updateEstimatedTripCost = (estimatedCost) => {
  estimatedTripCost.innerHTML = `Your estimated trip cost is: $${estimatedCost}`;
}

////////////////////* Exports *////////////////////
export {
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
}