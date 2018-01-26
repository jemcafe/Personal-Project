import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import GamesPage from './components/GamesPage/GamesPage';
import BooksPage from './components/BooksPage/BooksPage';
import PostersPage from './components/PostersPage/PostersPage';
import SearchPage from './components/SearchPage/SearchPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserAccount from './components/UserAccount/UserAccount';

export default (
    <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/games" component={ GamesPage } />
        <Route path="/books" component={ BooksPage } />
        <Route path="/posters" component={ PostersPage } />
        <Route path="/search" component={ SearchPage } />
        <Route path="/checkout" component={ CheckoutPage } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/:username" component={ UserAccount } />
    </Switch>
);