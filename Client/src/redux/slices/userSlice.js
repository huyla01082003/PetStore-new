import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLogginState: (state, action) => {
            state.loggedIn = action.payload;
        },
        signin: (state, action) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null
        }
    }
})

export const { signin, signout, changeLogginState } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;   