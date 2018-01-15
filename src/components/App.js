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
                        <Link to="/">Home</Link>
                        <Link to="/games">Games</Link>
                        <Link to="/books">Books</Link>
                        <Link to="/posters">Posters</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/user">UserAccount</Link>  {/* The login and account link will toggle */}
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
