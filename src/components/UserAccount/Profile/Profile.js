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
            image: '',
            posters: [],
        }
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount () {
        axios.get('/api/posts').then( res => {
            this.setState({ posts: res.data });
        }).catch( err => console.log(err) );

        //  Only needed the most recent posters with a max of 3
        axios.get('/api/posters').then( res => {
            let posters = []; 
            if ( res.data.length <= 3 ) {
                for ( let i = 0; i < res.data.length; i++ ) { posters.push(res.data[i]) }
                this.setState({ posters: posters });
            } else {
                for ( let i = 0; i < 3; i++ ) { posters.push(res.data[i]) }
                this.setState({ posters: posters });
            }
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost ( title, text, image ) {
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.post('/api/new-post', body).then( res => {
            console.log( res.data );

            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data, title: '', text: '', image: '' });
            }).catch( err => console.log(err) );

        }).catch( err => console.log( err ) );
    }

    editPost ( id, title, text, image ) {
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.put(`/api/edit-post/${ id }`, body).then( res => {
            console.log( res.data );

            // Eventually this should only update one post instead of all of them
            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }
    

    deletePost ( id ) {
        axios.delete(`/api/delete-post/${ id }`).then( res => {
            console.log( res.data );

            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { posts, posters, title, text, image } = this.state;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id } 
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        const listOfRecentPosters = posters.map( poster => {
            return (
                <li key={ poster.id }>
                    <img src={ poster.imageurl } alt="poster pic"/>
                </li>
            )
        });

        return (
            <div className="posts">
                    {/* <div>POSTS COMPONENT</div> */}

                <div className="posts-container">
                    <div className="new-post">
                        {/* <div>New Post</div> */}
                        <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input className="input" value={ image } placeholder="Image Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <textarea className="input" rows="1" cols="10" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                        <button className="btn" onClick={ () => this.createPost(title, text, image) }>Post</button>
                    </div>
                    
                    <ul className="posts-list">
                        { listOfPosts }
                    </ul>
                </div>

                <div className="latest-container">
                    RECENT
                    <div>
                        POSTERS
                        { listOfRecentPosters.length ? <ul>{ listOfRecentPosters }</ul> : 'No Posters' }
                    </div>
                    <div>BOOKS</div>
                </div>

            </div>
        )
    }
}

export default Posts;