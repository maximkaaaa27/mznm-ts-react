import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';



const initialState = {
  auth: {
    user: {}
  },
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{user: string, token: string}>) => {
      state.auth.user = action.payload;
    },
    logOut: (state) => {
      state.auth.user = {};
    }
  },
})

export const { logIn, logOut } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;