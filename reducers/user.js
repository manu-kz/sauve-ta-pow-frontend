import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: null, token: null  }
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
            console.log('keepUsername', state.username)
            console.log('keepToken', state.token)
            }
  },
});


export const {keepUsername , keepToken} = userSlice.actions;
export default userSlice.reducer;
