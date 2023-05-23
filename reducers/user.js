import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: null, token: null, location: null, locationKey:null, locationName:null, favoriteBra:null  }
;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    keepUsername: (state, action) => {
        state.username = action.payload
       
        },
    keepToken: (state, action) => {
            state.token = action.payload
            // console.log('keepUsername', state.username)
            // console.log('keepToken', state.token)
            },
    keepLocation: (state, action) => {
        state.location = action.payload
        },
    keepLocationInfo:(state, action) => {
            state.locationKey = action.payload.locationKey
            state.locationName = action.payload.locationName
            },
    keepFavoriteBra:(state, action) => {
            state.favoriteBra = action.payload
              },  },
});


export const {keepUsername , keepToken, keepLocation, keepLocationInfo, keepFavoriteBra} = userSlice.actions;
export default userSlice.reducer;
