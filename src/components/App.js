import React, { Component } from 'react';
import './App.css';
import router from '../router/router';

import MainSite from './MainSite/MainSite';

class App extends Component {
   render() {
      return (
         <div className="App">

            { router }

         </div>
      );
   }
}

export default App;
