import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Industry } from '../models';
import { BASE_URL, params } from './queryParams';

export const fetchIndustriesCatalog = createAsyncThunk<Industry[]>(
  'industries/fetchCatalog',

  async () => {
    const response = await fetch(`${BASE_URL}${params.INDUSTRY_PATH}`, {
      headers: params.HEADERS,
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
