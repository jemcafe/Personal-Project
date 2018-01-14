import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import MainSite from '../components/MainSite/MainSite';
import Login from '../components/MainSite/Login/Login';
import Register from '../components/MainSite/Register/Register';
import HomePage from '../components/MainSite/HomePage/HomePage';
import GamesPage from '../components/MainSite/GamesPage/GamesPage';
import BooksPage from '../components/MainSite/BooksPage/BooksPage';
import PostersPage from '../components/MainSite/PostersPage/PostersPage';
import SearchPage from '../components/MainSite/SearchPage/SearchPage';
import ItemPage from '../components/MainSite/ItemPage/ItemPage';

import UserAccount from '../components/UserAccount/UserAccount';

export default (
    <Switch>
        <Route path="/" render={ () => (
            <MainSite>
                <Route exact path="/" component={ HomePage } />
                <Route path="/games" component={ GamesPage } />
                <Route path="/books" component={ BooksPage } />
                <Route path="/posters" component={ PostersPage } />
                <Route path="/search" component={ SearchPage } />
                <Route path="/item" component={ ItemPage } />
                <Route path="/login" component={ Login }/>
                <Route path="/register" component={ Register } />
            </MainSite>
        ) } />

        <Route exact path="/user/" component={ UserAccount } />
    </Switch>
)