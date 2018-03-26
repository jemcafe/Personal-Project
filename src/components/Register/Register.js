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
            name: '',
            imageurl: ''
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
        const { username, password, name, imageurl } = this.state;

        axios.post(`/api/register`, {
            username, password, name, imageurl
        }).then( user => {
            if ( user.data ) {
                this.props.register( user.data );
                this.props.history.push(`/${this.props.user.username}`);
            }
        }).catch(err => console.log(err));
    }

    render () {
        return (
            <div className="login-reg">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container">

                    <div className="signin-signup">
                        <form onSubmit={ this.register }>
                            <h3>Sign Up</h3>
                            <div className="input-info">
                                {/* <div className="info">Username</div> */}
                                <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                            </div>
                            <div className="input-info">
                                {/* <div className="info">Password</div> */}
                                <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                            </div>
                            <div className="input-info">
                                {/* <div className="info">Name</div> */}
                                <input className="input" placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) } />
                                </div>
                            <div className="input-info">
                                {/* <div className="info">Profile Picture (url)</div> */}
                                <input className="input" placeholder="Profile picture (url)" onChange={ (e) => this.handleChange('imageurl', e.target.value) } />
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