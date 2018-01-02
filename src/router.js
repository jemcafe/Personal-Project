import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Games from './components/Games/Games';
import Books from './components/Books/Books';
import Posters from './components/Posters/Posters';

export default (
    // Switch is needed for switching to different components
    <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/games" component={ Games } />
        <Route path="/books" component={ Books } />
        <Route path="/posters" component={ Posters } />
    </Switch>
)