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
  if (!trips) {
    return null;
  } else {
    return trips.map(trip => getCompleteTrip(trip, destinations));
  }
}

function getTotalSpendThisYear(combinedTrips, year) {
  let totalSpend = 0;
  combinedTrips.forEach((trip) => {
    if (trip.tripDate.includes(year)) {
      totalSpend += ((trip.estimatedLodgingCostPerDay * trip.tripDuration) + (trip.estimatedFlightCostPerPerson * trip.travelers)) * 1.1;
    }
  });
  return totalSpend.toFixed(2);
}

////////////////////* Exports *////////////////////
module.exports = {
  getCurrentTraveler,
  getCompleteTrip,
  getCurrentTravelerCompleteTrips,
  getTotalSpendThisYear
}