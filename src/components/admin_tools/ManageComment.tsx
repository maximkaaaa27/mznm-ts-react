import React from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';


export const ManageComment = () => {
  const comments = useAppSelector(state => state.firebase.current.comments)
  const publishedComments = comments.filter(i => !!i.visible);
  const toInspectComments = comments.filter(i => !i.visible)


  console.log(publishedComments, toInspectComments)
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name user</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(item => (
          <tr key={item.date}>
            <td>{new Date(item.date).toLocaleString()}</td>
            <td>{item.user}</td>
            <td>{item.comment}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  )
}