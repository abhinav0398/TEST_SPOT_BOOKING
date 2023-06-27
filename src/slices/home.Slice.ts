import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
};

const homeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = homeSlice.actions;

export default homeSlice.reducer;
