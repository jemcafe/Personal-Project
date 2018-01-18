import React, { Component } from 'react';
import axios from 'axios';

import Post from './Post/Post';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            title: '',
            text: '',
            image: ''
        }
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount () {
        axios.get('/api/posts').then( res => {
            console.log( res.data );
            this.setState({ posts: res.data });
            console.log(this.state.posts);
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost () {
        const body = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image
        };

        axios.post('/api/new-post', body).then( res => {
            console.log( res.data );
            // The new post is added to the list of posts
            this.setState({ posts: [ ...this.state.posts, res.data[0] ] });
        }).catch( err => console.log( 'error', err) );
    }

    editPost ( postId, title, text, image ) {
        const body = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image
        };

        axios.post(`/api/edit-post/${ postId }`, body).then( res => {
            console.log( res.data );
        }).catch( err => console.log( 'error', err) );
    }
    

    deletePost ( postId ) {
        axios.delete(`/api/delete-post/${ postId }`).then( res => {
            console.log( res.data );
        }).catch( err => console.log(err) );
    }

    render () {
        const { posts } = this.state;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id } 
                         id={ post.id } 
                         title={post.title } 
                         text={ post.text } 
                         image={ post.imageurl }
                         date={ post.dateposted }
                         userId={ post.userId } 
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        return (
            <div className="posts">
                <div className="posts-container">
                    <div>POSTS COMPONENT</div>

                    <div>
                        <input placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input placeholder="text" onChange={ (e) => this.handleChange('text', e.target.value) }/>
                        <input placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <button onClick={ () => this.createPost() }>Post</button>
                    </div>

                    <ul className="posts-list">
                        { listOfPosts }
                    </ul>

                </div>
            </div>
        )
    }
}

export default Posts;