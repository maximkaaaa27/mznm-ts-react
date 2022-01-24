import React, { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddShowButton } from "../components/buttons/AddShowButton";
import { EditButton } from "../components/buttons/EditButton";
import { RemoveButton } from "../components/buttons/RemoveButton";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from '../redux/hooks';


export const ShowsPage = () => {

  const shows = useAppSelector(state => state.firebase.shows);
  const loading = useAppSelector(state => state.firebase.loading);
  const contentLink = 'shows/';
  const isAdmin = (process.env.REACT_APP_USER_UID === useAppSelector(state => state.auth.user.uid));

  useEffect(() => {
    if (!shows.length) {
      fetchFromRealtimeDB(contentLink)
    }
  }, [shows])


  return(
  <div className="m-5">

    <Row xs={1} md={2} className="m-2">

    {loading && <Spinner variant="secondary" animation="grow" />}

      {shows.map((item) => (
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
              <Link to={item.id}>
              <Card.Img alt="..." src={item.linkPic} />
              </Link>
              <Card.Text>
                {item.about}
              </Card.Text>
            </Card.Body>

          </Card>
        </Col>
      ))}
      <Col className="m-3">
      { isAdmin &&
      <AddShowButton />
      }
      </Col>

    </Row>
  </div>
  )
  };