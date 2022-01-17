import React from "react";

export const CommentsPublicView = (props : {comments: any[]}) => (
  <div>
  <h2>Comments</h2>
    {props.comments.map(item => (
      <div key={item.date}>
        {item.visible &&
          <div> 
            <h6>{item.user}</h6> 
            <div className="m-2 p-3 w-75 bg-light border rounded-3 overflow-auto">
              <p>{item.comment}</p>
            </div>
          </div>
        }
      </div>      
  ))}
  </div>
)