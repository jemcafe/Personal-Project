import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

        if ( title && text ) {
            axios.post('/api/new-post', body).then( res => {
                console.log( res.data );

                axios.get('/api/posts').then( resp => {
                    this.setState({ posts: resp.data, title: '', text: '', image: '' });
                }).catch( err => console.log(err) );

            }).catch( err => console.log( err ) );
        }
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
        const { user } = this.props;

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
            <div className="profile">
                {/* <div>PROFILE COMPONENT</div> */}

                <div className="profile-header">
                    <div className="profile-header-container">
                        <div className="profile-pic-name">
                            <Link to={`/${user.username}`}>
                                <div className="profile-pic"><img src={ user.imageurl } alt="Profile pic"/></div>
                            </Link>
                            <h4>{ user.username }</h4>
                        </div>

                        <div className="user-nav">
                            {/* <Link to={`/${user.username}`}>Profile</Link> */}
                            <Link to={`/${user.username}/posters`}>Posters</Link>
                            <Link to={`/${user.username}/following`}>Following</Link>
                            {/* <Link to={`/${user.username}/cart`}>Cart</Link> */}
                            <Link to={`/${user.username}/settings`}>Settings</Link>
                        </div>
                    </div>
                </div>

                <div className="posts-container">
                    <div className="new-post">
                        {/* <div>New Post</div> */}
                        <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input className="input" value={ image } placeholder="Image Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <textarea className="input" rows="1" cols="10" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                        <button className="btn" onClick={ () => this.createPost(title, text, image) }>Post</button>
                    </div>
                    
                    { listOfPosts.length ? <ul className="posts-list">{ listOfPosts }</ul> : <h5>You haven't made any posts</h5> }
                </div>

                <div className="latest">
                    <div className="latest-container">
                        <h4>Recent Posters</h4>
                        { listOfRecentPosters.length ? <div><ul>{ listOfRecentPosters }</ul></div> : <h5>No posters</h5> }
                    </div>
                </div>

            </div>
        )
    }
}

export default connect( state => state )( Posts );