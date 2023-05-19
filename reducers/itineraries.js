import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const itinerariesSlice = createSlice({
 name: 'itineraries',

  initialState,
 reducers: {
   addItineraries: (state, action) => {
     state.value.push(action.payload);
   },
   removePlace: (state, action) => {
    state.value = [];
  },
 },
});

export const { addItineraries,removePlace } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;