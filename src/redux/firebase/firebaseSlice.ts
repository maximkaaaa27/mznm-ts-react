import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';



interface IState {
  content: IPayload[],
  loading: boolean
}

const initialState: IState = {
  content: [],
  loading: false,
}

export interface IPayload {
    title: string,
    about: string
  }

  
const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    showLoader: (state) => ({...state, loading: true}),
    addContent: () => {
 
    },
    fetchContent: (state, action: PayloadAction<any[]>) => ({
      ...state, content: action.payload, loading: false
    }),
    
    removeContent: () => {

    }
  },
})

export const { addContent, fetchContent, showLoader } = firebaseSlice.actions;

export const selectCount = (state: RootState) => state.firebase;

export default firebaseSlice.reducer;