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
        const body = { username: this.state.username, password: this.state.password };
        axios.post(`/api/login`, body).then( res => {
            console.log( res.data );
            this.props.login( res.data );
        }).catch( console.log() );
    }

    logout () {
        axios.post(`/api/logout`).then( res => {
            console.log( res.data );
            // this.setState({ username: res.data.username });
        }).catch( console.log() );
    }

    getUser () {
        // axios.get(`/api/user`).then( res => {
        //     console.log( res.data );
        // }).catch( console.log() );
        console.log(this.props.user);
    }

    render () {
        return (
            <div className="login">
                <div className="login-container">
                {/* <div>The LogIn Component</div> */}

                <div className="login-input">
                    <div><input className="username" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } /></div>
                    <div><input className="password" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } /></div>
                    <div className="btn">
                        <button className="login-btn" onClick={ () => this.login() }>Sign In</button>
                        {/* <button className="login-btn">Sign In</button> */}
                        <Link to="/register"><button className="register-btn">Create Account</button></Link>
                        {/* <button className="logout-btn" onClick={ () => this.logout() }>logout</button> */}
                        <button className="check-btn" onClick={ () => this.getUser() }>Check for User</button>
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