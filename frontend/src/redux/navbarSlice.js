// src/redux/headerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesOpen: false,
  cartOpen: false,
  profileOpen: false,
  mobileSidebarOpen: false,
  searchOpen: false,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    // Categories dropdown
    toggleCategories: (state) => {
      state.categoriesOpen = !state.categoriesOpen;
    },
    setCategoriesOpen: (state, action) => {
      state.categoriesOpen = action.payload;
    },

    // Cart dropdown
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    },

    // Profile dropdown
    toggleProfile: (state) => {
      state.profileOpen = !state.profileOpen;
    },
    setProfileOpen: (state, action) => {
      state.profileOpen = action.payload;
    },

    // Mobile sidebar
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebar: (state, action) => {
      state.mobileSidebarOpen = action.payload;
    },

    // Mobile search (optional)
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setSearch: (state, action) => {
      state.searchOpen = action.payload;
    },
  },
});

export const {
  toggleCategories,
  setCategoriesOpen,
  toggleCart,
  setCartOpen,
  toggleProfile,
  setProfileOpen,
  toggleMobileSidebar,
  setMobileSidebar,
  toggleSearch,
  setSearch,
} = navbarSlice.actions;

export default navbarSlice.reducer;
