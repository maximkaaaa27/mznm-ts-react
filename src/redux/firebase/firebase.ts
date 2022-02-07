import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, child, remove, update } from 'firebase/database';
import { signIn, signOutReducer } from '../auth/authSlice';
import { store } from '../store';
import { IAddComment, IContent, IContentShows, IFirebasePath, ISeason } from './interfaces';
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


const fetchFromRealtimeDB = async (from: string) => {

  const contentRef = ref(database, `mznm/content/${from}`);

  store.dispatch(showLoader());

  onValue(contentRef, (snap) => {
    const data = snap.val();
      if (!data) {
        store.dispatch(hideLoader())
        return;
      }
    const contentArr: IContent[] = Object.keys(data).map(key => {
      return {
        ...data[key]
      }
    })
    store.dispatch(fetchContent({contentArr, from: from.slice(0,-1)}))
  })
  
}

const addToRealtimeDB = ({content, to}: {content: IContent, to: IFirebasePath}) => {
  let id = push(child(ref(database), to.contentLink)).key;
  const pathDB = `mznm/content/${to.contentLink}${id}`
  update(ref(database, pathDB), {...content, id})
}

const addShowToRealtimeDB = ({content}: {content: IContentShows}) => {
  const pathDB = `mznm/content/shows/${content.link}`
  update(ref(database, pathDB), {...content})
}

const addSeasonToRealtimeDB = ({content, id}: {content: ISeason, id: string}) => {
  const seasonId = push(child(ref(database), `shows/${id}/seasons/`)).key;
  const pathDB = `mznm/content/shows/${id}/seasons/${content.seasonNumber}season`
  update(ref(database, pathDB), {...content, seasonId})
}

const addEpisodeToRealtimeDB = ({content, link, season}: 
  {
    content: IContent, 
    link: string, 
    season: string
  }) => {
  const id = push(child(ref(database), `shows/${link}/seasons/${season}/episodes/`)).key;
  const pathDB = `mznm/content/shows/${link}/seasons/${season}/episodes/${id}`
  update(ref(database, pathDB), {...content, id})
}


const changeCardDB = ({content, to}: {
  content: IContent,
  to: IFirebasePath
}) => {
  update(ref(database, `mznm/content/${to.contentLink}${content.id}`), {...content})
}

const changeShowCardDB = ({content, to}: {
  content: IContentShows,
  to: IFirebasePath
}) => {
  update(ref(database, `mznm/content/${to.contentLink}${content.link}`), {...content})
}

const addCommentToDB = ({comment, to}: IAddComment) => {
  const id = push(child(ref(database), `${to.contentLink}${to.contentId}/comments/`)).key;
  const path = `mznm/content/${to.contentLink}${to.contentId}/comments/${id}`;
  update(ref(database, path), {...comment.contains, id});
}

const toggleVisibleComment = ({comment, contentId, contentLink}: 
  {comment: {id: string, visible: boolean},
    contentLink: string
    contentId: string, 
}) => {
    update(ref(database, `mznm/content/${contentLink + contentId}/comments/${comment.id}`), { visible: !comment.visible})
}

const removeComment = ({contentLink, contentId, commentId} : 
  {contentLink: string, contentId: string, commentId: string}) => {
  const commentKey = ref(database, `mznm/content/${contentLink + contentId}/comments/${commentId}`);
  remove(commentKey);
}

const removeFromRealtimeDB = (from:string, id:string | null) => {
  if (!id || !from) return;
  const contentKey = ref(database, `mznm/content/${from + id}`);
  remove(contentKey);
}


//================== AUTHENTICATION ========================//

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const authWithGoogle = () => {
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

const signOutGoogle = () => {
  signOut(auth).then(() => {
    sessionStorage.removeItem('client');
    store.dispatch(signOutReducer())
  }).catch((error) => {
    console.log(error)
  });
}

export { 
  fetchFromRealtimeDB, 
  addToRealtimeDB, 
  addShowToRealtimeDB, 
  addSeasonToRealtimeDB, 
  addEpisodeToRealtimeDB, 
  changeCardDB, 
  changeShowCardDB, 
  addCommentToDB, 
  toggleVisibleComment, 
  removeComment, 
  removeFromRealtimeDB, 
  authWithGoogle, signOutGoogle 
}