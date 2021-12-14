import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import firebaseReducer from './firebase/firebaseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firebase: firebaseReducer
  }  
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
