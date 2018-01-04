import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from '../router';

import Search from './Search/Search';
import SignOut from './SignOut/SignOut';

class App extends Component {
  render() {
      return (
         <div>
            <div className= "header">
               <nav className="header-nav">
                  <h2 className="header-title">MY SITE</h2>
                  <div>
                     <Search />
                     <Link to="/">Home</Link>
                     <Link to="/games">Games</Link>
                     <Link to="/books">Books</Link>
                     <Link to="/posters">Posters</Link>
                     <Link to="/signin">Sign In</Link>
                     <SignOut />
                  </div>
               </nav>
            </div>

            <div className="main">
               { router }
            </div>
            
            <div className="footer">
               <p>&copy; 2018 My Site</p>
            </div>
         </div>
      );
  }
}

export default App;
