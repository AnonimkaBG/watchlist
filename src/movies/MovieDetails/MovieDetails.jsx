import React from 'react';
import './MovieDetails.css';
import Movieservice from '../../services/movie-service';
import watchlistService from '../../services/watchlist-service';

const MovieDetails=(props)=>{
    const id = props.match.params.id;
    const [movie,setMovie]=React.useState(null);
    const _id=sessionStorage.getItem('userId');

    React.useEffect(()=>{
        Movieservice.loadOne(id).then(movie => {
            setMovie(movie );
        });
    },[id]);

    const addToList= ()=>{  // TO DO check if the movie is already in the list
        watchlistService.load(_id).then((res)=>{
            res[0]._id? watchlistService.updateWatchlist(movie,res[0]._id).then((res)=>alert(`Succesfully added ${movie.title} to your watchlist!`)) : alert('You dont have a watchlist!');
        } );
        
    };

    return <div>
        <h1 className="MovieDetailsT">Movie details</h1>
            {movie ?
                <div className="MovieDetails">
                    <p className="MovieTitle">{movie.title}</p>
                    <img src={movie.image} alt="" />
                    <p className="description">{movie.description}</p>
                    <button className="button" onClick={addToList}>Add to watchlist</button>
                </div> : <div>Loading...</div>
            }
        </div>

}

export default MovieDetails;