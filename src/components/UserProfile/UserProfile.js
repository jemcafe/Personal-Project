import React, { Component } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import Posts from './Posts/Posts';
import Posters from './Posters/Posters';
import Following from './Follows/Following';
import Followers from './Follows/Followers';

class Profile extends Component {
    constructor () {
        super();
        this.state = {
            profileUser: {},
            follows: [],
            followers: [],
            isFollowing: false,
        }
    }

    componentWillReceiveProps ( nextProps ) {
        // The component will receive the new props when switching to different user's profile
        const { username } = nextProps.match.params;

        axios.all([
            axios.get(`/api/profile/${username}`),
            axios.get(`/api/profile/${username}/follows`),
            axios.get(`/api/profile/${username}/followers`)
        ]).then( axios.spread( (userRes, followsRes, followersRes) => {

            this.setState(prevState => ({ 
                profileUser: userRes.data,
                follows: followsRes.data,
                followers: followersRes.data,
                isFollowing: followersRes.data.find( e => e.username === this.props.user.username ) ? true : false
            }));

        })).catch(err => console.log(err));
    }

    componentDidMount () {
        // If the page is visited directly and there is no profile data for the user specified in the url, the user's profile data will be retrieved
        const { username } = this.props.match.params;

        if ( !this.state.profileUser.username ) {
            axios.get(`/api/profile/${username}`).then( user => {
                this.setState({ profileUser: user.data });
            }).catch(err => console.log(err) );
        }
    }

    follow = () => {
        const userId = this.state.profileUser.id;
        axios.post('/api/follow', { userId }).then( res => {
            this.setState(prevState => ({ isFollowing: !prevState.isFollowing }));
        }).catch(err => console.log(err));
    }

    unfollow = () => {
        const userId = this.state.profileUser.id;
        axios.delete(`/api/unfollow/${ userId }`).then( res => {
            this.setState( prevState => ({ isFollowing: !prevState.isFollowing }));
        }).catch(err => console.log(err));
    }

    render () {
        const { user } = this.props;
        const { profileUser, follows, followers, isFollowing } = this.state;
        const { username } = this.props.match.params;  // This is needed for checking if the user is on their profile page
        
        return (
            <div className="profile">
            { profileUser.username ? (
                <div>
                    <div className="profile-header-bkgd">
                        { profileUser.headerbkgdimgurl && <img src={profileUser.headerbkgdimgurl} alt="Profile header pic"/> }
                    </div>

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

                                <div className="follow-btn-container panel">
                                { user.username !== username && (
                                    !user.username
                                    ? <Link to="/login"><button className="red-btn">Follow</button></Link> 
                                    : isFollowing
                                    ? <button className="red-btn" onClick={ this.unfollow }>Unfollow</button>
                                    : <button className="red-btn" onClick={ this.follow }>Follow</button>
                                ) }
                                </div>
                            </div>
                        </div>

                        <Switch>
                            <Route exact path={`/${profileUser.username}`} render={ () => <Posts profileUser={ profileUser } paramsUsername={ username }/> } />
                            <Route path={`/${profileUser.username}/posters`} render={ () => <Posters profileUser={ profileUser } paramsUsername={ username }/> } />
                            <Route path={`/${profileUser.username}/following`} render={ () => <Following profileUser={ profileUser } paramsUsername={ username } follows={follows} /> } />
                            <Route path={`/${profileUser.username}/followers`} render={ () => <Followers profileUser={ profileUser } paramsUsername={ username } followers={followers} /> } />
                        </Switch>

                    </div>
                </div> 
            ) : (
                <div className="loading-container">
                    <div className="circle">
                        <div className="line"></div>
                    </div>
                </div>
            ) }
                
            </div>
        )
    }
}

export default connect( state => state )( Profile );