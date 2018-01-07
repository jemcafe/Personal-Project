import React, { Component } from 'react';
import axios from 'axios';

class LinkChange extends Component {
   constructor () {
      super();
      this.state = {
         username: ''
      }
   }

   checkForUsername () {
      axios.get(`http://localhost:3005/api/user`).then( res => {
         console.log( res.data );
      }).catch( console.log() );
   }

   render () {
      return (
         <div>
            <button onClick={ () => this.checkForUsername() }>Check For Username</button>
         </div>
      )
   }
}

export default LinkChange;