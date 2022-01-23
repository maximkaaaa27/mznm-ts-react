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


export interface IEpisodes {
  episodeId: string
  name: string
  about: string
  linkPic: string
  linkVideo: string
  comments: IComment
}

export interface ISeason {
  seasonId: string
  seasonNumber: number
  year: string
  episodes: IEpisodes
}


export interface IContentShows {
  id: string
  name: string
  about: string
  linkPic: string
  seasons: ISeason | null
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
