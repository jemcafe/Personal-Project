import React, { Component } from 'react';
import './Posts.css';
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Loading from '../../Loading/Loading';
import Post from './Post/Post';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            hasPosts: 'loading',
            comments: [],
            recentPosters: [],
            hasPosters: 'loading',
            title: '',
            text: '',
            image_url: ''
        }
        // Methods do not need to be binded if they are function expressions
    }

    componentDidMount () {
        axios.all([
            axios.get(`/api/profile/${this.props.profileUser.username}/posts`),
            axios.get(`/api/profile/${this.props.profileUser.username}/posters/recent`)
        ]).then( axios.spread( (postsRes, postersRes) => {
            this.setState({ 
                posts: postsRes.data,
                hasPosts: postsRes.data.length ? 'true' : 'false',
                recentPosters: postersRes.data,
                hasPosters: postersRes.data.length ? 'true' : 'false'
            });
        })).catch(err => console.log(err));
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost = (e) => {
        e.preventDefault();
        const { title, text, image_url } = this.state;
        if ( title && text ) {
            axios.post('/api/post', { title, text, image_url }).then(() => {
                axios.get(`/api/posts`).then( posts => {

                    this.setState({ 
                        posts: posts.data,
                        hasPosts: 'true',
                        title: '', 
                        text: '', 
                        image_url: '' 
                    });

                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    editPost = ( id, title, text, image_url ) => {
        axios.put(`/api/post/${id}/edit`, { title, text, image_url }).then(() => {
            axios.get(`/api/posts`).then( posts => {

                this.setState({ posts: posts.data });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
    

    deletePost = ( id ) => {
        axios.delete(`/api/post/${id}/delete`).then(() => {
            axios.get(`/api/posts`).then( posts => {

                this.setState({
                    posts: posts.data,
                    hasPosts: posts.data.length ? 'true' : 'false'
                });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { posts, hasPosts, recentPosters, hasPosters, title, text, image_url } = this.state;
        const { user, profileUser, paramsUsername } = this.props;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id }
                         profileUser = { profileUser }
                         paramsUsername = { paramsUsername }
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        const listOfRecentPosters = recentPosters.map( poster => {
            return (
                <li key={ poster.id } className="fade-in">
                    <span style={{background: `center / cover no-repeat url(${poster.image_url})`}}></span>
                </li>
            )
        });

        return (
            <div className="posts">
                <div className="posts-container">

                    <div className="posts-list">
                        <div className="posts-list-container">

                            { user.username === paramsUsername &&
                            <form className="new-post" onSubmit={ this.createPost }>
                                <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                                <input className="input" value={ image_url } placeholder="Image Url" onChange={ (e) => this.handleChange('image_url', e.target.value) }/>
                                <textarea className="input" rows="1" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                                <button className="red-btn" type="submit">Post</button>
                            </form> }
                            
                            <div>
                                { !listOfPosts.length && hasPosts === 'loading' ? ( 
                                    <Loading />
                                ) : (
                                    hasPosts === 'true'
                                    ? <ul>{ listOfPosts }</ul>
                                    : user.username === paramsUsername 
                                    ? <h5>You haven't made any posts</h5>
                                    : <h5>No posts</h5>
                                ) }
                            </div>

                        </div>
                    </div>

                    <div className="latest">
                        <div className="latest-container">
                            <h4>Recent Posters</h4>
                            
                            <ul>
                                { !listOfRecentPosters.length && hasPosters === 'loading' ? (
                                    <Loading />
                                ) : (
                                    hasPosters === 'true'
                                    ? listOfRecentPosters
                                    : <h5>No posters</h5>
                                ) }
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posts );