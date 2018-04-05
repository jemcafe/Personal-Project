import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
// Components
import Loading from '../../../Loading/Loading';

class Comments extends Component {
    constructor () {
        super();
        this.state = {
            comments: [{id: 1, text: 'Text 1'}, {id: 2, text: 'Text 2'}]
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    showComments = () => {
        // axios.get('/api/comments').then( comments => {
        //     this.setState({ 
        //         comments: comments
        //     });
        // }).catch(err => console.log(err));
    }

    createComment = ( ) => {
        // e.preventDefault();
        // const { title, text, image_url } = this.state;
        // if ( title && text ) {
        //     axios.post('/api/post', { title, text, image_url }).then(() => {
        //         axios.get(`/api/posts`).then( posts => {

        //             this.setState({ 
        //                 posts: posts.data,
        //                 hasPosts: 'true',
        //                 title: '', 
        //                 text: '', 
        //                 image_url: '' 
        //             });

        //         }).catch(err => console.log(err));
        //     }).catch(err => console.log(err));
        // }
    }

    editComment = ( ) => {
        // axios.put(`/api/post/${id}/edit`, { title, text, image_url }).then(() => {
        //     axios.get(`/api/posts`).then( posts => {

        //         this.setState({ posts: posts.data });

        //     }).catch(err => console.log(err));
        // }).catch(err => console.log(err));
    }
    

    deleteComment = ( ) => {
        // axios.delete(`/api/post/${id}/delete`).then(() => {
        //     axios.get(`/api/posts`).then( posts => {

        //         this.setState({
        //             posts: posts.data,
        //             hasPosts: posts.data.length ? 'true' : 'false'
        //         });

        //     }).catch(err => console.log(err));
        // }).catch(err => console.log(err));
    }

    render () {
        const { user, profileUser, paramsUsername } = this.props;

        const listOfComments = this.state.comments.map( comment => {
            return <li key={comment.id}>
                <div>{comment.text}</div>
            </li>
        })

        return (
            <div className="comments">
                <div className="container">

                    COMMENTS
                    <ul>{ listOfComments }</ul>

                    <div className="new-comment">
                        NEW COMMENT
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Comments );