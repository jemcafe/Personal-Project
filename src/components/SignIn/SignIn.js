import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
   render () {
      return (
         <div>
            <h3>The SignIn Component</h3>
            <div>
                <input className="login-input" placeholder="username" />
                <input className="login-input" placeholder="password" />
                <button className="signin-btn">Sign In</button>
                <Link to="/register"><button className="register-btn">Register</button></Link>
            </div>
         </div>
      )
   }
}

export default SignIn;