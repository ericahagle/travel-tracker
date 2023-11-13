////////////////////* Functions *////////////////////
function getCurrentTraveler(traveler, trips, destinations) {
  const travelerTripsData = trips.filter((trip) => {
    return trip.userID === traveler.id;
  });

  const travelerDestinationIDs = travelerTripsData.map((trip) => {
    return trip.destinationID;
  });

  const travelerDestinationsData = destinations.filter((destination) => {
    return travelerDestinationIDs.includes(destination.id);
  });

  const currentTraveler = {
    traveler: traveler,
    trips: travelerTripsData || [],
    destinations: travelerDestinationsData || []
  };
  return currentTraveler;
}

function getCompleteTrip(trip, destinations) {
  if (!trip) {
    return null;
  } else {
    const destinationOfTrip = destinations.find(destination => destination.id === trip.destinationID);
    return {
      tripID: trip.id,
      userID: trip.userID,
      destination: destinationOfTrip.destination,
      destinationImage: destinationOfTrip.image,
      estimatedLodgingCostPerDay: destinationOfTrip.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: destinationOfTrip.estimatedFlightCostPerPerson,
      tripDate: trip.date,
      tripDuration: trip.duration,
      status: trip.status,
      travelers: trip.travelers,
      suggestedActivities: trip.suggestedActivities,
    }
  }
}

function getCurrentTravelerCompleteTrips(trips, destinations) {
  return trips.map(trip => getCompleteTrip(trip, destinations));
}

////////////////////* Exports *////////////////////
module.exports = { getCurrentTraveler, getCompleteTrip, getCurrentTravelerCompleteTrips }