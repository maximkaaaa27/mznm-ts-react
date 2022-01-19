import React from "react";

export const CommentsPublicView = ({comments}: {comments: any[]}) => {



return (
  <>
    {comments.map(item => (
      <div key={item.id} className="p-3">
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
  </>
  )
}