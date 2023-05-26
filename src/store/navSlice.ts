import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { links } from '../utils/links';

interface NavigationState {
  active: string;
}

const initialState = {
  active: links[0].link,
} as NavigationState;

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changeActiveLink: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { changeActiveLink } = navigationSlice.actions;

export default navigationSlice.reducer;
