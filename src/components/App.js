import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from '../router';

import Search from './Search/Search';

class App extends Component {
  render() {
      return (
         <div>
            <nav className="main-nav">
               <h3>MY SITE</h3>
               <div>
                  <Search />
                  <Link to="/">Home</Link>
                  <Link to="/games">Games</Link>
                  <Link to="/books">Books</Link>
                  <Link to="/posters">Posters</Link>
                  <Link to="/signin">Sign In</Link> {/* The signin link will need to change to the user link after logging in */}
               </div>
            </nav>
            { router }
         </div>
      );
  }
}

export default App;
