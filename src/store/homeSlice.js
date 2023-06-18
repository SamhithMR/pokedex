import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
      ability: {},
      types: {},
      species: {},
      bookmarks: [], // New state property for bookmarks
    },
    reducers: {
      getabilities: (state, action) => {
        state.ability = action.payload;
      },
      getTypes: (state, action) => {
        state.types = action.payload;
      },
      getSpecies: (state, action) => {
        state.species = action.payload;
      },
      toggleBookmark: (state, action) => {
        const { id, bookmarked } = action.payload;
        if (bookmarked) {
          // Add the item to bookmarks if it's not already bookmarked
          if (!state.bookmarks.includes(id)) {
            state.bookmarks.push(id);
          }
        } else {
          // Remove the item from bookmarks
          state.bookmarks = state.bookmarks.filter((item) => item !== id);
        }
      },
    },
  });
  

export const { getApi, getabilities, getTypes, getSpecies, toggleBookmark} = homeSlice.actions;

export default homeSlice.reducer;