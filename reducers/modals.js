import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  loginModal: false,
  signUpModal: false,
  healthForm: false,
};
export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    //SHOW THE DIFFERENT MODAL ONE AFTER THE OTHER
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
      // console.log("loginModal", state);
    },
    setSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
      //console.log("SignUpModal", action.payload);
    },

    //SHOW HEALTH FORM
    showHealthForm: (state, action) => {
      state.healthForm = action.payload;
      //console.log("showHealthForm", action.payload);
    },
  },
});

export const {
  setLoginModal,
  setSignUpModal,
  showHealthForm,
  showLoginProcess,
} = modalsSlice.actions;
export default modalsSlice.reducer;
