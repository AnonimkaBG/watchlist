import React from 'react';

import './Bored.css';
import BoredService from '../services/bored-service';

const Movies = () => {

    const [activity, setActivity] = React.useState(null);

    React.useEffect(() => {
        BoredService.load().then(activity => {
            setActivity(activity);
        });
    }, [])

    const reload = () => {
        BoredService.load().then(activity => {
            setActivity(activity);
        });
    }

    return <div>
        {activity ?
            <div className="BoredActivity">
                <h2>Are you bored out of your mind and don't wanna watch a movie?</h2>
                <p>Say no more! Let's find you something to do</p>
                <h1>{activity.activity}</h1>
                <button onClick={reload}>Give me another</button>
            </div> : <div>Loading...</div>
        }
    </div>
}

export default Movies;


