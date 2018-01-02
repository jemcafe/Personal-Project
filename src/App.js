import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/Games">Games</Link>
        <Link to="/Books">Books</Link>
        <Link to="/Posters">Posters</Link>
      </div>
    );
  }
}

export default App;
