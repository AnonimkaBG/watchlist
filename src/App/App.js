import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Main from './Main/Main';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';

import Movies from '../movies/Movies/Movies';
import CreateMovie from '../movies/CreateMovie/CreateMovie';
import MovieDetails from '../movies/MovieDetails/MovieDetails';

import Register from '../user/Register/Register';
import Login from '../user/Login/Login';

import Logout from '../user/Logout/Logout';
import Profile from '../user/Profile/Profile';

import Watchlists from '../Watchlists/Watchlists';
import CreateWatchlist from '../CreateWatchlist/CreateWatchlist';
import MyWatchlist from '../MyWatchlist/MyWatchlist';

import userService from '../services/user-service';

import Bored from '../Bored/Bored';



function render(title, Cmp, otherProps) {
  return function (props) {
    return <Main title={title} ><Cmp {...props} {...otherProps} /></Main>
  };
}

function parseCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}


class App extends React.Component {

  constructor(props) {
    super(props);
    const cookies = parseCookies();
    const isLogged = !!cookies['x-auth-token'];
    this.state = { isLogged };
  }

  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false });
      history.push('/');
      localStorage.clear();
      return null;
    });
  }

  login = (history, data) => {
    userService.login(data).then((res) => {
      const username = res.username;
      const _id = res._id;
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userId', _id);
      sessionStorage.setItem('haveList', res.haveList)
      this.setState({ isLogged: true });
      history.push('/');
    });
  }

  render() {
    const { isLogged } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Navigation isLogged={isLogged} />
          <div className="Container">
            <Switch>
              <Route path="/" exact><Redirect to="/movies" /></Route>
              <Route path="/movies" render={render('Movies', Movies, { isLogged })} />
              <Route path="/movie/:id" render={render('MovieDetails', MovieDetails, { isLogged })} />
              <Route path="/create-movie" render={render('CreateMovie', CreateMovie, { isLogged })} />
              <Route path="/create-watchlist" render={render('CreateWatchlist', CreateWatchlist, { isLogged })} />
              <Route path="/watchlists" render={render('Watchlists', Watchlists, { isLogged })} />
              <Route path="/myWatchlist" render={render('MyWatchlist', MyWatchlist, { isLogged })} />
              <Route path="/login" render={render('Login', Login, { isLogged, login: this.login })} />
              <Route path="/register" render={render('Register', Register, { isLogged })} />
              <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />
              <Route path="/bored" render={render('Bored',Bored)}/>
              <Route path="/user/:id" render={render('Profile',Profile)}/>
              <Route path="*">
                <Main title="Not Found"><NotFound /></Main>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
