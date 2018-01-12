import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import router from '../router';

import SearchBar from './SearchBar/SearchBar';
// import SignOut from './SignOut/SignOut';
// import LinkChange from './SignIn/LinkChange/LinkChange';

class App extends Component {
   render() {
      return (
         <div className="App">

            <div className= "header">
               <div className="header-container panel">
                  <div className="title">SITE NAME</div>
                  <SearchBar />
                  <div className="nav">
                     <Link to="/">Home</Link>
                     <Link to="/games">Games</Link>
                     <Link to="/books">Books</Link>
                     <Link to="/posters">Posters</Link>
                     <Link to="/signin">Sign In</Link>
                     <Link to="/user">User Account</Link>
                     {/* <SignOut />
                     <LinkChange /> */}
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
      );
   }
}

export default App;
