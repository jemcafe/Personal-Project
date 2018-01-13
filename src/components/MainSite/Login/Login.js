import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
   constructor () {
      super();
      this.state = {
         username: ''
      }
   }

   handleChange ( property, value ) {
      this.setState({ [property]: value });
   }

   login () {
      const body = { username: this.state.username, password: this.state.password };
      axios.post(`http://localhost:3005/api/login`, body).then( res => {
         console.log( res.data );
         this.setState({ username: res.data.username });
      }).catch( console.log() );
   }

   render () {
      return (
         <div className="login">
            <div className="login-container">
               <div>The SignIn Component</div>
               <div className="login-input">
                  <input className="username" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                  <input className="password" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                  <div className="btn">
                    <button className="login-btn" onClick={ () => this.signin() }>Sign In</button>
                    <Link to="/register"><button className="register-btn">Create Account</button></Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Login;