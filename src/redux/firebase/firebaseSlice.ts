import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IPayload {
  string: {
    about: string
    title: string
  }
}

interface IState {
  shows: [{
    title: string | null
    about: string | null
  }]
  movies: [{
    title: string | null
    about: string | null
  }]
  
}

const initialState: IState = {
  shows: [{
    title: null,
    about: null
  }],
  movies: [{
    title: null,
    about: null
  }]
}



const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    addContent: (state, action: PayloadAction<{title: string, about: string}>) => {
      
    },
    fetchContent: (state, action: PayloadAction<IPayload>) => {
      //Object.keys(action.payload).map((item) => ({shows: action.payload[item]}))
    },

    removeContent: () => {

    }
  },
})

export const { addContent, fetchContent } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;