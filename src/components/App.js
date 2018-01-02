import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from '../router';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/Games">Games</Link>
          <Link to="/Books">Books</Link>
          <Link to="/Posters">Posters</Link>
        </div>
        { router }
      </div>
    );
  }
}

export default App;
