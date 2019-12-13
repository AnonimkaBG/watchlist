import React from 'react';

import './Movies.css';
import Movie from './Movie/Movie';
import Movieservice from '../../services/movie-service';

const Movies = () => {

  const [movies, setMovies] = React.useState(null);

  React.useEffect(() => {
    Movieservice.load().then(movies => {
      setMovies(movies);
    });
  }, [])


  return <div>
    {movies ?
      <div className="Movies">
        {movies.map((movie) =>
          <Movie key={movie._id} image={movie.image} imageAlt="image" title={movie.title} _id={movie._id}>{movie.description}</Movie>)}
      </div> : <div>Loading...</div>
    }
  </div>
}

export default Movies;


