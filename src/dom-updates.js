////////////////////* Query Selectors *////////////////////
const greeting = document.querySelector('#travelerDashboardHeader');

////////////////////* DOM Updates *////////////////////
const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';
  greeting.innerHTML = `<h1>Hello ${currentTraveler.name}!</h1>`;
}

////////////////////* Exports *////////////////////
export { updateGreeting }