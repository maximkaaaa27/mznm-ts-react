import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { EditPropCommModal } from '../modals/EditPropCommModal';



export const CommentsPrivateView = (props: {comments: any[], id: string}) => {
  const toInspectComments = props.comments.filter(i => !i.visible);
  const [modalShow, setModalShow] = useState(false);
  const [item, setItem] = useState({
    date: '',
    user: '',
    comment: ''
  });

  const trHandleClick = (item: any) => {
    setItem(item);
    setModalShow(true);
  }



  return (
    <>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name user</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        {toInspectComments.map(item => (
          <tr key={item.date} onClick={() => trHandleClick(item)}>
            <td>{new Date(item.date).toLocaleString()}</td>
            <td>{item.user}</td>
            <td>{item.comment}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <EditPropCommModal 
              comment={item}
              id={props.id}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
    </>        
  )
}