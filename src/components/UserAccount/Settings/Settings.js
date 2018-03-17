import React, { Component } from 'react';
import './Settings.css';
import { connect } from 'react-redux';

class Settings extends Component {
    constructor () {
        super();
        this.state = {
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            pwdChanged: false,
            isDeleting: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleDeleteConfirm = () => {
        this.setState(prevState => ({ isDeleting: !prevState.isDeleting }))
    }

    changePassword = () => {
        // update password
    }

    deleteAccount = () => {
        // delete account
    }

    render () {
        const { isDeleting } = this.state;
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
                        <form className="change-pwd-form">
                            <input className="input" placeholder="Old password"/>
                            <input className="input" placeholder="New password"/>
                            <input className="input" placeholder="Confirm password"/>
                            {/* <button className="red-btn" type="submit">Change Password</button> */}
                        </form>
                        <button className="red-btn" type="submit">Change Password</button>
                    </div>
                    
                    <div style={{padding: '20px 0 50px 0'}}>
                        <h4>Delete Account</h4>
                        <div><button className="gray-btn" onClick={this.toggleDeleteConfirm}>Delete Account</button></div>
                        { isDeleting && 
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