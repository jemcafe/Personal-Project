import React, { Component } from 'react';
import axios from 'axios';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
           title: '',
           message: ''
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    post () {
        const body = { title: this.state.title , message: this.state.message };
        axios.post('/api/newpost', body).then( res => {
            console.log( res.data );
        }).catch( err => console.log( 'error', err) );
    }

    render () {
        return (
            <div className="posts">
                <div className="posts-container">
                    <div>POSTS</div>
                    <input placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                    <input placeholder="Message" onChange={ (e) => this.handleChange('message', e.target.value) }/>
                    <button onClick={ () => this.post() }>Post</button>
                </div>
            </div>
        )
    }
}

export default Posts;