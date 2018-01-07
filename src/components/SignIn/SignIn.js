import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
   constructor () {
      super();
      this.state = {
         username: ''
      }
   }

   handleChange ( property, value ) {
      this.setState({ [property]: value });
   }

   signin () {
      const body = { username: this.state.username, password: this.state.password };
      axios.post(`http://localhost:3005/api/signin`, body).then( res => {
         console.log( res.data );
         this.setState({ username: res.data.username });
      }).catch( console.log() );
   }

   render () {
      return (
         <div>
            <h3>The SignIn Component</h3>
            <div>
               <input className="login-input" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } />
               <input className="login-input" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } />
               <button className="signin-btn" onClick={ () => this.signin() }>Sign In</button>
               <Link to="/register"><button className="register-btn">Create Account</button></Link>
            </div>
         </div>
      )
   }
}

export default SignIn;