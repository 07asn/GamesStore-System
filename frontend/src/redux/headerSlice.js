// src/redux/helperHeaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'EN',
  currency: 'USD',
  theme: 'light', // "light" or "night"
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === 'EN' ? 'AR' : 'EN';
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'night' : 'light';
    },
  },
});

export const { toggleLanguage, setCurrency, toggleTheme } = headerSlice.actions;
export default headerSlice.reducer;
