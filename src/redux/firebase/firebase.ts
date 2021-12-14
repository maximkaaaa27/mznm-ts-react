import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, set, ref, onValue } from 'firebase/database';

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
export const database = getDatabase(app);
export const auth = getAuth(app);

export const addToRealtimeDB = (payload: IAdd) => {
  set(ref(database, `${payload.to}${payload.title}`), {
      title: payload.title,
      about: payload.about
  })
}

export const fetchFromRealtimeDB = (target: {id: string}) => {
  const contentRef = ref(database, target.id);

  onValue(contentRef, (snap) => {
    const data = snap.val()
    return data
  })
  
}