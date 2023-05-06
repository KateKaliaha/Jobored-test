import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Vacancies, Vacancy } from '../models';
import { BASE_URL, params } from './queryParams';

interface paramsFetchVacancies {
  token: string;
  page: number;
  keyword?: string;
  payment_from: number | string;
  payment_to: number | string;
  catalogueKey: number | string;
}

export const fetchVacanciesCatalog = createAsyncThunk<Vacancies, paramsFetchVacancies>(
  'vacancies/fetchCatalog',

  async ({ token, page = '0', keyword = '', payment_from, payment_to, catalogueKey }) => {
    const response = await fetch(
      `${BASE_URL}${params.VACANCIES_PATH}/?count=${params.COUNT_CARDS_PER_PAGE}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}&catalogues=${catalogueKey}&page=${page}&no_agreement=1`,
      {
        headers: {
          'X-Api-App-Id': params.CLIENT_SECRET,
          'x-secret-key': params.X_SECRET_KEY,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: Vacancies = await response.json();

    return data;
  },
);

interface paramsFetchVacancy {
  id: number;
  token: string;
}

export const fetchVacancyById = createAsyncThunk<Vacancy, paramsFetchVacancy>(
  'vacancy/fetchVacancy',

  async ({ id, token }) => {
    const response = await fetch(`${BASE_URL}${params.VACANCIES_PATH}/${id}`, {
      headers: {
        'X-Api-App-Id': params.CLIENT_SECRET,
        'x-secret-key': params.X_SECRET_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    const data: Vacancy = await response.json();

    return data;
  },
);

interface VacanciesState {
  listVacancies: Vacancy[];
  vacancy: Vacancy | null;
  total: number;
  loader: boolean;
}

const initialState = {
  listVacancies: [],
  vacancy: null,
  total: 0,
  loader: false,
} as VacanciesState;

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(fetchVacancyById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchVacancyById.fulfilled, (state, action) => {
      state.vacancy = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchVacancyById.rejected, (state) => {
      state.vacancy = null;
      state.loader = false;
    });
  },
});

export default vacanciesSlice.reducer;
