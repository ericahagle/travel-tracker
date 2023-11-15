////////////////////* Global Variables *////////////////////
// const travelerAPI = `http://localhost:3001/api/v1/travelers/${id}`;
const allTravelersAPI = 'http://localhost:3001/api/v1/travelers';
const tripsAPI = 'http://localhost:3001/api/v1/trips';
const destinationsAPI = 'http://localhost:3001/api/v1/destinations';
let traveler = null;
let allTravelers = null;
let allTrips = null;
let allDestinations = null;
let travelerID = null;

////////////////////* Fetch Calls *////////////////////

/////* Fetch Individual Traveler */////
const fetchTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      traveler = data;
      return traveler;
    })
    .catch(error => {
      console.log(error);
    })
}

/////* Fetch All Travelers */////
const fetchAllTravelers = () => {
  return fetch(allTravelersAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allTravelers = data.travelers;
      return allTravelers;
    })
    .catch(error => {
      console.log(error);
    })
}

/////* Fetch All Trips */////
const fetchTrips = () => {
  return fetch(tripsAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allTrips = data.trips;
      return allTrips;
    })
    .catch(error => {
      console.log(error);
    })
}

/////* Fetch All Destinations */////
const fetchDestinations = () => {
  return fetch(destinationsAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allDestinations = data.destinations;
      return allDestinations;
    })
    .catch(error => {
      console.log(error);
    })
}

/////* Fetch All Data */////
const fetchAllData = (travelerID) => {
  return Promise.all([
    fetchTraveler(travelerID),
    fetchAllTravelers(),
    fetchTrips(),
    fetchDestinations()
  ])
}

/////* POST New Trip */////
const postNewTrip = (newTrip) => {
  return fetch(tripsAPI, {
    method: 'POST',
    body: JSON.stringify(newTrip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return fetchAllData(13);
    })
    .catch(error => {
      console.log(error);
    })
}


////////////////////* Exports *////////////////////
export {
  fetchTraveler,
  fetchAllTravelers,
  fetchTrips,
  fetchDestinations,
  fetchAllData,
  postNewTrip
}