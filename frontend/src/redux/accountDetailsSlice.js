import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showModal: false,
};

const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState,
    reducers: {
        openModal: (state) => {
            state.showModal = true;
        },
        closeModal: (state) => {
            state.showModal = false;
        },
    },
});

export const { openModal, closeModal } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;
