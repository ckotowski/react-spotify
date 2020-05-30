import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action) {
      console.log(action.payload);
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
