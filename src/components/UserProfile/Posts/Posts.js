import React, { Component } from 'react';
import './Posts.css';
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Post from './Post/Post';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            recentPosters: [],
            title: '',
            text: '',
            imageurl: '',
        }
        // Methods do not need to be binded if they are function expressions ( React 2016 )
    }

    componentDidMount () {
        axios.all([
            axios.get(`/api/profile/${this.props.profileUser.username}/posts`),
            axios.get(`/api/profile/${this.props.profileUser.username}/posters/recent`)
        ]).then( axios.spread( (postsRes, postersRes) => {
            console.log( 'Posts', postsRes.data );
            console.log( 'Posters', postersRes.data );
            this.setState({ 
                posts: postsRes.data, 
                recentPosters: postersRes.data 
            });
        })).catch(err => console.log(err));
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost = () => {
        const { title, text, imageurl } = this.state;
        if ( title && text ) {
            axios.post('/api/post', { title, text, imageurl }).then( res => {
                axios.get(`/api/posts`).then( posts => {

                    this.setState({ 
                        posts: posts.data, 
                        title: '', 
                        text: '', 
                        image: '' 
                    });

                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    editPost = ( id, title, text, imageurl ) => {
        axios.put(`/api/post/${id}/edit`, { title, text, imageurl }).then( res => {
            axios.get(`/api/posts`).then( posts => {

                this.setState({ posts: posts.data });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
    

    deletePost = ( id ) => {
        axios.delete(`/api/post/${id}/delete`).then( res => {
            axios.get(`/api/posts`).then( posts => {

                this.setState({ posts: posts.data });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { posts, recentPosters, title, text, imageurl } = this.state;
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
            return <li key={ poster.id } className="fade-in"><img src={ poster.imageurl } alt="Poster"/></li> 
        });

        return (
            <div className="posts">
                <div className="posts-container">

                    <div className="posts-list">
                        <div className="posts-list-container">

                            { user.username === paramsUsername &&
                            <div className="new-post">
                                <input className="input" value={ title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                                <input className="input" value={ imageurl } placeholder="Image Url" onChange={ (e) => this.handleChange('imageurl', e.target.value) }/>
                                <textarea className="input" rows="1" cols="10" value={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                                <button className="btn" onClick={ this.createPost }>Post</button>
                            </div> }

                            { listOfPosts.length
                            ? <div><ul >{ listOfPosts }</ul></div>
                            : user.username === paramsUsername 
                            ? <div><h5>You haven't made any posts</h5></div>
                            : <div><h5>No posts</h5></div> }

                        </div>
                    </div>

                    <div className="latest">
                        <div className="latest-container">
                            <h4>Recent Posters</h4>
                            
                            { listOfRecentPosters.length
                            ? <div><ul>{ listOfRecentPosters }</ul></div>
                            : <h5>No posters</h5> }

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posts );