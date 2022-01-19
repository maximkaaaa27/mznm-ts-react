import React, { useState } from "react";
import { changeVisiblePropComment } from "../../redux/firebase/firebase";
import { EyeIcon } from "../icons/eye";
import { EyeSlash } from "../icons/eye_slash";

export const OneComment = ({item, id}: {item: {
  user: string,
  comment: string,
  visible: boolean
}, id: string}) => {

  const [eyeVisible, setEyeVisible] = useState(item.visible)
  const changeVisible = (item: any) => {
    setEyeVisible((prev) => !prev)
    console.log(item.visible)
    changeVisiblePropComment({
      from: 'movies/',
      id,
      commentId: item.id,
      visible: !eyeVisible
    })
  }

  return (
    <div> 
      <h6>{item.user}</h6> 
      <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">
        <p>{item.comment}</p>
      </div>
      <div className="btn" onClick={() => changeVisible(item)}>
      {eyeVisible ? <EyeIcon /> : <EyeSlash />}
      </div>
    </div>
  )
}