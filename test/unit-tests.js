////////////////////* Imports *////////////////////
import chai from 'chai';
const expect = chai.expect;
const { getTravelerTripsData } = require('../src/script-definitions.js');
const { travelers, trips, destinations } = require('./test-data.js');

////////////////////* Tests *////////////////////
describe('traveler object creation', function () {
  it('should add trips data to user object', function () {
    const traveler1 = travelers[0];
    const traveler2 = travelers[1];

    expect(getTravelerTripsData(traveler1, trips)).to.deep.equal({
      id: 1,
      name: 'Ham Leadbeater',
      travelerType: 'relaxer',
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
      ]
    });

    expect(getTravelerTripsData(traveler2, trips)).to.deep.equal({
      id: 2,
      name: 'Rachael Vaughten',
      travelerType: 'thrill-seeker',
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
      ]
    });
  });
});