import React, { Component } from 'react';
import axios from 'axios';

import List from './List/List';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            title: '',
            message: '',
            image: ''
        }
        this.createPost = this.createPost.bind(this);
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
            message: this.state.message,
            image: this.state.image
        };

        axios.post('/api/new-post', body).then( res => {
            console.log( res.data );
        }).catch( err => console.log( 'error', err) );
    }

    render () {
        const { posts } = this.state;

        const listOfPosts = posts.map( post => {
            return (
                <li key={ post.id }>
                    <div>{ post.title }</div>
                    <div>{ post.text }</div>
                    <div>{ post.imageurl }</div>
                    <div>{ post.dateposted }</div>
                    <div>{ post.userid }</div>
                </li>
            );
        });

        return (
            <div className="posts">
                <div className="posts-container">
                    <div>POSTS COMPONENT</div>

                    <div>
                        <input placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input placeholder="Message" onChange={ (e) => this.handleChange('message', e.target.value) }/>
                        <input placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <button onClick={ () => this.createPost() }>Post</button>
                    </div>

                    <ul>
                        { listOfPosts }
                    </ul>

                </div>
            </div>
        )
    }
}

export default Posts;