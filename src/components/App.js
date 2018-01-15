import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import routes from '../router/router';

import SearchBar from './SearchBar/SearchBar';

class App extends Component {
   render() {
      return (
         <div className="App">

            <header className="main-header">
                <div className="main-header-container panel">

                    <Link to="/"><div className="title">SITE NAME</div></Link>
                    <SearchBar />
                    <div className="nav">
                        <Link to="/" className="link">Home</Link>
                        <Link to="/games" className="link">Games</Link>
                        <Link to="/books" className="link">Books</Link>
                        <Link to="/posters" className="link">Posters</Link>
                        <Link to="/login" className="link">Login</Link>
                        <div className="dropdown link">
                            <Link to="/user" className="droplink">UserAccount</Link>  {/* The login and account link will toggle */}
                            <div className="dropdown-content">
                                <Link to="/user">Profile</Link>
                                <Link to="/user/posts">Posts</Link>
                                <Link to="/user/following">Following</Link>
                                <Link to="/user/cart">Cart</Link>
                                <Link to="/user/settings">Settings</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            <main className="main">
                <div className="main-container panel">

                    { routes }

                </div>
            </main>
            
            <footer className="footer">
                <div className="footer-container panel">

                    <div>&copy; 2018 My Site</div>

                </div>
            </footer>

         </div>
      );
   }
}

export default App;
