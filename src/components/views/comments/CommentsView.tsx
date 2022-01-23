import React from 'react';
import { CommentsPrivateView } from './CommentsPrivateView';
import { CommentsPublicView } from './CommentsPublicView';
import { SendCommentForm } from '../../form/SendCommentForm';
import { useAppSelector } from '../../../redux/hooks';
import { IContent } from '../../../redux/firebase/interfaces';
import { authWithGoogle } from '../../../redux/firebase/firebase';

export const CommentsView = ({current, fullOption, contentLink}: {
  current: IContent, fullOption:boolean, contentLink: string
}) => {

  const user = useAppSelector(state => state.auth.user);
  const comments = current.comments && Object.keys(current.comments).map(key => {
    return {
      ...current.comments[key]
    } 
  });

  const publicComments = !comments ? [] : comments.filter(i => i.visible);
  
  return (
    <>
      <h3 className="border-bottom">Comments</h3>
        {fullOption ? <CommentsPrivateView 
        comments={comments} 
        contentLink={contentLink}
        contentId={current.id}
        /> 
        : <CommentsPublicView comments={publicComments}/>
        }

        {(!user.name) ? 
        <div className="mt-3 d-flex">
        <p className='btn text-warning' onClick={() => authWithGoogle()}>Представьтесь</p>
        <p className='btn text-info'>для того чтобы присоединиться к обсуждению</p>
        </div> 
        :<SendCommentForm 
        userName={user.name}
        userPic={!user.pic ? '': user.pic} 
        contentLink={contentLink}
        current={current}
        />}    
    </>
  )
}