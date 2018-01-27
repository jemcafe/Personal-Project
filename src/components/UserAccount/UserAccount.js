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
                        <img src="http://www.slate.com/content/dam/slate/articles/health_and_science/Science/2016/10/161024_SCI_swamp.jpg.CROP.promo-xlarge2.jpg" alt="profile header pic"/>
                    </div>

                    <div className="profile-header">

                        <div className="profile-header-container">

                            <div className="profile-pic-name">
                                <Link to={`/${user.username}`}>
                                    <div className="profile-pic"><img src={ user.imageurl } alt="Profileres pic"/></div>
                                </Link>
                                <h4>{ user.username }</h4>
                            </div>

                            <div className="user-nav">
                                {/* <Link to={`/${user.username}`}>Profile</Link> */}
                                <Link to={`/${user.username}/posters`}>Posters</Link>
                                <Link to={`/${user.username}/following`}>Following</Link>
                                <Link to={`/${user.username}/cart`}>Cart</Link>
                                <Link to={`/${user.username}/settings`}>Settings</Link>
                            </div>

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

                </div>
                }

            </div>
        )
    }
}

export default connect( state => state )( UserAccount );