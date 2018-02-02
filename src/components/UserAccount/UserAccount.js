import React, { Component } from 'react';
import './UserAccount.css';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

// Components ( routes )
import Profile from './Profile/Profile';
import Posters from './Posters/Posters';
import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    // componentDidMount () {
    //     axios.get(`api/other-user/${ }`).then( res => {
            
    //     }).catch( err => console.log(err));
    // }

    render () {
        const { user } = this.props;

        return (
            <div className="useraccount">
            
                { user.username &&
                <div className="useraccount-container">
                    {/* <div>The UserAccount Component</div> */}

                    <div className="profile-header-bkgd">
                        { user.headerbkgdimgurl && <img src={ user.headerbkgdimgurl } alt="Profile header pic"/> }
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