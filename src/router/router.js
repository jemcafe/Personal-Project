import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import HomePage from '../components/HomePage/HomePage';
import GamesPage from '../components/GamesPage/GamesPage';
import BooksPage from '../components/BooksPage/BooksPage';
import PostersPage from '../components/PostersPage/PostersPage';
import SearchPage from '../components/SearchPage/SearchPage';
import ProductPage from '../components/ProductPage/ProductPage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import UserAccount from '../components/UserAccount/UserAccount';
import UserProfile from '../components/UserProfile/UserProfile';
import PageNotFound from '../components/PageNotFound/PageNotFound';

export default (
    <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/page-not-found" component={ PageNotFound } />
        <Route path="/games" component={ GamesPage } />
        <Route path="/books" component={ BooksPage } />
        <Route path="/posters" component={ PostersPage } />
        <Route path="/search" component={ SearchPage } />
        <Route path="/product/:category/:name" component={ ProductPage } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/useraccount" component={ UserAccount } />
        <Route path="/:username" component={ UserProfile } /> {/* This must be at the bottom, so it doesn't take the other path names above it since the name isn't specified. */}
    </Switch>
);