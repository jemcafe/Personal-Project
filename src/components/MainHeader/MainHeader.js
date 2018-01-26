import React, { Component } from 'react';
import './MainHeader.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { logout, updateCartItems } from '../../redux/ducks/reducer';

import SearchBar from './SearchBar/SearchBar';

class MainHeader extends Component {
    logout () {
        axios.post(`/api/logout`).then( res => {
            console.log( res.data );
            this.props.logout( res.data );

            axios.get('/api/cart').then( res => {
                this.props.updateCartItems( res.data );
                console.log( this.props.cartItems );
            }).catch( console.log() );

        }).catch( console.log() );
    }

    render () {
        const { user, cartItems } = this.props;
        
        // If a user is logged in, the login link changes to the account link
        const linkChange = !user.username ? (
                                <Link to="/login" className="link signin">Sign in</Link>
                            ) : (
                                <div className="dropdown link">
                                    {/* <Link to={`/${user.username}`} className="droplink">UserAccount</Link> */}
                                    <Link to={`/${user.username}`} className="droplink"><img src={ user.imageurl } alt="Profile pic"/></Link>
                                    <div className="dropdown-content">
                                        {/* <Link to={`/${user.username}`}>Profile</Link> */}
                                        <Link to={`/${user.username}`}>Profile</Link>
                                        <Link to={`/${user.username}/posters`}>My Posters</Link>
                                        <Link to={`/${user.username}/following`}>Following</Link>
                                        <Link to={`/${user.username}/cart`}>Cart ({ cartItems.length })</Link>
                                        <Link to={`/${user.username}/settings`}>Settings</Link>
                                        <Link to="/login" onClick={ () => this.logout() }>Signout</Link>
                                    </div>
                                </div>
                            );

        return (
            <header className="main-header">
                <div className="header-bkgd-overlay position"></div>
                    <div className="main-header-container ">

                        <div className="header-1 position panel">
                            <Link to="/"><div className="title">SITE NAME</div></Link>
                            {/* <SearchBar /> */}
                            <div className="nav">
                                <SearchBar />
                                <Link to="/" className="link">Home</Link>
                                <Link to="/games" className="link">Games</Link>
                                <Link to="/books" className="link">Books</Link>
                                <Link to="/posters" className="link">Posters</Link>
                                { linkChange }
                            </div>
                        </div>

                        {/* <div className="header-2">
                            <div>
                                <Link to="/"><div className="title">SITE NAME</div></Link>
                                <div className="nav">
                                    <Link to="/" className="link">Home</Link>
                                    <Link to="/games" className="link">Games</Link>
                                    <Link to="/books" className="link">Books</Link>
                                    <Link to="/posters" className="link">Posters</Link>
                                    { linkChange }
                                </div>
                            </div>
                            <SearchBar />
                        </div> */}

                    </div>
            </header>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
    };
};

const mapDispatchToProps = {
    logout: logout,
    updateCartItems: updateCartItems
};

export default connect( mapStateToProps , mapDispatchToProps )( MainHeader );