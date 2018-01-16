import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import HomePage from '../components/HomePage/HomePage';
import GamesPage from '../components/GamesPage/GamesPage';
import BooksPage from '../components/BooksPage/BooksPage';
import PostersPage from '../components/PostersPage/PostersPage';
import SearchPage from '../components/SearchPage/SearchPage';
import ItemPage from '../components/ItemPage/ItemPage';

import UserAccount from '../components/UserAccount/UserAccount';
import Profile from '../components/UserAccount/Profile/Profile';
import Posts from '../components/UserAccount/Posts/Posts';
import Following from '../components/UserAccount/Following/Following';
import Cart from '../components/UserAccount/Cart/Cart';
import Settings from '../components/UserAccount/Settings/Settings';

export default (
    <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/games" component={ GamesPage } />
        <Route path="/books" component={ BooksPage } />
        <Route path="/posters" component={ PostersPage } />
        <Route path="/search" component={ SearchPage } />
        <Route path="/item" component={ ItemPage } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        
        <Route path="/user" render={ () => (
            <UserAccount>
                <Route exact path="/user" component={ Profile } />
                <Route path="/user/posts" component={ Posts } />
                <Route path="/user/following" component={ Following } />
                <Route path="/user/cart" component={ Cart } />
                <Route path="/user/settings" component={ Settings } />
            </UserAccount>
        ) } />
    </Switch>
)