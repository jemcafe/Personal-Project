import React, { Component } from 'react';
import './UserAccount.css';
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';

// Components ( routes )
import Profile from './Profile/Profile';
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

                    <div className="profile-header-bkgd">
                        <img src="https://static.pexels.com/photos/572688/pexels-photo-572688.jpeg" alt="profile header pic"/>
                    </div>

                    <div className="main">
                        <div className="main-container">

                            <Route exact path="/:username" component={ Profile } />
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