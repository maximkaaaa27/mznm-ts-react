import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, set, ref, onValue } from 'firebase/database';
import { signIn, signOutReducer } from '../auth/authSlice';
import { store } from '../store';
import { fetchContent, showLoader } from './firebaseSlice';




export interface IAdd {
  to: string
  title: string
  about: string
  full: boolean
}



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: "G-MEASUREMENT_ID",
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();



export function addToRealtimeDB (payload: IAdd) {
  set(ref(database, `${payload.to}${payload.title}`), {
      title: payload.title,
      about: payload.about
  })
}

export const fetchFromRealtimeDB = async (from: string) => {
  store.dispatch(showLoader());
  
  const contentRef = ref(database, from);

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (data === null) return;
    const payload = Object.keys(data).map(key => {
      return {
        ...data[key]
      }
    })
    store.dispatch(fetchContent(payload));
  })
  
}

export const authWithGoogle = () => {

  signInWithPopup(auth, provider).then((result) => {
    const user = result!.user;
    store.dispatch(signIn({user: user.displayName, pic: user.photoURL}));
  })
  .catch((error) => {
    console.error('Google Popup' + error.code);
  })

}

export const signOutGoogle = () => {
  signOut(auth).then(() => {
    store.dispatch(signOutReducer())
  }).catch((error) => {
    console.log(error)
  });
}