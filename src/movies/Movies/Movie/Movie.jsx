import React from 'react';
import './Movie.css';

function Movie({ image,title,description,_id }) {
  return <div className="Movie">
    <a href={'/movie/'+_id}>
<p className="MovieTitle">{title}</p>
    <img src={image} alt="" />
    </a>
  </div>;
};

export default Movie;