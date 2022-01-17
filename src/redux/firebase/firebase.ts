import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, child, remove, update } from 'firebase/database';
import { signIn, signOutReducer } from '../auth/authSlice';
import { store } from '../store';
import { fetchMovie, fetchShows, showLoader, removeContent, hideLoader, addComment } from './firebaseSlice';




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
  linkVideo: string,
  comments: any[]
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
    comments: content.comments,
    id: contentKey
  }
  update(ref(database, `mznm/content/${content.contentType}${contentKey}`), pushPayload)
}

interface IAddComment {
  payload: {
    comment: string,
    visible: boolean 
  }
  from: {
    userName: string,
    contentType: string, 
    id: string
  }
}

export const addCommentToDB = ({payload, from}: IAddComment) => {
  let contentKey = push(child(ref(database), `${from.contentType}${from.id}/comments/`)).key;
  const forSend = {
    user: from.userName,
    comment: payload.comment,
    visible: payload.visible,
    date: Date.now(),
    id: contentKey
  }

  const destination = `mznm/content/${from.contentType}${from.id}/comments/${contentKey}`;
  const contentRef = ref(database, `mznm/content/${from.contentType}`);
  update(ref(database, destination), forSend);

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const comments = data[from.id].comments;
    const payload = Object.keys(comments).map(key => {
      return {
        ...comments[key]
      }
    })
    store.dispatch(addComment(payload));
  })
}

export const changeVisiblePropComment = ({from, id, commentId} : {from: string, id: string, commentId: string}) => {
  const contentRef = ref(database, `mznm/content/${from + id}/comments/`);
  const commentRef = ref(database, `mznm/content/${from + id}/comments/${commentId}`);

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const targetComment = data[commentId];
    update(commentRef, {...targetComment, visible: true})
    const payload = Object.keys(data).map(key => {
      return {
        ...data[key]
      }
    })
    store.dispatch(addComment(payload));
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
  store.dispatch(removeContent({from, id}));
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