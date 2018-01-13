import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from '../../router';

import SearchBar from './SearchBar/SearchBar';

class MainSite extends Component {
    render () {
        return (
            <div>

                <div className= "header">
                <div className="header-container panel">
                    <div className="title">SITE NAME</div>
                    <SearchBar />
                    <div className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/games">Games</Link>
                        <Link to="/books">Books</Link>
                        <Link to="/posters">Posters</Link>
                        <Link to="/login">Login</Link>
                        {/* <SignOut /> */}
                    </div>
                </div>
                </div>

                <div className="main">
                    <div className="main-container panel">
                        { router }
                    </div>
                </div>
                
                <div className="footer">
                    <div className="footer-container panel">
                        <div>&copy; 2018 My Site</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default MainSite;