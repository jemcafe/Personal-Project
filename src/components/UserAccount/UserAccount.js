import React, { Component } from 'react';
import './UserAccount.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// Components ( routes )
import Posters from './Posters/Posters';
// import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    render () {
        const { user } = this.props;

        return (
            <div className="useraccount">
                { user.username ? (
                <div className="useraccount-container">

                    <div className="main">
                        <div className="main-container">

                            <Switch>
                                <Route path={`/useraccount/posters`} component={ Posters } />
                                {/* <Route path={`/useraccount/following`} component={ following } /> */}
                                <Route path={`/useraccount/cart`} component={ Cart } />
                                <Route path={`/useraccount/settings`} component={ Settings } />
                            </Switch>

                        </div>
                    </div>

                </div>
                ) : (
                <Redirect to="/login" />
                ) }
            </div>
        )
    }
}

export default connect( state => state )( UserAccount );