////////////////////* Functions *////////////////////
function verifyUserName(input) {
  const id = parseInt(input.slice(8));
  if (input.slice(0, 8) === 'traveler' && id > 0 && id < 51) {
    return true;
  } else {
    return false;
  }
}

function verifyPassword(input) {
  if (input === 'travel') {
    return true;
  } else {
    return false;
  }
}

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
    traveler,
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
    };
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

function getCostOfRequestedTrip(duration, numOfTravelers, destinationID, destinations) {
  const requestedDestination = destinations.find((destination) => {
    return parseInt(destination.id) === parseInt(destinationID);
  });
  if (!requestedDestination) {
    return null;
  } else {
    return (((requestedDestination.estimatedLodgingCostPerDay * duration) + (requestedDestination.estimatedFlightCostPerPerson * numOfTravelers)) * 1.1).toFixed(2);
  }
}

const formatDate = (dateString) => {
  return dateString.split('-').join('/');
};

const getNewTripObject = (userID, destID, numofTrav, date, duration, trips) => {
  const tripID = trips.reduce((tripid, trip) => {
    tripid = trip.id;
    return tripid + 1;
  }, 0);
  return {
    id: tripID,
    userID: parseInt(userID),
    destinationID: parseInt(destID),
    travelers: parseInt(numofTrav),
    date: formatDate(date),
    duration: parseInt(duration),
    status: 'pending',
    suggestedActivities: []
  };
}

////////////////////* Exports *////////////////////
module.exports = {
  verifyUserName,
  verifyPassword,
  getCurrentTraveler,
  getCompleteTrip,
  getCurrentTravelerCompleteTrips,
  getTotalSpendThisYear,
  getCostOfRequestedTrip,
  formatDate,
  getNewTripObject
}