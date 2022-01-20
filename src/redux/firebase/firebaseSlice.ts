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

export interface ICurrent {
    name: string
    linkPic: string,
    linkVideo: string,
    id: string,
    comments: any[],
  
}

interface IState {
  movies: IPayload[]
  shows: IPayload[]
  current: ICurrent
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

    fetchContent: (state, action: PayloadAction<{from: string, contentArr: any[]}>) => ({
      ...state, [action.payload.from]: action.payload.contentArr, loading: false
    }),

    setCurrent: (state, action: PayloadAction<any>) => ({
      ...state, current: {
        ...action.payload,
        comments: Object.keys(action.payload.comments).map(key => {
          return {
            ...action.payload.comments[key]
          }
        })
      }
    }),
  },
})

export const { 
  fetchContent,
  setCurrent,
  showLoader, 
  hideLoader } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;