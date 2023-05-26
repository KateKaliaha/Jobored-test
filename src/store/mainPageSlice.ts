import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageState {
  payment_from: string;
  payment_to: string;
  catalogueKey: number | string;
  page: number;
  keyword: string;
}

const initialState = {
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
    changePaymentFrom: (state, action: PayloadAction<string>) => {
      state.payment_from = action.payload;
    },
    changePaymentTo: (state, action: PayloadAction<string>) => {
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
