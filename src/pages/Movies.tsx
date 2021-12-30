import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { AddButton } from "../components/admin_tools/AddButton";
import { EditButton } from "../components/admin_tools/EditButton";
import { RemoveButton } from "../components/admin_tools/RemoveButton";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from "../redux/hooks";



export const Movies = () => {

  const movies = useAppSelector(state => state.firebase.movies);
  const loading = useAppSelector(state => state.firebase.loading);
  const contentLink = 'movies/';
  const isAdmin = (process.env.REACT_APP_USER_UID === useAppSelector(state => state.auth.user.uid));

  useEffect(() => {
    if (!movies.length) {
      fetchFromRealtimeDB(contentLink)
    }
  },[movies])


  return(
  <>
    <Row className="g-4 m-2">

     {loading && <Spinner variant="secondary" animation="grow" />}

      {movies.map((item) => (
        <Col key={item.id} className="m-3">
          <Card
          border="secondary"
          bg="light"
          >
            <Card.Header
            className="d-flex justify-content-between align-items-center"
            >
              <Card.Title> {item.name} </Card.Title>
              {isAdmin && 
              <div>
                <EditButton item={item} contentLink={contentLink} />
                <RemoveButton id={item.id} contentLink={contentLink} />
              </div>
              }
            </Card.Header>

            <Card.Body>
              <Card.Img alt="card pic" src={item.linkPic} />
              <Card.Text>
                {item.about}
              </Card.Text>
            </Card.Body>

          </Card>
        </Col>
      ))}
      <Col className="m-3">
      { isAdmin &&
      <AddButton contentLink={contentLink}/>
      }
      </Col>
    </Row>
  </>
  )
};