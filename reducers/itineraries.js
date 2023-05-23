import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
  departure: null, 
  waypoint: null,
  waypointName: null,
  arrival: null,
  time: null,
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
    // reducer en deux partie :
    // premier ajout avec departure/waypoint/waypointName/arrival
    // deuxième partie avec itineraryName/memberNumber/date/members/supervisor/discipline
    addItinerariesFirstPart: (state, action) => {
      const initial = state.value
      initial.departure = action.payload.departure
      initial.waypoint = action.payload.waypoint
      initial.waypointName = action.payload.waypointName
      initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
      // initial.arrival = action.payload.arrival
    },
    addItinerariesSecondPart: (state, action) => {
      console.log('action payload ==> ', action.payload)
      state.value.push(action.payload);
    },
    removePlace: (state, action) => {
      state.value = [];
    },
  },
});

export const { addItinerariesFirstPart, removePlace } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;