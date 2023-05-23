import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: null,
};

export const launchItinerarySlice = createSlice({
 name: 'itineraries',

  initialState,
 reducers: {
   launchItinerary: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { launchItinerary, quitItinerary } = launchItinerarySlice.actions;
export default launchItinerarySlice.reducer;