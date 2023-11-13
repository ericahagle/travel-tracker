////////////////////* Query Selectors *////////////////////
const greeting = document.querySelector('#travelerDashboardHeader');

////////////////////* DOM Updates *////////////////////
const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1>Welcome back, ${currentTraveler.traveler.name}!</h1>`;
}

////////////////////* Exports *////////////////////
export { updateGreeting }