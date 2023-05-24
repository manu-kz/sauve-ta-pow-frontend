import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
  departure: null, 
  departureName: null,
  waypoints: null,
  waypointsName: null,
  arrival: null,
  arrivalName: null,
  time: null,
  itineraryImg: null,
  itineraryName: null,
  membersNumber: null,
  date: null,
  members: null,
  supervisor: null,
  discipline: null,
},
};

export const itinerariesSlice = createSlice({
  name: 'itineraries',
  initialState,
  reducers: {
    //  reducer en deux parties:

    // infos recupré de la scren map
    addItineraryFirstPart: (state, action) => {
      const initial = state.value
      console.log('action payload ===>',action.payload.itineraryImg)
      initial.departure = action.payload.departure
      initial.departureName = action.payload.departureName
      initial.waypoints = action.payload.waypoints
      initial.waypointsName = action.payload.waypointsName
      initial.arrival = action.payload.arrival
      initial.arrivalName = action.payload.arrivalName
      initial.time = action.payload.time
      initial.itineraryImg = action.payload.itineraryImg
    },

    // infos recupérés depuis le swipe up 
    addItinerarySecondtPart: (state, action) => {
      const initial = state.value

      initial.itineraryName = action.payload.itineraryName
      initial.membersNumber = action.payload.membersNumber
      initial.date = action.payload.date
      initial.members = action.payload.members
      initial.supervisor = action.payload.supervisor
      initial.discipline = action.payload.discipline
    },
    removeItinerary: (state, action) => {
      state.value = {
        departure: null, 
        departureName: null,
        waypoints: null,
        waypointsName: null,
        arrival: null,
        arrivalName: null,
        time: null,
        itineraryImg: null,
        itineraryName: null,
        memberNumber: null,
        date: null,
        members: null,
        supervisor: null,
        discipline: null,
      }
    },
    openItinerary: (state, action) => {
      state.value.entireArticle = action.payload
    },
  },
});

export const { addItineraryFirstPart, addItinerarySecondtPart,  removeItinerary, openItinerary } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;