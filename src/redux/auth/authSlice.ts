import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


interface IPayload  {
  name: string | null
  pic: string | null
  uid: string | null
}


interface IState  {
  user: IPayload
}


const checkLocalStorage = ():IState => {
  const userLS = localStorage.getItem('user');
  const userLSParsed = () => userLS && JSON.parse(userLS);
  const name = ():null | string => userLSParsed() ? userLSParsed().name : null
  const pic = ():null | string  => userLSParsed() ? userLSParsed().pic : null
  const uid = ():null | string => userLSParsed() ? userLSParsed().uid : null
  

  return {
    user: {
      name: name(), 
      pic: pic(),
      uid: uid(),
    } 
  }
}

const initialState: IState = checkLocalStorage()



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IPayload>) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload;
    },
    signOutReducer: (state) => {
      state.user = {name: null, pic: null, uid: null};
      localStorage.setItem('user', '')
    }
  },
})

export const { signIn, signOutReducer } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;