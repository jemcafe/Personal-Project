import React, { Component } from 'react';
import './UserAccount.css';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

// Components
import Posters from './Posters/Posters';
// import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    componentDidMount () {
        if ( !this.props.user.username ) {
            this.props.history.push('/login');
        }
    }

    render () {
        return (
            <div className="useraccount">
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
            </div>
        )
    }
}

export default connect( state => state )( UserAccount );