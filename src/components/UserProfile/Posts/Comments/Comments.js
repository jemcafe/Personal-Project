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
            comments: [{id: 1, text: 'This is a comment', avatar: 'https://jovemnerd.com.br/wp-content/uploads/2017/12/one-piece-mangas-mais-vendidos-de-2017.jpg', username: 'Luffy'}],
            hasComments: 'loading',
            showComments: false,
            showCommentForm: false,
            text: ''

        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleComments = () => {
        this.setState(prevState => ({ 
            showComments: !prevState.showComments 
        }));
    }

    showComments = () => {
        this.toggleComments();
        // axios.get('/api/post/${this.props.post.id}/comments')
        // .then( comments => {
        //     this.setState({ 
        //         comments: comments
        //         hasComments: comments.data.length ? 'true' : 'false'
        //     });
        // }).catch(err => console.log(err));
    }

    toggleCommentForm = () => {
        this.setState(prevState => ({ 
            showCommentForm: !prevState.showCommentForm 
        }));
    }

    createComment = () => {
        // e.preventDefault();
        // const { text } = this.state;
        // const { id } = this.props.post;

        // if ( text ) {
        //     axios.post('/api/comment', { text }).then( () => {
        //         axios.get(`/api/post/${id}/comments`).then( comments => {

        //             this.setState({ 
        //                 comments: comments.data,
        //                 hasComments: 'true',
        //                 text: ''
        //             });

        //         }).catch(err => console.log(err));
        //     }).catch(err => console.log(err));
        // }
    }

    editComment = () => {
        // axios.put(`/api/comment/edit`, { id, text }).then(() => {
        //     axios.get(`/api/post/${id}/comments`).then( comments => {

        //         this.setState({ comments: comments.data });

        //     }).catch(err => console.log(err));
        // }).catch(err => console.log(err));
    }
    

    deleteComment = ( ) => {
        // axios.delete(`/api/comment/delete/${id}`).then(() => {
        //     axios.get(`/api/comments`).then( comments => {

        //         this.setState({
        //             comments: comments.data,
        //             hasComments: comments.data.length ? 'true' : 'false'
        //         });

        //     }).catch(err => console.log(err));
        // }).catch(err => console.log(err));
    }

    render () {
        const { comments, hasComments, showComments, showCommentForm, text } = this.state;
        const { user, profileUser, paramsUsername } = this.props;

        const listOfComments = comments.map( comment => {
            return <li key={comment.id}>
                <avatar><div style={{background:`url(center / cover no-repeat url(${comment.avatar})`}}></div></avatar>
                <username>{comment.username}</username>
                <p>{comment.text}</p>
            </li>
        })

        return (
            <div className="comments">
                <div className="container">

                    <a onClick={ this.showComments }>Show {comments.length} comments</a>
                    <a onClick={ this.toggleCommentForm }>Comment</a>

                    { showComments && 
                    <ul>{ listOfComments }</ul> }

                    { showCommentForm &&
                    <form className="new-comment">
                        <textarea className="input" value={ text } placeholder="Comment" onChange={(e) => this.handleChange('text', e.target.value)}></textarea>
                        <div className="submit-btn">
                            <button className="red-btn">Comment</button>
                        </div>
                    </form> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Comments );