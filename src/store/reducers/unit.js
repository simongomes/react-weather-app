import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: "celcius",
};

export const unitSlice = createSlice({
  name: "weatherUnit",
  initialState,
  reducers: {
    UPDATE_UNIT: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const { UPDATE_UNIT } = unitSlice.actions;

export default unitSlice.reducer;
