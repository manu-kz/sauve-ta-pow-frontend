import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
  departure: null, 
  waypoints: null,
  waypointsName: null,
  arrival: null,
  time: null,
  itineraryImg: null,
  itineraryName: null,
  memberNumber: null,
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

      initial.departure = action.payload.departure
      initial.waypoints = action.payload.waypoints
      initial.waypointsName = action.payload.waypointsName
      initial.arrival = action.payload.arrival
      initial.time = action.payload.time
    },

    // infos recupérés depuis le swipe up 
    addItinerarySecondtPart: (state, action) => {
      const initial = state.value

      initial.itineraryName = action.payload.itineraryName
      initial.memberNumber = action.payload.memberNumber
      initial.date = action.payload.date
      initial.members = action.payload.members
      initial.supervisor = action.payload.supervisor
      initial.discipline = action.payload.discipline
    },
    removeItinerary: (state, action) => {
      state.value = {
        departure: null, 
        waypoints: null,
        waypointsName: null,
        arrival: null,
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
  },
});

export const { addItineraryFirstPart, addItinerarySecondtPart,  removeItinerary } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;