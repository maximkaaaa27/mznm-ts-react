import React from 'react';
import { CommentsPrivateView } from './CommentsPrivateView';
import { CommentsPublicView } from './CommentsPublicView';
import { SendCommentForm } from '../../form/SendCommentForm';
import { ICurrent } from '../../../redux/firebase/firebaseSlice';
import { useAppSelector } from '../../../redux/hooks';

export const CommentsView = ({current, fullOption, contentLink}: {
  current: ICurrent, fullOption:boolean, contentLink: string
}) => {

  const user = useAppSelector(state => state.auth.user);

  return (
    <>
      <h2>Comments</h2>
      {fullOption ? <CommentsPrivateView current={current}/> 
      : <CommentsPublicView comments={current.comments}/>
      }

      {!!user.name && <SendCommentForm 
      userName={user.name} 
      contentLink={contentLink}
      current={current}
      />}
      
    </>
  )
}