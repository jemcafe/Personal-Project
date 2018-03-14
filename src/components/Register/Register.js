import React, { Component } from 'react';
import '../Login/Login.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { register } from '../../redux/ducks/reducer';

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

    register () {
        const body = {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                imageurl: this.state.imageurl || null
            };

        axios.post(`/api/register`, body).then( user => {
            if ( user.data ) {
                this.props.register( user.data );
                this.props.history.push(`/${this.props.user.username}`);
            }
        }).catch(err => console.log(err));
    }

    render () {
        return (
            <div className="login-reg">
                <div className="login-reg-container">
                    {/* <div>The Register Component</div> */}

                    <div className="info-input">
                        <h3>Sign Up</h3>
                        <div className="input-info">
                            {/* <div className="info">Username</div> */}
                            <input className="input" placeholder="Username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                        </div>
                        <div className="input-info">
                            {/* <div className="info">Password</div> */}
                            <input className="input" placeholder="Password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                        </div>
                        <div className="input-info">
                            {/* <div className="info">Name</div> */}
                            <input className="input" placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) } />
                            </div>
                        <div className="input-info">
                            {/* <div className="info">Profile Picture (url)</div> */}
                            <input className="input" placeholder="Profile picture (url)" onChange={ (e) => this.handleChange('image', e.target.value) } />
                        </div>
                        <div className="btns">
                            <button className="red-btn" onClick={ () => this.register() }>Create Account</button>
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
    register: register
};

export default connect( mapStateToProps , mapDispatchToProps )( Register );