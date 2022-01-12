import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export interface IPayload {
  name: string,
  about: string,
  link: string,
  linkPic: string,
  linkVideo: string,
  id: string,
  comments: any[],
}



interface IState {
  movies: IPayload[]
  shows: IPayload[]
  current: {
    name: string
    linkPic: string,
    linkVideo: string,
    id: string,
    comments: any[],
  }
  loading: boolean
}

const initialState: IState = {
  movies: [],
  shows: [],
  current: {
    name: '',
    linkPic: '',
    linkVideo: '',
    id: '',
    comments: []
  },
  loading: false,
}



const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    showLoader: (state) => ({...state, loading: true}),

    hideLoader: (state) => ({...state, loading: false}),

    setCurrent: (state, action: PayloadAction<any>) => ({
      ...state, current: action.payload
    }),

    addCoolComment: (state, action: PayloadAction<{userName: string, comment: string, visible: boolean}>) => ({
      ...state, current: state.current
    }),

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

export const { 
  fetchMovie, 
  fetchShows, 
  removeContent, 
  setCurrent,
  showLoader, 
  hideLoader } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;