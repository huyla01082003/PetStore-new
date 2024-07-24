import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    loggedIn: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        changeLogginState: (state, action) => {
            state.loggedIn = action.payload;
        },
        signin: (state, action) => {
            state.admin = action.payload;
        },
        signout: (state) => {
            state.admin = null
        }
    }
})

export const { signin, signout, changeLogginState } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;

export default adminSlice.reducer;   