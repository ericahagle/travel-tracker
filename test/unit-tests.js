////////////////////* Imports *////////////////////
import chai from 'chai';
const expect = chai.expect;
const { verifyUserName, verifyPassword, getCurrentTraveler, getCompleteTrip, getCurrentTravelerCompleteTrips, getTotalSpendThisYear, getCostOfRequestedTrip, formatDate, getNewTripObject } = require('../src/script-definitions.js');
const { travelers, trips, destinations } = require('./test-data.js');

////////////////////* Tests *////////////////////
describe.only('login', function () {
  it('should return true if username is valid', function () {
    expect(verifyUserName('traveler1')).to.be.true;
    expect(verifyUserName('traveler50')).to.be.true;
  });

  it('should return false if username is invalid', function () {
    expect(verifyUserName('traveling50')).to.be.false;
    expect(verifyUserName('traveler51')).to.be.false;
  });

  it('should return true if password is valid', function () {
    expect(verifyPassword('travel')).to.be.true;
  });

  it('should return false if password is invalid', function () {
    expect(verifyPassword('travelz')).to.be.false;
    expect(verifyPassword('trav31')).to.be.false;
  });
});

describe('traveler object creation', function () {
  it('should add trips and destination data to user object', function () {
    expect(getCurrentTraveler(travelers[0], trips, destinations)).to.deep.equal({
      traveler: { id: 1, name: 'Ham Leadbeater', travelerType: 'relaxer' },
      trips: [
        {
          id: 117,
          userID: 1,
          destinationID: 28,
          travelers: 3,
          date: '2021/01/09',
          duration: 15,
          status: 'approved',
          suggestedActivities: []
        }
      ],
      destinations: [
        {
          id: 28,
          destination: 'San Juan, Puerto Rico',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 900,
          image: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
          alt: 'white and brown concrete buildings near sea under white clouds during daytime'
        }
      ]
    });

    expect(getCurrentTraveler(travelers[1], trips, destinations)).to.deep.equal({
      traveler: { id: 2, name: 'Rachael Vaughten', travelerType: 'thrill-seeker' },
      trips: [
        {
          id: 89,
          userID: 2,
          destinationID: 10,
          travelers: 5,
          date: '2019/09/27',
          duration: 13,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 100,
          userID: 2,
          destinationID: 6,
          travelers: 6,
          date: '2020/3/28',
          duration: 10,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 116,
          userID: 2,
          destinationID: 7,
          travelers: 3,
          date: '2020/04/03',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 166,
          userID: 2,
          destinationID: 7,
          travelers: 2,
          date: '2020/03/05',
          duration: 6,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 171,
          userID: 2,
          destinationID: 43,
          travelers: 1,
          date: '2020/12/27',
          duration: 18,
          status: 'pending',
          suggestedActivities: []
        },
        {
          id: 177,
          userID: 2,
          destinationID: 20,
          travelers: 6,
          date: '2020/01/29',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        }
      ],
      destinations: [
        {
          id: 6,
          destination: 'Jakarta, Indonesia',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 890,
          image: 'https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          alt: 'lit up city at night'
        },
        {
          id: 7,
          destination: 'Paris, France',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          image: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          alt: 'city during the day time with eiffel tower'
        },
        {
          id: 10,
          destination: 'Toronto, Canada',
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 450,
          image: 'https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80'
        },
        {
          id: 20,
          destination: 'Miami, Florida',
          estimatedLodgingCostPerDay: 158,
          estimatedFlightCostPerPerson: 275,
          image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
          alt: 'sand with palm trees and tall buildings in the background'
        },
        {
          id: 43,
          destination: 'Nassau, The Bahamas',
          estimatedLodgingCostPerDay: 550,
          estimatedFlightCostPerPerson: 90,
          image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80',
          alt: 'aerial photography of white and blue cruise ships during daytime'
        }
      ]
    });
  });

  it('should add empty arrays to user object if no trips and/or destinations data is found', function () {
    expect(getCurrentTraveler(travelers[2], trips, destinations)).to.deep.equal({
      traveler: { id: 3, name: 'Sibby Dawidowitsch', travelerType: 'shopper' },
      trips: [],
      destinations: []
    });
  });
});

describe('trip cost', function () {
  it('should return the cost of a requested trip', function () {
    expect(getCostOfRequestedTrip(10, 1, 7, destinations)).to.deep.equal('1534.50');

    expect(getCostOfRequestedTrip(7, 2, 28, destinations)).to.deep.equal('2519.00');
  });

  it('should return null if trip is not found', function () {
    expect(getCostOfRequestedTrip(7, 2, 666, destinations)).to.be.null;
  });
});

describe('new trip object', function () {
  it('should return a given date in the correct format', function () {
    expect(formatDate('2023-11-30')).to.deep.equal('2023/11/30');
  });

  it('should return a new trip object', function () {
    expect(getNewTripObject(7, 7, 2, '2023/11/30', 10, trips)).to.deep.equal({
      id: 178,
      userID: 7,
      destinationID: 7,
      travelers: 2,
      date: '2023/11/30',
      duration: 10,
      status: 'pending',
      suggestedActivities: []
    });
  });
});

describe('tests that require specific sets of user data', function () {
  const travelerWithOneTrip = getCurrentTraveler(travelers[0], trips, destinations);
  const travelerWithManyTrips = getCurrentTraveler(travelers[1], trips, destinations);
  const travelerWithNoTrips = getCurrentTraveler(travelers[2], trips, destinations);

  describe('combine trips with destinations', function () {
    it('should return a complete trip object including destination info', function () {
      expect(getCompleteTrip(travelerWithOneTrip.trips[0], travelerWithOneTrip.destinations)).to.deep.equal({
        tripID: 117,
        userID: 1,
        destination: 'San Juan, Puerto Rico',
        destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        tripDate: '2021/01/09',
        tripDuration: 15,
        status: 'approved',
        travelers: 3,
        suggestedActivities: []
      });

      expect(getCompleteTrip(travelerWithManyTrips.trips[0], travelerWithManyTrips.destinations)).to.deep.equal({
        tripID: 89,
        userID: 2,
        destination: 'Toronto, Canada',
        destinationImage: 'https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80',
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 450,
        tripDate: '2019/09/27',
        tripDuration: 13,
        status: 'approved',
        travelers: 5,
        suggestedActivities: []
      });
    });

    it('should return null if current traveler has no trip info', function () {
      expect(getCompleteTrip(travelerWithNoTrips.trips[0], travelerWithNoTrips.destinations)).to.be.null;
    });

    it('should return an array of trip objects including destination info for all of a given traveler\'s trips', function () {
      expect(getCurrentTravelerCompleteTrips(travelerWithOneTrip.trips, travelerWithOneTrip.destinations)).to.deep.equal([
        {
          tripID: 117,
          userID: 1,
          destination: 'San Juan, Puerto Rico',
          destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 900,
          tripDate: '2021/01/09',
          tripDuration: 15,
          status: 'approved',
          travelers: 3,
          suggestedActivities: []
        }
      ]);

      expect(getCurrentTravelerCompleteTrips(travelerWithManyTrips.trips, travelerWithManyTrips.destinations)).to.deep.equal([
        {
          tripID: 89,
          userID: 2,
          destination: 'Toronto, Canada',
          destinationImage: 'https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80',
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 450,
          tripDate: '2019/09/27',
          tripDuration: 13,
          status: 'approved',
          travelers: 5,
          suggestedActivities: []
        },
        {
          tripID: 100,
          userID: 2,
          destination: 'Jakarta, Indonesia',
          destinationImage: 'https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 890,
          tripDate: '2020/3/28',
          tripDuration: 10,
          status: 'approved',
          travelers: 6,
          suggestedActivities: []
        },
        {
          tripID: 116,
          userID: 2,
          destination: 'Paris, France',
          destinationImage: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          tripDate: '2020/04/03',
          tripDuration: 8,
          status: 'approved',
          travelers: 3,
          suggestedActivities: []
        },
        {
          tripID: 166,
          userID: 2,
          destination: 'Paris, France',
          destinationImage: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          tripDate: '2020/03/05',
          tripDuration: 6,
          status: 'approved',
          travelers: 2,
          suggestedActivities: []
        },
        {
          tripID: 171,
          userID: 2,
          destination: 'Nassau, The Bahamas',
          destinationImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80',
          estimatedLodgingCostPerDay: 550,
          estimatedFlightCostPerPerson: 90,
          tripDate: '2020/12/27',
          tripDuration: 18,
          status: 'pending',
          travelers: 1,
          suggestedActivities: []
        },
        {
          tripID: 177,
          userID: 2,
          destination: 'Miami, Florida',
          destinationImage: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
          estimatedLodgingCostPerDay: 158,
          estimatedFlightCostPerPerson: 275,
          tripDate: '2020/01/29',
          tripDuration: 8,
          status: 'approved',
          travelers: 6,
          suggestedActivities: []
        }
      ]);
    });

    it('should return null if current traveler has no trip info', function () {
      expect(getCurrentTravelerCompleteTrips(travelerWithNoTrips.trips[0], travelerWithNoTrips.destinations)).to.be.null;
    });
  });

  describe('total spend', function () {
    const combinedTrips = getCurrentTravelerCompleteTrips(travelerWithManyTrips.trips, travelerWithManyTrips.destinations);

    it('should return the total spend for a given year', function () {
      expect(getTotalSpendThisYear(combinedTrips, 2019)).to.deep.equal('3762.00');
      expect(getTotalSpendThisYear(combinedTrips, 2020)).to.deep.equal('24550.90');
    });

    it('should return 0.00 if there has been no spend in a given year', function () {
      expect(getTotalSpendThisYear(combinedTrips, 2023)).to.deep.equal('0.00');
    });
  });
});