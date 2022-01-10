import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, child, remove, update } from 'firebase/database';
import { signIn, signOutReducer } from '../auth/authSlice';
import { store } from '../store';
import { fetchMovie, fetchShows, showLoader, removeContent, hideLoader } from './firebaseSlice';




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

  store.dispatch(showLoader());
  
  const contentRef = ref(database, `mznm/content/${from}`);

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const payload = Object.keys(data).map(key => {
      return {
        ...data[key]
      }
    })

    switch(from){
      case 'shows/': 
      store.dispatch(fetchShows(payload))
      break;

      case 'movies/': 
      store.dispatch(fetchMovie(payload))
      break;

      default:
      break
    
    }
  })
  
}
interface IAddContent {
  contentType: string, 
  name: string, 
  about: string,
  linkPic: string,
  linkVideo: string
}


export const addToRealtimeDB = (content: IAddContent, id?: string) => {
  let contentKey = push(child(ref(database), content.contentType)).key;
    if (id) {
      contentKey = id
    }
  const pushPayload = {
    name: content.name,
    about: content.about,
    linkPic: content.linkPic,
    linkVideo: content.linkVideo,
    id: contentKey
  }
  update(ref(database, `mznm/content/${content.contentType}${contentKey}`), pushPayload)
}

export const addComment = (
  comment: {name: string, text: string, show: boolean}, 
  contentType: string, 
  id: string
  ) => {
 
  const pushPayload = {
    name: comment.name, 
    text: comment.text,
    show: comment.show
  }
  update(ref(database, `mznm/content/${contentType}/${id}/comments`), pushPayload)
}



export const removeFromRealtimeDB = (from:string, id:string | null) => {
  if (!id || !from) return;
  const contentKey = ref(database, `mznm/content/${from + id}`);
  remove(contentKey);
  store.dispatch(removeContent({from, id}))

}


//================== AUTHENTICATION ========================//

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const authWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result!.user;
    store.dispatch(signIn({
      name: user.displayName,
      pic: user.photoURL, 
      uid: user.uid,
    }));
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