import React, { Component } from 'react';
import axios from 'axios';

class SignOut extends Component {
   signout () {
      axios.post(`http://localhost:3005/api/signout`).then( res => {
         console.log( res.data );
      }).catch( console.log() );
   }

   render () {
      return (
         <div>
            <button onClick={ () => this.signout() }>Sign Out</button>
         </div>
      )
   }
}

export default SignOut;