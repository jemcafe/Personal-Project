import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { getUser } from '../../redux/ducks/reducer';

// Routes
import Profile from './Profile/Profile';
import Posts from './Posts/Posts';
import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    componentDidMount () {
        // Check if user is logged in
        axios.get('/api/user').then( res => {
            this.props.getUser( res.data );
        }).catch( err => console.log(err) );

        // If not got to login
        const { user } = this.props;
        if ( !user.username ) {
            this.props.history.push('/login')
        }
    }

    render () {
        // const { user } = this.props;

        return (
            <div className="useraccount">
                <div className="useraccount-container">
                    {/* <div>The UserAccount Component</div> */}
                    
                    <div className="header">
                        <div className="header-container">

                            <div className="profile-pic">
                                <img className="image" src="http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png" alt="User pic"/>
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
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return { user: state.user };
};

const mapDispatchToProps = {
    getUser: getUser
};

export default connect( mapStateToProps , mapDispatchToProps )( UserAccount );