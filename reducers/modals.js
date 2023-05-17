import { createSlice } from '@reduxjs/toolkit';

const initialState = { loginModal: false, signUpModal: false  }
;

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setLoginModal: (state, action) => {
        state.loginModal = action.payload
        console.log('loginM', state)
        },
    setSignUpModal: (state, action) => {
            state.signUpModal = action.payload
            console.log('SignUpModal', action.payload)
            }
  },
});

export const {setLoginModal , setSignUpModal} = modalsSlice.actions;
export default modalsSlice.reducer;
