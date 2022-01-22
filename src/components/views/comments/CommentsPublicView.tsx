import React from "react";
import { Image } from "react-bootstrap";



export const CommentsPublicView = ({comments}: {comments: {id: string, userName: string, userPic: string, textContent: string, visible: boolean}[]}) => (

  <>
    {(!comments.length || !comments) ?
      <h6>Здесь пока нет ни одного комментария, вы можете стать первым!</h6>
      : comments.map(comment => (
        <div key={comment.id} className="p-3">
          <div className='d-flex'>
            <div className='avatar'>
              <Image height="35px" width="35px" roundedCircle src={comment.userPic} />
            </div>
            <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">           
              <p>{comment.textContent}</p>
            </div>
          </div>
        </div>   
      )) 
    }  
  </>

)
