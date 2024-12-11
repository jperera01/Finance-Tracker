import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: JSON.parse(localStorage.getItem('profile')) || null,
  reducers: {
    setProfile: (state, action) => {
      const profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    },
    clearProfile: () => {
      localStorage.removeItem('profile');
      return null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
