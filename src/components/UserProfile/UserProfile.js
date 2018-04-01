import React, { Component } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Components
import Header from '../Header/Header';
import Posts from './Posts/Posts';
import Posters from './Posters/Posters';
import Following from './Follows/Following';
import Followers from './Follows/Followers';
// import Uploader from '../Uploader/Uploader';

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
        // console.log('Profile receive props', nextProps);
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
        const user_id = this.state.profileUser.id;
        axios.post('/api/follow', { user_id }).then( res => {
            this.setState(prevState => ({ isFollowing: !prevState.isFollowing }));
        }).catch(err => console.log(err));
    }

    unfollow = () => {
        const user_id = this.state.profileUser.id;
        axios.delete(`/api/unfollow/${ user_id }`).then( res => {
            this.setState( prevState => ({ isFollowing: !prevState.isFollowing }));
        }).catch(err => console.log(err));
    }

    render () {
        const { user } = this.props;
        const { profileUser, follows, followers, isFollowing } = this.state;
        const { username } = this.props.match.params; // This is needed for checking if the user is on their profile page
        
        return (
            <div className="profile">
                <Header match={this.props.match} history={this.props.history} />

                { profileUser.username &&
                <div className="container">
                    <div className="header-bkgd" style={{background: `center / cover no-repeat url(${profileUser.header_bkgd_img})`}}>
                        {/* <Uploader /> */}
                    </div>

                    <div className="profile-container panel">

                        <div className="header-menu">
                            <div className="container">
                                <div className="avatar-name">
                                    <Link to={`/${profileUser.username}`}>
                                        <div className="avatar" style={{background: `center / cover no-repeat url(${profileUser.avatar})`}}></div>
                                    </Link>
                                    <h3>{ profileUser.username }</h3>
                                </div>

                                <div className="profile-nav">
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
                                    ? <button className="gray-btn" onClick={ this.unfollow }>Unfollow</button>
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
                }
                
            </div>
        )
    }
}

export default connect( state => state )( Profile );