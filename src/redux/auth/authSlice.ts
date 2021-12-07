import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuthState {
  auth: {
    user: string | null,
    token: string | null
  } 
}

const initialState: AuthState = {
  auth: {
    user: null,
    token: null
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<any>) => {
      state.auth.user = action.payload.user;
      state.auth.token = action.payload.token;
    },
    logOut: (state) => {
      state.auth.user = null;
      state.auth.token = null;
    }
  },
})

export const { logIn, logOut } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;