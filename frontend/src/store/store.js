// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    student: studentReducer, // add more slices as needed
  },
});

export default store;
