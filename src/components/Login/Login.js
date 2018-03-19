import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { login, updateCartItems } from '../../redux/ducks/reducer';

import Header from '../Header/Header';

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

    login = (e) => {
        // Prevents the form submission
        e.preventDefault();
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
                this.setState({ 
                    isRegistered: false,
                    isCorrectPwd: true
                });
            } else if ( err.response.status === 403) {
                this.setState({
                    isRegistered: true,
                    isCorrectPwd: false
                });
            }
        });
    }

    render () {
        const { isRegistered, isCorrectPwd } = this.state;

        return (
            <div className="login-reg">
                <Header match={this.props.match} />
                <div className="container">
                    
                    <div className="signin-signup">
                        <form onSubmit={ this.login }>
                            <h3>Sign In</h3>
                            
                            { !isRegistered && <div style={{color: 'red', fontSize: '12px'}}>* User not registered</div> }
                            { !isCorrectPwd && <div style={{color: 'red', fontSize: '12px'}}>* Wrong password</div> }

                            {/* <div className="info">Username</div> */}
                            <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                            {/* <div className="info">Password</div> */}
                            <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                            <div className="btns">
                                <button className="red-btn" type="submit" value="Submit">Sign In</button>
                                <Link to="/register"><button className="red-btn-2">Create Account</button></Link>
                            </div>
                        </form>
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