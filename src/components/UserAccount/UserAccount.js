import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../Login/Login';

class UserAccount extends Component {
    render () {
        const { user } = this.props;

        // const accessAccount = null;

        return (
            <div className="useraccount">
                <div className="useraccount-container">
                    {/* <div>The UserAccount Component</div> */}
                    
                    <div className="header">
                        <div className="header-container">

                            <div className="profile-pic">
                                <img className="picture" src="http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png" alt="User pic"/>
                                <div>USERNAME</div>
                            </div>
                            <div className="nav">
                                <Link to="/user/posts">Posts</Link>
                                <Link to="/user/following">Following</Link>
                                <Link to="/user/cart">Cart</Link>
                                <Link to="/user/settings">Settings</Link>
                            </div>

                        </div>
                    </div>

                    <div className="main">
                        <div className="main-container">

                            { this.props.children }

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( UserAccount );