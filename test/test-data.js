////////////////////* Travelers *////////////////////
const travelers = [
  {
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer"
  },
  {
    "id": 2,
    "name": "Rachael Vaughten",
    "travelerType": "thrill-seeker"
  },
  {
    "id": 3,
    "name": "Sibby Dawidowitsch",
    "travelerType": "shopper"
  }
]
////////////////////* Trips *////////////////////
const trips = [
  {
    "id": 117,
    "userID": 1,
    "destinationID": 28,
    "travelers": 3,
    "date": "2021/01/09",
    "duration": 15,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 89,
    "userID": 2,
    "destinationID": 10,
    "travelers": 5,
    "date": "2019/09/27",
    "duration": 13,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 100,
    "userID": 2,
    "destinationID": 6,
    "travelers": 6,
    "date": "2020/3/28",
    "duration": 10,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 116,
    "userID": 2,
    "destinationID": 7,
    "travelers": 3,
    "date": "2020/04/03",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 166,
    "userID": 2,
    "destinationID": 7,
    "travelers": 2,
    "date": "2020/03/05",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 171,
    "userID": 2,
    "destinationID": 43,
    "travelers": 1,
    "date": "2020/12/27",
    "duration": 18,
    "status": "pending",
    "suggestedActivities": []
  },
  {
    "id": 177,
    "userID": 2,
    "destinationID": 20,
    "travelers": 6,
    "date": "2020/01/29",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
  }
]

////////////////////* Destinations *////////////////////
const destinations = [
  {
    "id": 6,
    "destination": "Jakarta, Indonesia",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 890,
    "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "lit up city at night"
  },
  {
    "id": 7,
    "destination": "Paris, France",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 395,
    "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    "alt": "city during the day time with eiffel tower"
  },
  {
    "id": 10,
    "destination": "Toronto, Canada",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 450,
    "image": "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
  },
  {
    "id": 20,
    "destination": "Miami, Florida",
    "estimatedLodgingCostPerDay": 158,
    "estimatedFlightCostPerPerson": 275,
    "image": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
    "alt": "sand with palm trees and tall buildings in the background"
  },
  {
    "id": 28,
    "destination": "San Juan, Puerto Rico",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 900,
    "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
    "alt": "white and brown concrete buildings near sea under white clouds during daytime"
  },
  {
    "id": 43,
    "destination": "Nassau, The Bahamas",
    "estimatedLodgingCostPerDay": 550,
    "estimatedFlightCostPerPerson": 90,
    "image": "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
    "alt": "aerial photography of white and blue cruise ships during daytime"
  }
]

////////////////////* Exports *////////////////////
export {
  travelers,
  trips,
  destinations
}