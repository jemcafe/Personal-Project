import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import Books from './components/Books/Books';
import Posters from './components/Posters/Posters';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

export default (
    <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/games" component={ Games } />
        <Route path="/books" component={ Books } />
        <Route path="/posters" component={ Posters } />
        <Route path="/signin" component={ SignIn }/>
        <Route path="/register" component={ Register } />
    </Switch>
)