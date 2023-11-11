////////////////////* Functions *////////////////////
function getAllTravelerData(traveler, trips, destinations) {
  const travelerTripsData = trips.filter((trip) => {
    return trip.userID === traveler.id;
  });
  const travelerDestinationsData = destinations.filter((destination) => {
    return destination.id === trips.destinationID;
  });
  const completeTravelerData = {
    ...traveler,
    tripsData: travelerTripsData || [],
    destinationsData: travelerDestinationsData || []
  };
  return completeTravelerData;
}

////////////////////* Exports *////////////////////
