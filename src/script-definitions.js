////////////////////* Functions *////////////////////
function getTravelerData(traveler, trips, destinations) {
  const travelerTripsData = trips.filter((trip) => {
    return trip.userID === traveler.id;
  });
  
  const travelerDestinationIDs = travelerTripsData.map((trip) => {
    return trip.destinationID;
  });

  const travelerDestinationsData = destinations.filter((destination) => {
    return travelerDestinationIDs.includes(destination.id);
  });

  const travelerData = {
    ...traveler,
    trips: travelerTripsData || [],
    destinations: travelerDestinationsData || []
  };
  return travelerData;
}

////////////////////* Exports *////////////////////
module.exports = { getTravelerData };