import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  loginModal: false,
  signUpModal: false,
  healthForm: false,
  callModal: false,
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
    //SHOW CALL MODAL
    showCallModal: (state, action) => {
      console.log('reducer modal call ==>',action.payload)
      state.callModal = action.payload;    },
  },
});

export const {
  setLoginModal,
  setSignUpModal,
  showHealthForm,
  showLoginProcess,
  showCallModal
} = modalsSlice.actions;
export default modalsSlice.reducer;
