import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import industriesSlice from './industriesSlice';
import vacanciesSlice from './vacanciesSlice';

const store = configureStore({
  reducer: {
    industries: industriesSlice,
    vacancies: vacanciesSlice,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
