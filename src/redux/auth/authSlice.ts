import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';



const initialState = {
  user: {}
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{}>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    }
  },
})

export const { signIn, logOut } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;