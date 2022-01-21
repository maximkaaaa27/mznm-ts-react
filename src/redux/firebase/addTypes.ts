export interface IAddContent {
  contentType: string, 
  name: string, 
  about: string,
  linkPic: string,
  linkVideo: string,
  comments: {[key: string]: {
    textContent: string
    date: number
    userName: string
    visible: boolean
    id: string
}}
}

export interface IAddComment {
  comment: {
    textContent: string
    date: number
    userName: string
    userPic: string | null
    visible: boolean
  }
  to: {
    contentLink: string
    id: string
  }

}