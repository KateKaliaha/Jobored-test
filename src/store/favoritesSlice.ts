import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Vacancy } from '../models';
import { MAX_NUM_PER_PAGE } from '../pages/main/helpers';

interface FavoritesState {
  lisFavorites: Vacancy[];
  cardsFavPerPage: Vacancy[];
}

const initialState = {
  lisFavorites: JSON.parse(localStorage.getItem('fav') as string) || [],
  cardsFavPerPage: localStorage.getItem('fav')
    ? JSON.parse(localStorage.getItem('fav') as string).slice(0, MAX_NUM_PER_PAGE)
    : [],
} as FavoritesState;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Vacancy>) => {
      state.lisFavorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Vacancy>) => {
      const newFavs = state.lisFavorites.filter((card) => card.id !== action.payload.id);
      state.lisFavorites = newFavs;
    },
    getFavCardsForPage: (state, action: PayloadAction<number>) => {
      const startIndex = (action.payload - 1) * MAX_NUM_PER_PAGE;
      const endIndex = startIndex + MAX_NUM_PER_PAGE - 1;
      state.cardsFavPerPage = state.lisFavorites.slice(startIndex, endIndex + 1);
    },
  },
});

export const { addFavorite, removeFavorite, getFavCardsForPage } = favoritesSlice.actions;

export default favoritesSlice.reducer;
