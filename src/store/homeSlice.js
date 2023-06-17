import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        ability: {},
        types: {},
        species: {}
    },
    reducers: {
        getabilities: (state, action) => {
            state.ability = action.payload;
        },
        getaTypes: (state, action) => {
            state.types = action.payload;
        },
        getSpecies: (state, action) => {
            state.species = action.payload;
        }
    },
});

export const { getApi, getabilities, getaTypes, getSpecies} = homeSlice.actions;

export default homeSlice.reducer;