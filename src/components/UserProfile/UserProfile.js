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
            profileUser: {}
        }
    }

    componentDidMount() {
        if ( !this.state.profileUser.username ) {
            axios.get(`/api/user/${this.props.match.params.username}`).then( res => {
                this.setState({ profileUser: res.data });
            }).catch( err => console.log('Error', err) );
        }
    }

    componentWillReceiveProps (nextProps) {
        axios.get(`/api/user/${nextProps.match.params.username}`).then( res => {
            this.setState({ profileUser: res.data });
        }).catch( err => console.log('Error', err) );
    }

    follow ( profileUserId ) {
        axios.post('/api/follow', { profileUserId }).then( res => {
            console.log( res.data );
        }).catch( err => console.log('Error', err) );
    }

    unfollow ( id ) {
        axios.delete(`/api/unfollow/${ id }`).then( res => {
            console.log( res.data );
        }).catch( err => console.log('Error', err) );
    }

    render () {
        const { user } = this.props;
        const { profileUser } = this.state;
        const { username } = this.props.match.params; // This is needed for checking if the user is on their profile page
        console.log('UserProfile profileUser', profileUser)
        
        return (
            <div className="profile">
            { profileUser.username && 
                <div>
                    <div className="profile-header-bkgd">
                        { profileUser.headerbkgdimgurl && <img src={profileUser.headerbkgdimgurl} alt="Profile header pic"/> }
                    </div>

                    { user.username !== username && ( 
                        !user.username ? <Link to="/login"><button className="follow-btn btn">Follow</button></Link> :
                        <button className="follow-btn btn" onClick={ () => this.follow( profileUser.id ) }>Follow</button> 
                    ) }

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

                        <Switch>
                            <Route exact path={`/${profileUser.username}`} render={ () => <Posts profileUser={ profileUser } paramsUsername={ username }/> } />
                            <Route path={`/${profileUser.username}/posters`} render={ () => <Posters profileUser={ profileUser } paramsUsername={ username }/> } />
                            <Route path={`/${profileUser.username}/following`} render={ () => <Following profileUser={ profileUser } paramsUsername={ username }/> } />
                            <Route path={`/${profileUser.username}/followers`} render={ () => <Followers profileUser={ profileUser } paramsUsername={ username }/> } />
                        </Switch>

                    </div>
                </div> 
            }
                
            </div>
        )
    }
}

export default connect( state => state )( Profile );