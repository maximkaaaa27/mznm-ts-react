export interface IAddContent {
  contentType: string, 
  name: string, 
  about: string,
  linkPic: string,
  linkVideo: string,
  comments: any[]
}

export interface IAddComment {
  comment: {
    textContent: string
    date: number
    userName: string
    visible: boolean
  }
  to: {
    contentLink: string
    id: string
  }

}