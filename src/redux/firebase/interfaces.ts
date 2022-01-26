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

export interface IEpisode {
  episodeId: string
  name: string
  about: string
  linkPic: string
  linkVideo: string
  comments: IComment
}

export interface IEpisodes {
  [key: string]: IEpisode
}

export interface ISeason {
  seasonId: string
  seasonNumber: number
  year?: string
  episodes?: IEpisodes
}

export interface ISeasons {
 [key: string]: ISeason
}

export interface IContentShows {
  name: string
  about: string
  linkPic: string
  link: string
  totalSeasons: number
  seasons: ISeasons | null
}

export interface IFirebaseState {
  movies: IContent[]
  shows: IContentShows[]
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
