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

export const fetchAuth = createAsyncThunk<string>(
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

    return data.access_token;
  },
);

interface AuthState {
  auth: boolean;
  token: string | null;
}

const initialState = {
  auth: localStorage.getItem('auth') || false,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token') as string)
    : null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.auth = true;
      localStorage.setItem('auth', JSON.stringify(state.auth));
      localStorage.setItem('token', JSON.stringify(state.token));
    });
  },
});

export default authSlice.reducer;
