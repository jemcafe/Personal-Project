import React, { Component } from 'react';
import './UserAccount.css';
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';

// Components ( routes )
import Profile from './Profile/Profile';
import Posts from './Posts/Posts';
import Posters from './Posters/Posters';
import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    render () {
        const { user } = this.props;

        return (
            <div className="useraccount">
            
                { user.username &&
                <div className="useraccount-container">
                    {/* <div>The UserAccount Component</div> */}

                    <div className="header">
                        <div className="header-container">

                            <div className="profile-pic-name">
                                <Link to={`/${user.username}`}>
                                    <div className="profile-pic"><img src={ user.imageurl } alt="Profileres pic"/></div>
                                </Link>
                                <div>{ user.username }</div>
                            </div>

                            <div className="nav">
                                <Link to={`/${user.username}`}>Profile</Link>
                                <Link to={`/${user.username}/posters`}>Posters</Link>
                                <Link to={`/${user.username}/following`}>Following</Link>
                                <Link to={`/${user.username}/cart`}>Cart</Link>
                                <Link to={`/${user.username}/settings`}>Settings</Link>
                            </div>

                        </div>
                    </div>

                    <div className="main">
                        <div className="main-container">

                            {/* <Route exact path="/:username" component={ Profile } /> */}
                            <Route exact path="/:username" component={ Posts } />
                            <Route path="/:username/posters" component={ Posters } />
                            <Route path="/:username/following" component={ Following } />
                            <Route path="/:username/cart" component={ Cart } />
                            <Route path="/:username/settings" component={ Settings } />

                        </div>
                    </div>

                </div>
                }

            </div>
        )
    }
}

export default connect( state => state )( UserAccount );