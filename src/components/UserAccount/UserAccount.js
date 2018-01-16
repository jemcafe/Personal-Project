import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserAccount extends Component {

    render () {
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

export default UserAccount;