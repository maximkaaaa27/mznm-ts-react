import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, child, remove, update } from 'firebase/database';
import { signIn, signOutReducer } from '../auth/authSlice';
import { store } from '../store';
import { IAddComment, IAddContent } from './addTypes';
import { fetchContent, showLoader, hideLoader } from './firebaseSlice';




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


//================== REALTIME DATABASE========================//

const database = getDatabase(app);


export const fetchFromRealtimeDB = async (from: string) => {
  const contentRef = ref(database, `mznm/content/${from}`);

  store.dispatch(showLoader());

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const contentArr = Object.keys(data).map(key => {
      return {
        ...data[key]
      }
    })
    store.dispatch(fetchContent({contentArr, from: from.slice(0,-1)}))
  })
  
}


export const addToRealtimeDB = (content: IAddContent) => {
  let id = push(child(ref(database), content.contentType)).key;
  const pathDB = `mznm/content/${content.contentType}${id}`
  update(ref(database, pathDB), {...content, id})
}

export const changeCardDB = (content: IAddContent, id: string) => {
  update(ref(database, `mznm/content/${content.contentType}${id}`), {...content})
}

export const addCommentToDB = ({comment, to}: IAddComment) => {
  const id = push(child(ref(database), `${to.contentLink}${to.id}/comments/`)).key;
  const path = `mznm/content/${to.contentLink}${to.id}/comments/${id}`;
  update(ref(database, path), {...comment, id});
}

export const changeVisiblePropComment = ({from, id, commentId, visible} : {from: string, id: string, commentId: string, visible: boolean}) => {
  const contentRef = ref(database, `mznm/content/${from + id}/comments/`);
  const commentRef = ref(database, `mznm/content/${from + id}/comments/${commentId}`);

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const targetComment = data[commentId];
    update(commentRef, {...targetComment, visible})
  })
}

export const removeComment = ({from, id, commentId} : {from: string, id: string, commentId: string}) => {
  const commentKey = ref(database, `mznm/content/${from + id}/comments/${commentId}`);
  remove(commentKey);
}



export const removeFromRealtimeDB = (from:string, id:string | null) => {
  if (!id || !from) return;
  const contentKey = ref(database, `mznm/content/${from + id}`);
  remove(contentKey);
}


//================== AUTHENTICATION ========================//

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const authWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result!.user;
    const payload = {
      name: user.displayName,
      pic: user.photoURL, 
      uid: user.uid,
    }
    sessionStorage.setItem('client', JSON.stringify(payload))
    store.dispatch(signIn(payload));
  })
  .catch((error) => {
    console.error('Google Popup' + error.code);
  })
}

export const signOutGoogle = () => {
  signOut(auth).then(() => {
    sessionStorage.removeItem('client');
    store.dispatch(signOutReducer())
  }).catch((error) => {
    console.log(error)
  });
}