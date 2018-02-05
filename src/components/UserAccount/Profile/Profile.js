import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getOtherUser, updatePosts, updatePosters } from '../../../redux/ducks/reducer';

import Post from './Post/Post';

class Profile extends Component {
    constructor () {
        super();
        this.state = {
            title: '',
            text: '',
            image: '',
        }
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount () {
        const { user, otherUser, getOtherUser, updatePosts, updatePosters } = this.props;
        const { paramsUsername } = this.props;

        // If it's not the logged in user's page, get the other user's data
        if ( user.username !== paramsUsername ) {
            axios.get(`/api/other-user/${paramsUsername}`).then( res => {

                getOtherUser( res.data );

                axios.get(`/api/posts/${res.data.id}`).then( posts => {
                    updatePosts( posts.data );
                }).catch( err => console.log(err) );

                axios.get(`/api/recent-posters/${res.data.id}`).then( posters => {
                    updatePosters( posters.data );
                }).catch( err => console.log(err) );

            }).catch( err => console.log(err) );
        } else { 
            getOtherUser( {} );

            // Get the user's posts
            axios.get(`/api/posts/${user.id}`).then( res => {
                updatePosts( res.data );
            }).catch( err => console.log(err) );

            // Get the user's most recent posters ( max of 3 )
            axios.get(`/api/recent-posters/${user.id}`).then( res => {
                updatePosters( res.data );
            }).catch( err => console.log(err) );
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost ( title, text, image ) {
        const { user, otherUser, updatePosts } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        if ( title && text ) {
            axios.post('/api/new-post', body).then( res => {

                axios.get(`/api/posts/${otherUser.id ? otherUser.id : user.id}`).then( resp => {
                    updatePosts( resp.data );
                    this.setState({ title: '', text: '', image: '' });
                }).catch( err => console.log(err) );

            }).catch( err => console.log( err ) );
        }
    }

    editPost ( id, title, text, image ) {
        const { user, otherUser, updatePosts } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.put(`/api/edit-post/${ id }`, body).then( res => {

            axios.get(`/api/posts/${otherUser.id ? otherUser.id : user.id}`).then( resp => {
                updatePosts( resp.data );
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }
    

    deletePost ( id ) {
        const { user, otherUser, updatePosts } = this.props;

        axios.delete(`/api/delete-post/${ id }`).then( res => {

            axios.get(`/api/posts/${otherUser.id ? otherUser.id : user.id}`).then( resp => {
                updatePosts( resp.data );
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { title, text, image } = this.state;
        const { user, otherUser, paramsUsername, posts, posters } = this.props;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id }
                         paramsUsername = { paramsUsername }
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        const listOfRecentPosters = posters.map( poster => <li key={ poster.id }><img src={ poster.imageurl } alt="poster pic"/></li> );

        return (
            <div className="profile">

                <div className="profile-header-bkgd">
                    { (otherUser.headerbkgdimgurl || user.headerbkgdimgurl) && 
                        <img src={ user.username === paramsUsername ? user.headerbkgdimgurl : otherUser.headerbkgdimgurl } alt="Profile header pic"/>
                    }
                </div>
                <button className="follow-btn btn">Follow</button>

                <div className="profile-container">

                    <div className="profile-header">
                        <div className="profile-header-container">
                            <div className="profile-pic-name">
                                <Link to={`/${otherUser.username || user.username}`}>
                                    <div className="profile-pic"><img src={otherUser.imageurl || user.imageurl} alt="Profile pic"/></div>
                                </Link>
                                <h4>{ otherUser.username || user.username }</h4>
                            </div>

                            <div className="user-nav">
                                <Link to={`/${otherUser.username || user.username}/posters`}>Posters</Link>
                                <Link to={`/${otherUser.username || user.username}/following`}>Following</Link>
                            </div>
                        </div>
                    </div>

                    <div className="posts-container">
                        { user.username === paramsUsername &&
                        <div className="new-post">
                            <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                            <input className="input" value={ image } placeholder="Image Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                            <textarea className="input" rows="1" cols="10" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                            <button className="btn" onClick={ () => this.createPost(title, text, image) }>Post</button>
                        </div>
                        }
                        
                        { listOfPosts.length ? <ul className="posts-list">{ listOfPosts }</ul> : user.username === paramsUsername ? <h5>You haven't made any posts</h5> : <h5>No posts</h5> }
                    </div>

                    <div className="latest">
                        <div className="latest-container">
                            <h4>Recent Posters</h4>
                            { listOfRecentPosters.length ? <div><ul>{ listOfRecentPosters }</ul></div> : <h5>No posters</h5> }
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        otherUser: state.otherUser,
        posts: state.posts,
        posters: state.posters
    };
};

const mapDispatchToProps = {
    getOtherUser: getOtherUser,
    updatePosts: updatePosts,
    updatePosters: updatePosters
}

export default connect( mapStateToProps, mapDispatchToProps )( Profile );