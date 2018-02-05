import React, { Component } from 'react';
import './UserAccount.css';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { getOtherUser, updatePosts, updatePosters } from '../../redux/ducks/reducer';

// Components ( routes )
// import Profile from './Profile/Profile';
import Posters from './Posters/Posters';
import Following from './Following/Following';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    componentWillMount () {
        const { user, otherUser, getOtherUser, updatePosts, updatePosters } = this.props;
        const { username } = this.props.match.params;

        if ( user.username !== username ) {
            axios.get(`/api/other-user/${username}`).then( res => {

                getOtherUser( res.data );

                // Get the user's posts
                axios.get(`/api/posts/${res.data.id}`).then( posts => {
                    updatePosts( posts.data );
                }).catch( err => console.log(err) );

                // Get the user's most recent posters ( max of 3 )
                axios.get(`/api/recent-posters/${res.data.id}`).then( posters => {
                    updatePosters( posters.data );
                }).catch( err => console.log(err) );

            }).catch( err => console.log(err) );
        } else { getOtherUser({}) }
    }

    render () {
        const { user, otherUser } = this.props;
        const { username } = this.props.match.params; // Needed for checking for the other users' page

        return (
            <div className="useraccount">
                { ( otherUser.username || user.username ) &&
                <div className="useraccount-container">

                    <div className="main">
                        <div className="main-container">

                            {/* <Route exact path={`/${username}`} render={ () => <Profile paramsUsername={ username }/> } /> */}
                            <Route path={`/${username}/posters`} render={ () => <Posters paramsUsername={ username }/> } />
                            <Route path={`/${username}/following`} render={ () => <Following paramsUsername={ username }/> } />
                            { user.username === username && <Route path={`/${username}/cart`} component={ Cart } /> }
                            { user.username === username && <Route path={`/${username}/settings`} component={ Settings } /> }

                        </div>
                    </div>

                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        otherUser: state.otherUser
    };
};

const mapDispatchToProps = {
    getOtherUser,
    updatePosts,
    updatePosters
}

export default connect( mapStateToProps, mapDispatchToProps )( UserAccount );