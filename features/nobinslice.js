import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogedIn:
    typeof window !== "undefined"
      ? localStorage.getItem("isUserLogedin")
        ? JSON.parse(localStorage.getItem("isUserLogedin"))
        : false
      : false,
  userDetails:
    typeof window !== "undefined"
      ? localStorage.getItem("NobinmUser")
        ? JSON.parse(localStorage.getItem("NobinUser"))
        : null
      : null,
};

export const counterSlice = createSlice({
  name: "nobin",
  initialState,
  reducers: {
    handleUserLogin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLogedIn = action.payload;
      localStorage.setItem("isUserLogedin", state.isLogedIn);
    },

    handleUserDetails: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("NobinUser", state.isLogedIn);
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleUserDetails, handleUserLogin } = counterSlice.actions;

export default counterSlice.reducer;
