import React from 'react';
import { removeFromRealtimeDB } from '../../redux/firebase/firebase';

export const RemoveButton = ({id, contentLink}: {id: string, contentLink: string}) => {

  return (
    <button type="button" 
    className="btn-close" 
    aria-label="Close"
    onClick={() => removeFromRealtimeDB(contentLink, id)}
    >
    </button>
  )
}