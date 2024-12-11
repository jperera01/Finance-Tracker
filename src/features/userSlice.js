// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  balance: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserProfile, setUserBalance, setError } = userSlice.actions;

export default userSlice.reducer;
