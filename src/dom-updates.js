////////////////////* Query Selectors *////////////////////
const welcome = document.querySelector('#travelerDashboardHeader');

////////////////////* DOM Updates *////////////////////
const updateWelcome = (travelerData) => {
  welcome.innerHTML = '';
  welcome.innerHTML = `<h1>Hello ${travelerData.name}!</h1>`;
}

////////////////////* Exports *////////////////////
export { updateWelcome };