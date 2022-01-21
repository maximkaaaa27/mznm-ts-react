import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IComments {
  [key: string]: {
    textContent: string
    date: number
    userName: string
    userPic: string
    visible: boolean
    id: string
}
}


export interface IPayload {
  name: string,
  about: string,
  linkPic: string,
  linkVideo: string,
  id: string,
  comments: IComments,
}



interface IState {
  movies: IPayload[]
  shows: IPayload[]
  loading: boolean
}

const initialState: IState = {
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