////////////////////* Global Variables *////////////////////
const allTravelersAPI = 'http://localhost:3001/api/v1/travelers';
const tripsAPI = 'http://localhost:3001/api/v1/trips';
const destinationsAPI = 'http://localhost:3001/api/v1/destinations';
let traveler;
let allTravelers;
let allTrips;
let allDestinations;
let travelerID;

////////////////////* Fetch Calls *////////////////////

/////* Fetch Individual Traveler */////
const fetchTraveler = (travelerID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
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
  travelerID = travelerID.toString();
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
      return fetchAllData(data.newTrip.userID);
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