import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authSlice from './authSlice';
import favoritesSlice from './favoritesSlice';
import industriesSlice from './industriesSlice';
import mainPageSlice from './mainPageSlice';
import navSlice from './navSlice';
import vacanciesSlice from './vacanciesSlice';

const store = configureStore({
  reducer: {
    industries: industriesSlice,
    vacancies: vacanciesSlice,
    navigation: navSlice,
    auth: authSlice,
    mainPage: mainPageSlice,
    favorites: favoritesSlice,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
