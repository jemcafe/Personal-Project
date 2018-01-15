import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
   constructor () {
      super();
      this.state = {
         username: '',
         password: ''
      }
   }

   handleChange ( property, value ) {
      this.setState({ [property]: value });
   }

   register () {
      const body = { username: this.state.username, password: this.state.password };
      axios.post(`/api/register`, body).then( res => {
         console.log( res.data );
      }).catch( console.log() );
   }

   render () {
      return (
         <div className="register">
            <div className="register-container">
                <div>The Register Component</div>
                <div>
                <input className="register-input" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                <input className="register-input" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                <button className="register-btn" onClick={ () => this.register() }>Create Account</button>
                </div>
            </div>
         </div>
      )
   }
}

export default Register;