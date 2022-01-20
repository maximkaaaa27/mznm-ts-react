import React from "react";

export const CommentsPublicView = ({comments}: {comments: any[]}) => (

  <>
    {comments.map(comment => (
      <div key={comment.id} className="p-3">
        {comment.visible &&
          <div> 
            <h6>{comment.user}</h6> 
            <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">
              <p>{comment.textContent}</p>
            </div>
          </div>
        }
      </div>      
    ))}
  </>

)
