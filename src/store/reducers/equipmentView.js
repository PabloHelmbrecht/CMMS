// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    elementID: null,
    editMode: false,
    viewOpen: false,
};

// ==============================|| SLICE - MENU ||============================== //

const equipmentView = createSlice({
    name: 'equipmentView',
    initialState,
    reducers: {
        setID(state, action) {
            state.elementID = action.payload.elementID;
        },

        activeEditMode(state, action) {
            state.editMode = action.payload.editMode;
        },

        openView(state, action) {
            state.viewOpen = action.payload.viewOpen;
        },

    }
});

export default equipmentView.reducer;

export const { setID, activeEditMode, openView } = equipmentView.actions;
