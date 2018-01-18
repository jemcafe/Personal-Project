import React, { Component } from 'react';
import axios from 'axios';

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
            // The new post is added to the list of posts
            this.setState({ posts: [ ...this.state.posts, res.data[0] ] });
        }).catch( err => console.log( 'error', err) );
    }

    // editPost ( postId ) {
    //     const body = {
    //         title: this.state.title,
    //         message: this.state.message,
    //         image: this.state.image
    //     };

    //     axios.post(`/api/edit-post/${ post.id }`, body).then( res => {
    //         console.log( res.data );
    //     }).catch( err => console.log( 'error', err) );
    // }

    deletePost ( postId ) {
        axios.delete(`/api/delete-post/${ postId }`).then( res => {
            console.log( res.data );
        }).catch( err => console.log(err) );
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
                    <span>
                        {/* <button onClick={ () => this.editPost( post.id ) }>Edit</button> */}
                        <button onClick={ () => this.deletePost( post.id ) }>Delete</button>
                    </span>
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

                    <ul className="posts-list">
                        { listOfPosts }
                    </ul>

                </div>
            </div>
        )
    }
}

export default Posts;