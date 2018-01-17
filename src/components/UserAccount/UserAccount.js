import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Routes
import Profile from './Profile/Profile';
import Posts from './Posts/Posts';
import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {
    render () {
        const { user } = this.props;

        return (
            <div className="useraccount">
                {/* { user ? */}

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

                            <Route exact path="/user" component={ Profile } />
                            <Route path="/user/posts" component={ Posts } />
                            <Route path="/user/following" component={ Following } />
                            <Route path="/user/cart" component={ Cart } />
                            <Route path="/user/settings" component={ Settings } />

                        </div>
                    </div>

                </div>

                {/* : this.props.history.push('/login') } */}
            </div>
        )
    }
}

export default connect( state => state )( UserAccount );