import React, { Component } from 'react';
import './Settings.css';
import axios from 'axios';

import { connect } from 'react-redux';

class Settings extends Component {
    constructor () {
        super();
        this.state = {
            oldPwd: '',
            newPwd: '',
            confirmedPwd: '',
            isOldPwd: true,
            newPwdConfirmed: true,
            pwdChanged: false,
            isDeletingAccount: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleDeleteConfirm = () => {
        this.setState(prevState => ({ isDeletingAccount: !prevState.isDeletingAccount }))
    }

    changePassword = (e) => {
        // Prevents the form submission
        e.preventDefault();

        const { oldPwd, newPwd, confirmedPwd } = this.state;

        // update password
        if ( oldPwd && newPwd && confirmedPwd ) {
            axios.put(`/api/password/update`, { 
                oldPwd, 
                newPwd, 
                confirmedPwd 
            }).then( res => {
                this.setState({
                    isOldPwd: true,
                    newPwdConfirmed: true,
                    pwdChanged: true
                });
            }).catch( err => {
                console.log(err);
                if ( err.response.status === 403) {
                    this.setState({
                        isOldPwd: false,
                        newPwdConfirmed: true,
                        pwdChanged: false
                    });
                } else if ( err.response.status === 404) {
                    this.setState({ 
                        isOldPwd: true,
                        newPwdConfirmed: false,
                        pwdChanged: false,
                    });
                } 
            });
        }
    }

    deleteAccount = () => {
        // delete account
    }

    render () {
        const { isOldPwd, newPwdConfirmed, pwdChanged, isDeletingAccount } = this.state;
        const { user } = this.props;
        
        return (
            <div className="settings">
                <div className="container">
                    <h4>SETTINGS</h4>
                    
                    <div>
                        <div className="avatar"><img src={user.imageurl} alt="avatar"/></div>
                        <button className="red-btn">Change avatar</button>
                    </div>

                    <div>
                        <h4>Change Password</h4>

                        { !isOldPwd && <div style={{color: 'red', fontSize: '12px'}}>* Wrong password</div> }
                        { !newPwdConfirmed && <div style={{color: 'red', fontSize: '12px'}}>* Passwords does not match</div> }
                        { pwdChanged && <div style={{color: 'green', fontSize: '12px'}}>* Password updated</div> }

                        <form className="change-pwd-form" onSubmit={ this.changePassword }>
                            <input className="input" type="password" placeholder="Old password" onChange={(e) => this.handleChange('oldPwd', e.target.value)}/>
                            <input className="input" type="password" placeholder="New password" onChange={(e) => this.handleChange('newPwd', e.target.value)}/>
                            <input className="input" type="password" placeholder="Confirm password" onChange={(e) => this.handleChange('confirmedPwd', e.target.value)}/>
                            <button className="red-btn" type="submit">Change Password</button>
                        </form>
                    </div>
                    
                    <div style={{padding: '20px 0 50px 0'}}>
                        <h4>Delete Account</h4>
                        <div><button className="gray-btn" onClick={this.toggleDeleteConfirm}>Delete Account</button></div>
                        { isDeletingAccount && 
                        <div className="delete-account">
                            <div className="container">
                                <p>Are you sure?</p>
                                <button className="red-btn">Yes</button>
                                <button className="gray-btn" onClick={this.toggleDeleteConfirm}>Cancel</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect( state => state )( Settings );