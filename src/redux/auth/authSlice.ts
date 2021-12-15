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
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload;
    },
    signOutReducer: (state) => {

      state.user = {};
      localStorage.setItem('user', JSON.stringify(null))
    }
  },
})

export const { signIn, signOutReducer } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;