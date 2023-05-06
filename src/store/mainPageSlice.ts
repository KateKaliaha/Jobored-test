import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { Vacancy } from '../models';

interface MainPageState {
  // listVacancies: Vacancy[];
  // total: number;
  payment_from: number | string;
  payment_to: number | string;
  catalogueKey: number | string;
  page: number;
  keyword: string;
}

const initialState = {
  // listVacancies: [],
  // total: 0,
  payment_from: '',
  payment_to: '',
  catalogueKey: '',
  page: 1,
  keyword: '',
} as MainPageState;

const mainPageStateSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    changePaymentFrom: (state, action: PayloadAction<number | string>) => {
      state.payment_from = action.payload;
    },
    changePaymentTo: (state, action: PayloadAction<number | string>) => {
      state.payment_to = action.payload;
    },
    changeCatalogueKey: (state, action: PayloadAction<number | string>) => {
      state.catalogueKey = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  changePaymentFrom,
  changePaymentTo,
  changeCatalogueKey,
  changePage,
  changeKeyword,
} = mainPageStateSlice.actions;

export default mainPageStateSlice.reducer;
