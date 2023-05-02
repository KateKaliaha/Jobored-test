import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Vacancies, Vacancy } from '../models';
import { BASE_URL, params } from './queryParams';

interface auth {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
}

export const fetchAuth = createAsyncThunk<string>(
  'vacancies/fetchAuth',

  async () => {
    const response = await fetch(
      `${BASE_URL}${params.AUTH_PATH}?login=${params.LOGIN}&password=${params.PASSWORD}&client_id=${params.CLIENT_ID}&client_secret=${params.CLIENT_SECRET}&hr=${params.HR}`,
      {
        headers: params.HEADERS,
      },
    );

    const data: auth = await response.json();

    return data.access_token;
  },
);

interface paramsFetchVacancies {
  token: string;
  page: number;
  keyword?: string;
  payment_from: number | null;
  payment_to: number | null;
  catalogueKey: number | null;
}

export const fetchVacanciesCatalog = createAsyncThunk<Vacancies, paramsFetchVacancies>(
  'vacancies/fetchCatalog',

  async ({ token, page = '0', keyword = '', payment_from, payment_to, catalogueKey }) => {
    const response = await fetch(
      `${BASE_URL}${params.VACANCIES_PATH}/?count=${params.COUNT_CARDS_PER_PAGE}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}&catalogues=${catalogueKey}&page=${page}&no_agreement=1`,
      {
        headers: {
          'X-Api-App-Id': params.CLIENT_SECRET,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: Vacancies = await response.json();

    return data;
  },
);

interface VacanciesState {
  listVacancies: Vacancy[];
  token: string | null;
  total: number;
  loader: boolean;
  payment_from: number | null;
  payment_to: number | null;
  catalogueKey: number | null;
  page: number;
  keyword: string;
}

const initialState = {
  listVacancies: [],
  token: null,
  total: 0,
  loader: false,
  payment_from: null,
  payment_to: null,
  catalogueKey: null,
  page: 1,
  keyword: '',
} as VacanciesState;

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    changePaymentFrom: (state, action: PayloadAction<number>) => {
      state.payment_from = action.payload;
    },
    changePaymentTo: (state, action: PayloadAction<number>) => {
      state.payment_to = action.payload;
    },
    changeCatalogueKey: (state, action: PayloadAction<number>) => {
      state.catalogueKey = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.token = payload;
    });
    builder.addCase(fetchVacanciesCatalog.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchVacanciesCatalog.fulfilled, (state, action) => {
      state.listVacancies = action.payload.objects;
      state.total = action.payload.total;
      state.loader = false;
    });
    builder.addCase(fetchVacanciesCatalog.rejected, (state) => {
      state.listVacancies = [];
      state.total = 0;
      state.loader = false;
    });
  },
});

export const {
  changePaymentFrom,
  changePaymentTo,
  changeCatalogueKey,
  changePage,
  changeKeyword,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
