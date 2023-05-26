import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL, params } from './queryParams';

interface auth {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
}

export const fetchAuth = createAsyncThunk<auth>(
  'vacancies/fetchAuth',

  async () => {
    const response = await fetch(
      `${BASE_URL}${params.AUTH_PATH}?login=${params.LOGIN}&password=${params.PASSWORD}&client_id=${params.CLIENT_ID}&client_secret=${params.CLIENT_SECRET}&hr=${params.HR}`,
      {
        headers: {
          'X-Api-App-Id': params.CLIENT_SECRET,
          'x-secret-key': params.X_SECRET_KEY,
        },
      },
    );

    const data: auth = await response.json();

    return data;
  },
);

interface AuthState {
  auth: boolean;
  token: string | null;
  refresh: string | null;
}

const initialState = {
  auth: localStorage.getItem('auth') || false,
  token: null,
  refresh: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.token = payload.access_token;
      state.refresh = payload.refresh_token;
      state.auth = true;
      localStorage.setItem('auth', JSON.stringify(state.auth));
      localStorage.setItem('token', JSON.stringify(state.token));
      localStorage.setItem('refresh_token', JSON.stringify(state.refresh));
    });
  },
});

export default authSlice.reducer;
