import React from 'react';
import { Image } from 'react-bootstrap';
import { removeComment, toggleVisibleComment } from '../../../redux/firebase/firebase';
import { EyeIcon } from '../../icons/eye';
import { EyeSlash } from '../../icons/eye_slash';
import { Trash } from '../../icons/trash';


export const CommentsPrivateView = ({comments, contentLink, contentId}: {comments: {id: string, userName: string, userPic: string, textContent: string, visible: boolean}[], contentLink: string, contentId: string}) => {


  return (
    <>
      {(!comments) ?
        <h6>Здесь пока нет ни одного комментария, вы можете стать первым!</h6>
      : comments.map(comment => (
          <div key={comment.id} className="p-3">
           
              <div className='d-flex'>
                <Image height="35px" width="35px" roundedCircle src={comment.userPic} />
                  <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">           
                    <p>{comment.textContent}</p>
                  </div>
          
          <div className="btn" onClick={() => toggleVisibleComment({comment, contentLink, contentId})}>
            {!!comment.visible ? <EyeIcon /> : <EyeSlash />}
          </div>
          <div className="btn" onClick={() => removeComment({contentLink, contentId, commentId: comment.id})}>
            <Trash />
          </div>
        </div>
       
        </div>   
      )) 
    }  
    </>
  )
}