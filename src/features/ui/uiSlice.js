import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Songs',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateHeaderTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { updateHeaderTitle } = uiSlice.actions;
export default uiSlice.reducer;
