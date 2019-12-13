import React from 'react';
import './Watchlist.css';



function Watchlist({_id,title,description,movies}) {
    return <div className="Watchlist">
    <li key={movies._id} className="list">
      <h1 className="WatchlistTitle">{title}</h1>
      <p>{description}</p>
      {movies.length!==0 ? 
      <ul>
          {movies.map((movie)=>
            <a key={movie._id} href={'/movie/'+movie._id }>
            <img src={movie.image} alt={movie.title}/>
            </a>
            )}
      </ul> : <div>There are no movies in this watchlist</div>
    }
    </li>
    </div>
  };

  export default Watchlist;