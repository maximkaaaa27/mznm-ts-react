import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { RemoveButton } from '../buttons/RemoveButton';
import { OneComment } from './OneComment';



export const CommentsPrivateView = () => {
  const current = useAppSelector(state => state.firebase.current);


  return (
    <div>
      <div className='public'>
      {current.comments.map(item => (
        <div key={item.id} className="p-3">
          <OneComment item={item} id={current.id}/>
          <RemoveButton id={''} contentLink='sdsd'/>
        </div>
       
      ))}
      </div>     
    </div>
  )
}