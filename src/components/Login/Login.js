import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';

class Login extends Component {
    constructor () {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    login () {
        const body = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(`/api/login`, body).then( res => {
            console.log( res.data );
            // If there is user data, update user in redux and got to home page
            if ( res.data ) {
                this.props.login( res.data );
                this.props.history.push('/');
            }
        }).catch( console.log() );
    }

    render () {
        return (
            <div className="login-reg">
                <div className="login-reg-container">
                {/* <div>The LogIn Component</div> */}

                <div className="info-input">
                    <div className="input">
                        <div className="info">Username</div>
                        <input className="username" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                    </div>
                    <div className="input">
                        <div className="info">Password</div>
                        <input className="password" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                    </div>
                    <div className="btns">
                        <button className="btn" onClick={ () => this.login() }>Sign In</button>
                        <Link to="/register"><button className="btn">Create Account</button></Link>
                        {/* <button className="btn" onClick={ () => this.getUser() }>Check for User</button> */}
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return { user: state.user };
};

const mapDispatchToProps = {
    login: login
};

export default connect( mapStateToProps , mapDispatchToProps )( Login );