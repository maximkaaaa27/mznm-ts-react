import React, { useEffect } from "react";
import { Row, Spinner } from "react-bootstrap";
import { Movies } from "../components/views/movies/Movies";
import { Shows } from "../components/views/shows/Shows";
import { fetchFromRealtimeDB } from "../redux/firebase/firebase";
import { useAppSelector } from "../redux/hooks";


export const Home = () => {


  const movies = useAppSelector(state => state.firebase.movies);
  const shows = useAppSelector(state => state.firebase.shows);
  const loading = useAppSelector(state => state.firebase.loading);


    useEffect(() => {
      if (!shows.length ) {
        fetchFromRealtimeDB('shows/')
      }
    }, [shows])

    useEffect(() => {
      if (!movies.length ) {
        fetchFromRealtimeDB('movies/')
      }
    }, [movies])


  return (
    <div className="page-home">

      {loading && <Spinner variant="secondary" animation="grow" />}

      <div className="page-home__title">
        <h2>МУХАМ ЗДЕСЬ НЕ МЕСТО!</h2>
        <p>Любительский перевод и озвучка.Почему бы и да?</p>
      </div>

      <div className="page-home__movies">
        <h4>Фильмы</h4>
        <Row xs={1} md={2} className="mb-5">
            <Movies listMovies={movies} showTools={false} />
        </Row>
      </div>

      <div className="page-home__tvshows">
        <h4>Сериалы</h4>
        <Row xs={1} md={2} className="mb-5">
          <Shows shows={shows} contentLink={'shows/'} isFullOption={false} />
        </Row>
      </div>
    </div>
  )
}