import React, { Component } from 'react';
import '../Login/Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { register } from '../../redux/ducks/reducer';

import Header from '../Header/Header';

class Register extends Component {
    constructor () {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            image_url: '',
            hasUsername: true,
            hasPassword: true,
            usernameAvailable: true,
            emailIsValid: true,
            hasName: true
        }
    }

    componentDidMount () {
        if ( this.props.user.username ) {
            this.props.history.push('/');
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    register = (e) => {
        e.preventDefault();
        const { username, password, email, name, image_url } = this.state;

        axios.post(`/api/register`, {
            username, password, email, name, image_url
        }).then( user => {
            if ( user.data ) {
                this.props.register( user.data );
                this.props.history.push(`/${this.props.user.username}`);
            }
        }).catch(err => {
            console.log(err);
            if ( err.response.status === 401) {
                this.setState({
                    hasUsername: true,
                    hasPassword: true,
                    usernameAvailable: false,
                    emailIsValid: true,
                    hasName: true
                });
            } else if ( err.response.status === 406) {
                this.setState({
                    hasUsername: true,
                    hasPassword: true,
                    usernameAvailable: true,
                    emailIsValid: false,
                    hasName: true
                });
            } else if ( err.response.status === 412 ) {
                if ( err.response.data === 'username' ) {
                    this.setState({
                        hasUsername: false,
                        hasPassword: true,
                        usernameAvailable: true,
                        emailIsValid: true,
                        hasName: true,
                    });
                } else if ( err.response.data === 'password' ) {
                    this.setState({
                        hasUsername: true,
                        hasPassword: false,
                        usernameAvailable: true,
                        emailIsValid: true,
                        hasName: true,
                    });
                } else if ( err.response.data === 'name' ) {
                    this.setState({
                        hasUsername: true,
                        hasPassword: true,
                        usernameAvailable: true,
                        emailIsValid: true,
                        hasName: false,
                    });
                }
            }
        });
    }

    render () {
        const { hasUsername, hasPassword, usernameAvailable, emailIsValid, hasName } = this.state;
        
        return (
            <div className="login-reg">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container">

                    <div className="signin-signup">
                        <form onSubmit={ this.register }>
                            <h3>Sign Up</h3>

                            { !hasUsername && <div style={{color: 'red', fontSize: '12px'}}>* No username</div> }
                            { !usernameAvailable && <div style={{color: 'red', fontSize: '12px'}}>* Username is unavailable</div> }
                            { !hasPassword && <div style={{color: 'red', fontSize: '12px'}}>* No password</div> }
                            { !emailIsValid && <div style={{color: 'red', fontSize: '12px'}}>* Email is invalid</div> }
                            { !hasName && <div style={{color: 'red', fontSize: '12px'}}>* No Name</div> }

                            <div className="input-info">
                                {/* <div className="info">Username</div> */}
                                <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                            </div>
                            <div className="input-info">
                                {/* <div className="info">Password</div> */}
                                <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                            </div>
                            <div className="input-info">
                                {/* <div className="info">Password</div> */}
                                <input className="input" placeholder="Email" onChange={ (e) => this.handleChange('email', e.target.value) } />
                            </div>
                            <div className="input-info">
                                {/* <div className="info">Name</div> */}
                                <input className="input" placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) } />
                                </div>
                            <div className="input-info">
                                {/* <div className="info">Profile Picture (url)</div> */}
                                <input className="input" placeholder="Profile picture (url)" onChange={ (e) => this.handleChange('image_url', e.target.value) } />
                            </div>
                            <div className="btns">
                                <button className="red-btn" type="submit" value="Submit">Create Account</button>
                                <Link to="/login"><button className="red-btn-2">Sign In</button></Link>
                            </div>
                        </form>
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
    register: register
};

export default connect( mapStateToProps , mapDispatchToProps )( Register );