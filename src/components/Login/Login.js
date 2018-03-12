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
            password: '',
            isRegistered: true,
            isCorrectPwd: true
        }
    }

    componentDidMount () {
        if ( this.props.user.username ) {
            this.props.history.push(`/`);
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    login () {
        const { username, password } = this.state;

        axios.post(`/api/login`, { username, password }).then( user => {
            if ( user.data ) {
                this.props.login( user.data );
                this.props.history.push(`/${this.props.user.username}`);

                axios.get('/api/cart').then( cart => {
                    this.props.updateCartItems( cart.data );
                }).catch(err => console.log(err));
            }
        }).catch(err => {
            console.log(err);
            if ( err.response.status === 404) {
                this.setState({ isRegistered: false });
            } else if ( err.response.status === 403) {
                this.setState({ isRegistered: true, isCorrectPwd: false });
            }
        });
    }

    render () {
        return (
            <div className="login-reg">
                <div className="login-reg-container">
                    
                    <div className="info-input">
                        <h3>Sign In</h3>
                        <div className="input-info">
                            {/* <div className="info">Username</div> */}
                            <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                        </div>
                        { !this.state.isRegistered && <div style={{color: 'red', fontSize: '12px'}}>* User not registered</div> }
                        <div className="input-info">
                            {/* <div className="info">Password</div> */}
                            <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                        </div>
                        { !this.state.isCorrectPwd && <div style={{color: 'red', fontSize: '12px'}}>* Incorrect password</div> }
                        <div className="btns">
                            <button className="red-btn" onClick={ () => this.login() }>Sign In</button>
                            <Link to="/register"><button className="create-btn red-btn">Create Account</button></Link>
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