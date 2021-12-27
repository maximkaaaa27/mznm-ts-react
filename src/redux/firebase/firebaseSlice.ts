import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


interface IState {
  movies: IPayload[],
  shows: IPayload[]
  loading: boolean
}

const initialState: IState = {
  movies: [],
  shows: [],
  loading: false,
}

export interface IPayload {
    name: string,
    about: string,
    link: string,
    linkVideo: string,
    id: string
  }


const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    showLoader: (state) => ({...state, loading: true}),

    hideLoader: (state) => ({...state, loading: false}),

    fetchMovie: (state, action: PayloadAction<any[]>) => ({
      ...state, movies: action.payload, loading: false
    }),

    fetchShows: (state, action: PayloadAction<any[]>) => ({
      ...state, shows: action.payload, loading: false
    }),

    removeContent: (state, action: PayloadAction<{from: string, id: string}>) => {
      switch(action.payload.from) {
        case 'shows/': 
        state.shows = state.shows.filter((i) => i.id !== action.payload.id)
        break;

        case 'movies/': 
        state.movies = state.movies.filter((i) => i.id !== action.payload.id)
        break;
        
        default: 
        return state;
      }
    }
  },
})

export const { fetchMovie, fetchShows, removeContent, showLoader, hideLoader } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;