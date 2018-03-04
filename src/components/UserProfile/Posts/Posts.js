import React, { Component } from 'react';
import './Posts.css';
import axios from 'axios';

import { connect } from 'react-redux';

import Post from './Post/Post';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            posters: [],
            title: '',
            text: '',
            image: '',
        }
        // Methods do not need to be binded if they are function expressions ( React 2016 )
    }

    componentDidMount () {
        const { profileUser } = this.props;

        axios.all([
            axios.get(`/api/posts/${profileUser.id}`),
            axios.get(`/api/recent-posters/${profileUser.id}`)
        ]).then(axios.spread( ( posts, posters ) => {
            this.setState({ posts: posts.data, posters: posters.data });
        })).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost ( title, text, image ) {
        const { profileUser } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        if ( title && text ) {
            axios.post('/api/new-post', body).then( res => {

                axios.get(`/api/posts/${profileUser.id}`).then( posts => {
                    this.setState({ posts: posts.data, title: '', text: '', image: '' });
                }).catch( err => console.log(err) );

            }).catch( err => console.log( err ) );
        }
    }

    editPost = ( id, title, text, image ) => {
        const { profileUser } = this.props;
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.put(`/api/edit-post/${ id }`, body).then( res => {

            axios.get(`/api/posts/${profileUser.id}`).then( posts => {
                this.setState({ posts: posts.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }
    

    deletePost = ( id ) => {
        const { profileUser } = this.props;

        axios.delete(`/api/delete-post/${ id }`).then( res => {

            axios.get(`/api/posts/${profileUser.id}`).then( posts => {
                this.setState({ posts: posts.data });
            }).catch( err => console.log( err ) );
            
        }).catch( err => console.log( err ) );
    }

    render () {
        const { posts, posters, title, text, image } = this.state;
        const { user, profileUser, paramsUsername } = this.props;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id }
                         profileUser = { profileUser }
                         paramsUsername = { paramsUsername }
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        const listOfRecentPosters = posters.map( poster => {
            return <li key={ poster.id } className="fade-in"><img src={ poster.imageurl } alt="poster pic"/></li> 
        });

        return (
            <div className="posts">
                <div className="posts-container">

                    <div className="posts-list">
                        <div className="posts-list-container">
                            { user.username === paramsUsername &&
                            <div className="new-post">
                                <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                                <input className="input" value={ image } placeholder="Image Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                                <textarea className="input" rows="1" cols="10" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                                <button className="btn" onClick={ () => this.createPost(title, text, image) }>Post</button>
                            </div> }

                            { listOfPosts.length ? 
                            <div><ul >{ listOfPosts }</ul></div> : 
                            user.username === paramsUsername ? 
                            <div><h5>You haven't made any posts</h5></div> : 
                            <div><h5>No posts</h5></div> }
                        </div>
                    </div>

                    <div className="latest">
                        <div className="latest-container">
                            <h4>Recent Posters</h4>
                            
                            { listOfRecentPosters.length ? 
                            <div><ul>{ listOfRecentPosters }</ul></div> : 
                            <h5>No posters</h5> }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posts );