import React from "react";
import { Image } from "react-bootstrap";



export const CommentsPublicView = ({comments}: {comments: {id: string, userName: string, userPic: string, textContent: string, visible: boolean}[]}) => (

  <>
    {(!comments.length || !comments) ?
      <h6>Здесь пока нет ни одного комментария, вы можете стать первым!</h6>
      : comments.map(comment => (
        <div key={comment.id}>
          <div className='comment'>
            <div className='comment__avatar'>
              <Image height="35px" width="35px" roundedCircle src={comment.userPic} />
            </div>
            <div className="comment__contains">           
              <p>{comment.textContent}</p>
            </div>
          </div>
        </div>   
      )) 
    }  
  </>
)