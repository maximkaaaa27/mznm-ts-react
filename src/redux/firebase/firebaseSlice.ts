import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';



const initialState = {
  show: {
    shows: [''],
    title: null,
    href: null,
    about: null
  },
  movies: {
    movies: [''],
    title: null,
    href: null,
    about: null
  }
}



const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    addShow: (state, action: PayloadAction<{}>) => {
      Object.keys(action.payload).map(i => state.show.shows.push(i))
    },
    fetchShow: () => {
     
    },

    removeShow: () => {

    }
  },
})

export const { addShow } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;