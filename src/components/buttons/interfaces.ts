export interface IInitState {
  name: string
  about: string
  linkPic: string
  linkVideo: string
  comments: {[key: string]: {
    textContent: string
    date: number
    userName: string
    visible: boolean
    id: string
}}
}