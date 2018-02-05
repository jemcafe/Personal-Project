import React, { Component } from 'react';
import './Posts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { updatePosts, updatePosters } from '../../../redux/ducks/reducer';

import Post from './Post/Post';

class Posts extends Component {
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
        const { profileUser, updatePosts, updatePosters } = this.props;
        console.log( profileUser );

        axios.get(`/api/posts/${profileUser.id}`).then( posts => {
            console.log( posts.data )
            updatePosts( posts.data );
        }).catch( err => console.log(err) );

        axios.get(`/api/recent-posters/${profileUser.id}`).then( posters => {
            console.log( posters.data )
            updatePosters( posters.data );
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost ( title, text, image ) {
        const { profileUser, updatePosts } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        if ( title && text ) {
            axios.post('/api/new-post', body).then( res => {

                axios.get(`/api/posts/${profileUser.id}`).then( resp => {
                    updatePosts( resp.data );
                    this.setState({ title: '', text: '', image: '' });
                }).catch( err => console.log(err) );

            }).catch( err => console.log( err ) );
        }
    }

    editPost ( id, title, text, image ) {
        const { profileUser, updatePosts } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.put(`/api/edit-post/${ id }`, body).then( res => {

            axios.get(`/api/posts/${profileUser.id}`).then( resp => {
                updatePosts( resp.data );
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }
    

    deletePost ( id ) {
        const { profileUser, updatePosts } = this.props;

        axios.delete(`/api/delete-post/${ id }`).then( res => {

            axios.get(`/api/posts/${profileUser.id}`).then( resp => {
                updatePosts( resp.data );
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { title, text, image } = this.state;
        const { user, profileUser, paramsUsername, posts, posters } = this.props;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id }
                         profileUser = { profileUser }
                         paramsUsername = { paramsUsername }
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        const listOfRecentPosters = posters.map( poster => <li key={ poster.id }><img src={ poster.imageurl } alt="poster pic"/></li> );

        return (
            <div className="posts">
                <div className="posts-container">

                    {/* <h3>Posts</h3> */}
                    { listOfPosts.length ? <ul className="posts-list">{ listOfPosts }</ul> : user.username === paramsUsername ? <ul><h5>You haven't made any posts</h5></ul> : <ul><h5>No posts</h5></ul> }
                    
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
        posts: state.posts,
        posters: state.posters
    };
};

const mapDispatchToProps = {
    updatePosts: updatePosts,
    updatePosters: updatePosters
}

export default connect( mapStateToProps, mapDispatchToProps )( Posts );