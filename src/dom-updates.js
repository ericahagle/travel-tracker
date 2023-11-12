////////////////////* Query Selectors *////////////////////
const welcome = document.querySelector('#travelerDashboardHeader');
const pastTrips = document.querySelector('#tripsPast');

////////////////////* DOM Updates *////////////////////
const updateWelcome = (travelerData) => {
  welcome.innerHTML = '';
  welcome.innerHTML = `<h1>Hello ${travelerData.name}!</h1>`;
}

const updatePastTrips = (travelerData) => {
  pastTrips.innerHTML = '';
  pastTrips.innerHTML = `<li>${travelerData}</li>`;
}

////////////////////* Exports *////////////////////
export { 
  updateWelcome,
  updatePastTrips
};