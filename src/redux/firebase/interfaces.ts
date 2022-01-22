export interface IComment {
  [key: string]: {
    textContent: string
    userName: string
    visible: boolean
    userPic: string
    date: number
    id: string
  }
}


export interface IContent {
  id: string
  name: string
  about: string
  linkPic: string
  linkVideo: string
  comments: IComment
}


export interface IFirebaseState {
  movies: IContent[]
  shows: IContent[]
  loading: boolean
}

export interface IFirebasePath {
  contentLink: string
  contentId: string
  commentId?: string
}


export interface IAddComment {
  comment: IComment
  to: IFirebasePath
}
