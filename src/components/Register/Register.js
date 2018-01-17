import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor () {
        super();
        this.state = {
            username: '',
            password: '',
            name: '',
            image: ''
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
                image: this.state.image
            };

        axios.post(`/api/register`, body).then( res => {
            console.log( res.data );
            if ( res.data ) {
                this.props.login( res.data );
                this.props.history.push('/user');
            }
        }).catch( console.log() );
    }

    render () {
        return (
            <div className="login-reg">
                <div className="login-reg-container">
                    {/* <div>The Register Component</div> */}

                    <div className="info-input">
                        <div className="input">
                            <div className="info">Username</div>
                            <input className="register-input" placeholder="username" onChange={ (e) => this.handleChange('username', e.target.value) } />
                        </div>
                        <div className="input">
                            <div className="info">Password</div>
                            <input className="register-input" placeholder="password" onChange={ (e) => this.handleChange('password', e.target.value) } />
                        </div>
                        <div className="input">
                            <div className="info">Name</div>
                            <input className="register-input" placeholder="name" onChange={ (e) => this.handleChange('name', e.target.value) } />
                            </div>
                        <div className="input">
                            <div className="info">Profile Picture</div>
                            <input className="register-input" placeholder="url" onChange={ (e) => this.handleChange('image', e.target.value) } />
                        </div>
                        <div className="btns">
                            <button className="btn" onClick={ () => this.register() }>Create Account</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Register;