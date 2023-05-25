import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
  loginProcess: true,
  location: null,
  locationKey: null,
  locationName: null,
  favoriteBra: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    keepUsername: (state, action) => {
      state.username = action.payload;
    },
    keepToken: (state, action) => {
      state.token = action.payload;
    },

    //LOGIN PROCESS ON OR OFF
    showLoginProcess: (state, action) => {
      state.loginProcess = action.payload;
    },

    // CURRENT LOCALISATION
    keepLocation: (state, action) => {
      state.location = action.payload;
    },

    keepLocationInfo: (state, action) => {
      state.locationKey = action.payload.locationKey;
      state.locationName = action.payload.locationName;
    },

    keepFavoriteBra: (state, action) => {
      state.favoriteBra = action.payload;
    },
    
    logout: (state) => {
      state = {
        username: null,
        token: null,
        loginProcess: true,
        location: null,
        locationKey: null,
        locationName: null,
        favoriteBra: null,
      };
    },
  },
});

export const {
  keepUsername,
  keepToken,
  keepLocation,
  keepLocationInfo,
  keepFavoriteBra,
  showLoginProcess,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
