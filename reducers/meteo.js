import { createSlice } from '@reduxjs/toolkit';

const initialState = { weatherIcon: null, weatherText: null, temperature: null  }
;

export const meteoSlice = createSlice({
  name: 'meteo',
  initialState,
  reducers: {
    addLocalWeather: (state, action) => {
        state.weatherIcon = action.payload.weatherIcon
        state.weatherText = action.payload.weatherText
        state.temperature = action.payload.temperature
        },
  },
});


export const {addLocalWeather} = meteoSlice.actions;
export default meteoSlice.reducer;
