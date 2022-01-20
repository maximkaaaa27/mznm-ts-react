import React from 'react';
import { ICurrent } from '../../../redux/firebase/firebaseSlice';
import { RemoveButton } from '../../buttons/RemoveButton';
import { EyeIcon } from '../../icons/eye';
import { EyeSlash } from '../../icons/eye_slash';




export const CommentsPrivateView = ({current}: {current: ICurrent}) => {


  return (
    <>
      {current.comments.map(comment => (
        <div key={comment.id} className="p-3"> 
          <h6>{comment.userName}</h6> 
          <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">
            <p>{comment.textContent}</p>
          </div>
          <div className="btn">
            {!!comment.visible ? <EyeIcon /> : <EyeSlash />}
          </div>
          <RemoveButton id={''} contentLink='sdsd'/>  
        </div>   
      ))}  
    </>
  )
}