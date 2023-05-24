import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
  loginProcess:true,
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
        state.username = action.payload
        },
    keepToken: (state, action) => {
      state.token = action.payload;
      // console.log('keepUsername', state.username)
      // console.log('keepToken', state.token)
    },

    //LOGIN PROCESS ON OR OFF
    showLoginProcess: (state, action) => {
      state.loginProcess = action.payload;
      console.log("loginProcess", showLoginProcess);
    },

    keepLocation: (state, action) => {
      state.location = action.payload;
      // console.log('state.location', state.location)
    },
    keepLocationInfo: (state, action) => {
      state.locationKey = action.payload.locationKey;
      state.locationName = action.payload.locationName;
      
    },
    keepFavoriteBra: (state, action) => {
      state.favoriteBra = action.payload;
      console.log('state.favoriteBra', state.favoriteBra)
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
} = userSlice.actions;
export default userSlice.reducer;
