import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { logout } from '../../redux/ducks/reducer';

import SearchBar from './SearchBar/SearchBar';

class MainHeader extends Component {
    
    logout () {
        axios.post(`/api/logout`).then( res => {
            console.log( res.data );
            this.props.logout( res.data );
        }).catch( console.log() );
    }

    render () {
        const { user } = this.props;
        
        // If a user is logged in, the login link changes to the account link
        const linkChange = !user.username ? (
                                <Link to="/login" className="link">Sign in</Link>
                            ) : (
                                <div className="dropdown link">
                                    <Link to="/user" className="droplink">UserAccount</Link>
                                    <div className="dropdown-content">
                                        <Link to="/user">Profile</Link>
                                        <Link to="/user/posts">My Posts</Link>
                                        <Link to="/user/posters">My Posters</Link>
                                        <Link to="/user/following">Following</Link>
                                        <Link to="/user/cart">Cart</Link>
                                        <Link to="/user/settings">Settings</Link>
                                        <Link to="/login" onClick={ () => this.logout() }>Signout</Link>
                                    </div>
                                </div>
                            );

        return (
            <header className="main-header">
                <div className="main-header-container panel">

                    <Link to="/"><div className="title">SITE NAME</div></Link>
                    <SearchBar />
                    <div className="nav">
                        <Link to="/" className="link">Home</Link>
                        <Link to="/games" className="link">Games</Link>
                        <Link to="/books" className="link">Books</Link>
                        <Link to="/posters" className="link">Posters</Link>
                        { linkChange }
                    </div>

                </div>
            </header>
        );
    }
}

const mapDispatchToProps = {
    logout: logout
};

export default connect( state => state , mapDispatchToProps )( MainHeader );