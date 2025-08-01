// src/redux/studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    modalShow: false,
    typeModal: "",
  },
  reducers: {
    setModalShow: (state, action) => {
      state.modalShow = action.payload;
    },
    setTypeModal: (state, action) => {
      state.typeModal = action.payload;
    },
  },
});

export const { setModalShow, setTypeModal } = studentSlice.actions;
export default studentSlice.reducer;
