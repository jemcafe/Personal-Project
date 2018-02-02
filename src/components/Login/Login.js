import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { login, updateCartItems } from '../../redux/ducks/reducer';

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

    componentDidMount () {
        if ( this.props.user.username ) {
            this.props.history.push('/');
        }
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
            // If there is user data, update user in redux and go to home page
            if ( res.data.username ) {
                this.props.login( res.data );
                this.props.history.push('/');

                axios.get('/api/cart').then( res => {
                    this.props.updateCartItems( res.data );
                    console.log( this.props.cartItems );
                }).catch( console.log() );
            }
        }).catch( console.log() );
    }

    render () {
        return (
            <div className="login-reg">
                <div className="login-reg-container">
                    {/* <div>The LogIn Component</div> */}

                    <div className="info-input">
                        <h3>Sign In</h3>
                        <div className="input-info">
                            {/* <div className="info">Username</div> */}
                            <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                        </div>
                        <div className="input-info">
                            {/* <div className="info">Password</div> */}
                            <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                        </div>
                        <div className="btns">
                            <button className="btn" onClick={ () => this.login() }>Sign In</button>
                            <Link to="/register"><button className="create-btn btn">Create Account</button></Link>
                            {/* <button className="btn" onClick={ () => this.getUser() }>Check for User</button> */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return { 
        user: state.user,
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = {
    login: login,
    updateCartItems: updateCartItems
};

export default connect( mapStateToProps , mapDispatchToProps )( Login );