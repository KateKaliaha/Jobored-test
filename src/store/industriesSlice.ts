import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Industry } from '../models';
import { BASE_URL, params } from './queryParams';

interface paramsFetchIndustries {
  token: string;
}

export const fetchIndustriesCatalog = createAsyncThunk<Industry[], paramsFetchIndustries>(
  'industries/fetchCatalog',

  async ({ token }) => {
    const response = await fetch(`${BASE_URL}${params.INDUSTRY_PATH}`, {
      headers: {
        'X-Api-App-Id': params.CLIENT_SECRET,
        'x-secret-key': params.X_SECRET_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    const data: Industry[] = await response.json();

    return data;
  },
);

interface IndustriesState {
  list: Industry[];
}

const initialState = {
  list: [],
} as IndustriesState;

const industriesSlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIndustriesCatalog.fulfilled, (state, action) => {
      state.list = [...action.payload];
    });
  },
});

export default industriesSlice.reducer;
