// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarSlice';
import headerReducer from './headerSlice';
import accountDetailsReducer from './accountDetailsSlice';

export default configureStore({
  reducer: {
    navbar: navbarReducer,
    header: headerReducer,
    accountDetails: accountDetailsReducer
  },
});
