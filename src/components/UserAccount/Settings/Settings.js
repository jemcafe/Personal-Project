import React, { Component } from 'react';
import './Settings.css';
import { connect } from 'react-redux';

class Settings extends Component {
    constructor () {
        super();
        this.state = {
            isDeleting: false
        }
    }

    toggleDeleteConfirm = () => {
        this.setState(prevState => ({ isDeleting: !prevState.isDeleting }))
    }

    deleteAccount = () => {
        // delete account
    }

    render () {
        const { isDeleting } = this.state;
        const { user } = this.props;
        
        return (
            <div className="settings">
                <div className="settings-container">
                    <h4>SETTINGS</h4>
                    
                    <div className="avatar">
                        <img src={user.imageurl} alt="avatar"/>
                    </div>
                    
                    <div>PROFILE IMAGE</div>
                    <div>HEADER IMAGE</div>
                    <div>CHANGE PASSWORD</div>
                    <button className="gray-btn" onClick={this.toggleDeleteConfirm}>Delete Account</button>

                    { isDeleting && 
                    <div className="delete-account">
                        <div className="container">
                            <p>Are you sure?</p>
                            <button className="gray-btn" onClick={this.toggleDeleteConfirm}>Cancel</button>
                            <button className="red-btn">Yes</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect( state => state )( Settings );