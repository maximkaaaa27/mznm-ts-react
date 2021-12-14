import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { addToRealtimeDB, IAdd } from "../redux/firebase/firebase";


export const AdminPage = () => {


  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [typeContent, setTypeContent] = useState('shows/');
  const [about, setAbout] = useState('');

  function checkValidity (title: string, to: string, about: string): IAdd{
    const payload: Partial<IAdd> = {}

    if (title.length < 15) {
      payload.title = title
    }

    if(about.length > 10) {
      payload.about = about
    }

    payload.to = to;
    payload.full = !!(payload.title && payload.to && payload.about)
 
  
    return payload as IAdd;
  } 



  const handleSubmit = (event: React.FormEvent) => {


      if (!(() => checkValidity(title, typeContent, about).full)) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);
      addToRealtimeDB({title, to: typeContent, about, full: validated});
  }




  return (
    <Form className="p-3" noValidate validated={validated}  onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Название</Form.Label>
        <Form.Control required
        onChange={(e)=> setTitle(e.target.value)}
        type="text"
        placeholder="Введите название" 
        value={title}
        />
        <Form.Text className="text-muted">
          Будет отображаться в заголовках
        </Form.Text>
      </Form.Group>

      <Form.Select className="mb-3" onChange={(e) => setTypeContent(e.target.value)} 
      value={typeContent}>
        <option value="shows/">Shows</option>
        <option value="movies/">Movies</option>
      </Form.Select>

      <Form.Group className="mb-3" controlId="formAbout">
        <Form.Label>О фильме</Form.Label>
        <Form.Control 
        required
        onChange={(e)=> setAbout(e.target.value)}
        value={about}
        style={{ height: '100px' }}
        type="text"
        placeholder="Ссылка" 
        />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
