////////////////////* Functions *////////////////////
function getTravelerTripsData(traveler, trips) {
  const travelerTripsData = trips.filter((trip) => {
    return trip.userID === traveler.id;
  });
  const travelerWithTrips = {
    ...traveler,
    trips: travelerTripsData || []
  };
  return travelerWithTrips;
}

// function getCompleteTravelerData(traveler, destinations) {
//   const travelerDestinationsData = destinations.filter((destination) => {
//     return destination.id === traveler.destinationID;
//   });
//   const completeTraveler = {
//     ...traveler,
//     destinations: travelerDestinationsData || []
//   }
//   return completeTraveler;
// }

////////////////////* Exports *////////////////////
module.exports = { getTravelerTripsData };