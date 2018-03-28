import React, { Component } from 'react';
import './Settings.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/ducks/reducer';

class Settings extends Component {
    constructor () {
        super();
        this.state = {
            avatar: '',
            header_bkgd_img: '',

            oldPwd: '',
            oldPwdGiven: true,
            isOldPwd: true,
            newPwd: '',
            newPwdGiven: true,
            confirmedPwd: '',
            newPwdConfirmed: true,
            pwdChanged: false,

            isDeletingAccount: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
        console.log( property, value );
    }

    changeAvatar = () => {
        const { avatar } = this.state;

        // The protocol is checked
        if ( avatar.slice(0,8) === 'https://' || avatar.slice(0,7) === 'http://' ) {
            axios.put(`/api/avatar/update`, { avatar })
            .then( user => {
                this.props.getUser( user.data );
            }).catch(err => console.log(err));
        }
    }

    removeAvatar = () => {
        axios.put(`/api/avatar/update`)
        .then( user => {
            this.props.getUser( user.data );
        }).catch(err => console.log(err));
    }

    changeHeaderImage = () => {
        const { header_bkgd_img } = this.state;

        // The protocol is checked
        if ( header_bkgd_img.slice(0,8) === 'https://' || header_bkgd_img.slice(0,7) === 'http://' ) {
            axios.put(`/api/header-image/update`, { header_bkgd_img })
            .then( user => {
                this.props.getUser( user.data );
            }).catch(err => console.log(err));
        }
    }

    removeHeaderImage = () => {
        axios.put(`/api/header-image/update`)
        .then( user => {
            this.props.getUser( user.data );
        }).catch(err => console.log(err));
    }

    changePassword = (e) => {
        // Prevents the form from submitting
        e.preventDefault();

        const { oldPwd, newPwd, confirmedPwd } = this.state;

        // update password
        axios.put(`/api/password/update`, { 
            oldPwd, newPwd, confirmedPwd 
        }).then( () => {
            this.setState({
                oldPwdGiven: true,
                isOldPwd: true,
                newPwdGiven: true,
                newPwdConfirmed: true,
                pwdChanged: true
            });
        }).catch( err => {
            console.log(err);
            if ( err.response.status === 412 ) {
                if ( err.response.data === 'old password' ) {
                    this.setState({
                        oldPwdGiven: false,
                        isOldPwd: true,
                        newPwdGiven: true,
                        newPwdConfirmed: true,
                        pwdChanged: false,
                    });
                } else if ( err.response.data === 'new password' ) {
                    this.setState({
                        oldPwdGiven: true,
                        isOldPwd: true,
                        newPwdGiven: false,
                        newPwdConfirmed: true,
                        pwdChanged: false,
                    });
                }
            } else if ( err.response.status === 403 ) {
                this.setState({
                    oldPwdGiven: true,
                    isOldPwd: false,
                    newPwdGiven: true,
                    newPwdConfirmed: true,
                    pwdChanged: false,
                });
            } else if ( err.response.status === 404 ) {
                this.setState({ 
                    oldPwdGiven: true,
                    isOldPwd: true,
                    newPwdGiven: true,
                    newPwdConfirmed: false,
                    pwdChanged: false,
                });
            } 
        });
    }

    toggleDeleteConfirm = () => {
        this.setState(prevState => ({ 
            isDeletingAccount: !prevState.isDeletingAccount 
        }))
    }

    render () {
        const { oldPwdGiven, isOldPwd, newPwdGiven, newPwdConfirmed, pwdChanged, isDeletingAccount } = this.state;
        const { user, deleteAccount } = this.props;
        
        return (
            <div className="settings">
                <div className="container">
                    {/* <h4>SETTINGS</h4> */}
                    {/* The avatar and header image change sections will eventually be dropzones */}
                    <div>
                        <div className="avatar" style={{background: `center / cover no-repeat url(${user.avatar})`}}></div>
                        <button className="remove-btn" onClick={ this.removeAvatar }>Remove image</button>
                        <div className="change-input">
                            <input className="input" placeholder="Avatar (url)" onChange={(e) => this.handleChange('avatar', e.target.value)}/>
                            <button className="red-btn-2" onClick={ this.changeAvatar }>Save image</button>
                        </div>
                    </div>

                    <div>
                        <div className="header-bkgd">
                            { user.header_bkgd_img && <img src={ user.header_bkgd_img } alt="header background"/> }
                        </div>
                        <button className="remove-btn" onClick={ this.removeHeaderImage }>Remove image</button>
                        <div className="change-input">
                            <input className="input" placeholder="Header image (url)" onChange={(e) => this.handleChange('header_bkgd_img', e.target.value)}/>
                            <button className="red-btn-2" onClick={ this.changeHeaderImage }>Save image</button>
                        </div>
                    </div>

                    <div>
                        <h4>Change Password</h4>

                        { !oldPwdGiven && <div style={{color: 'red', fontSize: '12px'}}>* Old password</div> }
                        { !isOldPwd && <div style={{color: 'red', fontSize: '12px'}}>* Wrong password</div> }
                        { !newPwdGiven && <div style={{color: 'red', fontSize: '12px'}}>* New password</div> }
                        { !newPwdConfirmed && <div style={{color: 'red', fontSize: '12px'}}>* New password unconfirmed</div> }
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
                                <button className="red-btn" onClick={ deleteAccount }>Yes</button>
                                <button className="gray-btn" onClick={ this.toggleDeleteConfirm }>Cancel</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    getUser: getUser
}

export default connect( mapStateToProps, mapDispatchToProps )( Settings );