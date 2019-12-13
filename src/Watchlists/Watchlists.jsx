import React from 'react';

import './Watchlists.css';
import watchlistService from '../services/watchlist-service';
import Watchlist from './Watchlist/Watchlist';

const Watchlists=()=>{
    const [watchlists, setWatchlists] = React.useState(null);

    React.useEffect(()=>{
        watchlistService.load().then(watchlists => {
            setWatchlists(watchlists);
        });
    },[]);

    return <div>
            {watchlists ?
                <div className="Watchlists">
                    <ul>
                        {watchlists.map((watchlist) =><Watchlist key={watchlist._id} _id={watchlist._id} image={watchlist.image} title={watchlist.title} description={watchlist.description} movies={watchlist.movies}></Watchlist>)}
                    </ul>
                </div> : <div>Loading...</div>
            }
        </div>
}


export default Watchlists;