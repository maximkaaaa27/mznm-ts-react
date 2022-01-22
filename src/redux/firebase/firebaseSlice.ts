import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IContent, IFirebaseState } from './interfaces';


const initialState: IFirebaseState = {
  movies: [],
  shows: [],
  loading: false,
}


const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    showLoader: (state) => ({...state, loading: true}),

    hideLoader: (state) => ({...state, loading: false}),

    fetchContent: (state, action: PayloadAction<{from: string, contentArr: IContent[]}>) => ({
      ...state, [action.payload.from]: action.payload.contentArr, loading: false
    }),
  }
})

export const { 
  fetchContent,
  showLoader, 
  hideLoader } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;