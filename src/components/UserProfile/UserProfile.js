import React, { Component } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { getOtherUser, updatePosts, updatePosters } from '../../redux/ducks/reducer';

import Posts from './Posts/Posts';
import Posters from './Posters/Posters';
import Following from './Follows/Following';
import Followers from './Follows/Followers';

class Profile extends Component {
    constructor () {
        super();
        this.state = {
            profileUser: {}
        }
    }

    componentDidMount () {
        const { username } = this.props.match.params;

        axios.get(`/api/user/${username}`).then( res => {
            this.setState({ profileUser: res.data });
        }).catch( err => console.log(err) );
    }

    render () {
        const { user } = this.props;
        const { profileUser } = this.state;
        const { username } = this.props.match.params; // Needed for checking for the other users' page

        return (
            <div className="profile">
            { profileUser.username && 
                <div>
                    <div className="profile-header-bkgd">
                        <img src={profileUser.headerbkgdimgurl} alt="Profile header pic"/>
                    </div>
                    <button className="follow-btn btn">Follow</button>

                    <div className="profile-container">

                        <div className="profile-header">
                            <div className="profile-header-container">
                                <div className="profile-pic-name">
                                    <Link to={`/${profileUser.username}`}>
                                        <div className="profile-pic"><img src={profileUser.imageurl} alt="Profile pic"/></div>
                                    </Link>
                                    <h4>{ profileUser.username }</h4>
                                </div>

                                <div className="user-nav">
                                    <Link to={`/${profileUser.username}`}>Posts</Link>
                                    <Link to={`/${profileUser.username}/posters`}>Posters</Link>
                                    <Link to={`/${profileUser.username}/following`}>Following</Link>
                                    <Link to={`/${profileUser.username}/followers`}>Followers</Link>
                                </div>
                            </div>
                        </div>

                        <Route exact path={`/${profileUser.username}`} render={ () => <Posts profileUser={profileUser} paramsUsername={ username }/> } />
                        <Route path={`/${profileUser.username}/posters`} render={ () => <Posters profileUser={profileUser} paramsUsername={ username }/> } />
                        <Route path={`/${profileUser.username}/following`} render={ () => <Following profileUser={profileUser} paramsUsername={ username }/> } />
                        <Route path={`/${profileUser.username}/followers`} render={ () => <Followers profileUser={profileUser} paramsUsername={ username }/> } />

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
        posts: state.posts,
        posters: state.posters
    };
};

const mapDispatchToProps = {
    updatePosts: updatePosts,
    updatePosters: updatePosters
}

export default connect( mapStateToProps, mapDispatchToProps )( Profile );