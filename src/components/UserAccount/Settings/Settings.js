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
            headerBkgdImgUrl: '',
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
        console.log( property, value );
    }

    changeAvatar = () => {
        const { avatar } = this.state;
        axios.put(`/api/avatar/update`, { avatar })
        .then( user => {
            this.props.getUser( user.data );
         }).catch(err => console.log(err));
    }

    removeAvatar = () => {
        axios.put(`/api/avatar/update`, { avatar: '' })
        .then( user => {
            this.props.getUser( user.data );
         }).catch(err => console.log(err));
    }

    changeHeaderImage = () => {
        const { headerBkgdImgUrl } = this.state;
        axios.put(`/api/header-image/update`, { headerBkgdImgUrl })
        .then( user => {
            this.props.getUser( user.data );
         }).catch(err => console.log(err));
    }

    removeHeaderImage = () => {
        axios.put(`/api/header-image/update`, { headerBkgdImgUrl: '' })
        .then( user => {
            this.props.getUser( user.data );
        }).catch(err => console.log(err));
    }

    changePassword = (e) => {
        // Prevents the form from submitting
        e.preventDefault();

        const { oldPwd, newPwd, confirmedPwd } = this.state;

        // update password
        if ( oldPwd && newPwd && confirmedPwd ) {
            axios.put(`/api/password/update`, { 
                oldPwd, newPwd, confirmedPwd 
            }).then( () => {
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

    toggleDeleteConfirm = () => {
        this.setState(prevState => ({ 
            isDeletingAccount: !prevState.isDeletingAccount 
        }))
    }

    render () {
        const { isOldPwd, newPwdConfirmed, pwdChanged, isDeletingAccount } = this.state;
        const { user, deleteAccount } = this.props;
        
        return (
            <div className="settings">
                <div className="container">
                    {/* <h4>SETTINGS</h4> */}
                    {/* The avatar and header image change sections will eventually be dropzones */}
                    <div>
                        <div className="avatar" style={{background: `center / cover no-repeat url(${user.imageurl})`}}>
                            {/* <img src={ user.imageurl } alt="avatar"/> */}
                        </div>
                        <button className="remove-btn" onClick={ this.removeAvatar }>Remove image</button>
                        <div className="change-input">
                            <input className="input" placeholder="Avatar (url)" onChange={(e) => this.handleChange('avatar', e.target.value)}/>
                            <button className="red-btn-2" onClick={ this.changeAvatar }>Save image</button>
                        </div>
                    </div>

                    <div>
                        <div className="header-bkgd">
                            { user.headerbkgdimgurl && <img src={ user.headerbkgdimgurl } alt="header background"/> }
                        </div>
                        <button className="remove-btn" onClick={ this.removeHeaderImage }>Remove image</button>
                        <div className="change-input">
                            <input className="input" placeholder="Header image (url)" onChange={(e) => this.handleChange('headerBkgdImgUrl', e.target.value)}/>
                            <button className="red-btn-2" onClick={ this.changeHeaderImage }>Save image</button>
                        </div>
                    </div>

                    <div>
                        <h4>Change Password</h4>

                        { !isOldPwd && <div style={{color: 'red', fontSize: '12px'}}>* Wrong password</div> }
                        { !newPwdConfirmed && <div style={{color: 'red', fontSize: '12px'}}>* Passwords do not match</div> }
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