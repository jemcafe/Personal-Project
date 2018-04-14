import React, { Component } from 'react';
import './Post.css';
import FaEdit from 'react-icons/lib/fa/edit';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Components
import Aux from '../../../../hoc/Aux';
import Comment from '../Comment/Comment';
import Loading from '../../../Loading/Loading';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.post.title,
            text: props.post.text,
            image_url: props.post.image_url,
            editMode: false,

            comments: [],
            hasComments: 'loading',
            showComments: false,
            showCommentForm: false,
            comment: ''
        }
    }

    componentDidMount () {
        axios.get(`/api/post/${this.props.post.id}/comments`).then( comments => {
            console.log( comments.data );
            this.setState({ 
                comments: comments.data,
                hasComments: comments.data.length ? 'true' : 'false'
            });
        }).catch(err => console.log(err));
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleEdit = () => {
        this.setState(prevState => ({ editMode: !prevState.editMode }));
    }

    saveEdit = () => {
        const { title, text, image_url } = this.state;
        this.props.editPost(this.props.post.id, title, text, image_url);
        this.toggleEdit();
    }

    toggleComments = () => {
        // showComments controls the list of comments' visibility
        this.setState(prevState => ({ showComments: !prevState.showComments }));
        // If the comments have not been requested, they are requested
        // if ( this.state.hasComments === 'loading' ) this.getComments();
    }

    toggleCommentForm = () => {
        this.setState(prevState => ({ 
            showCommentForm: !prevState.showCommentForm 
        }));
    }

    createComment = (e) => {
        e.preventDefault();
        if ( this.state.comment ) {
            axios.post('/api/comment', { 
                text: this.state.comment,
                post_id: this.props.post.id
            }).then( () => {
                axios.get(`/api/post/${this.props.post.id}/comments`).then( comments => {

                    this.setState({ 
                        comments: comments.data,
                        hasComments: 'true',
                        comment: ''
                    });

                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    deleteComment = ( id, post_id ) => {
        axios.delete(`/api/comment/${id}/delete`).then( () => {
            axios.get(`/api/post/${post_id}/comments`).then( comments => {

                this.setState({
                    comments: comments.data,
                    hasComments: comments.data.length ? 'true' : 'false'
                });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { comments, hasComments, showComments, showCommentForm, comment } = this.state;
        const { user, profileUser, paramsUsername, post } = this.props;

        // If there is an image url, the image will be displayed if the input begins with the proper http
        const image_urlCheck = post.image_url && (post.image_url.slice(0,7) === 'http://' || post.image_url.slice(0,8) === 'https://') ? true : false;

        const listOfComments = comments.map( comment => {
            return <Comment key={ comment.id }
                            comment={ comment }
                            post={ post } 
                            profileUser={ profileUser } 
                            paramsUsername={ paramsUsername }
                            deleteComment={ this.deleteComment } />
        });

        return (
            <Aux>
                <li className="post fade-in">
                    { this.state.editMode ? (
                        <div className="container">

                            <div className="avatar-name">
                                <Link to={`/${post.username}`}>
                                    <div className="avatar" style={{background: `center / cover no-repeat url(${profileUser.avatar})`}}></div>
                                </Link>
                                <h4>{ profileUser.username }</h4>
                            </div>
                            { image_urlCheck && <div className="image"><img src={ post.image_url } alt="Url not found"/></div> }
                            <input className="input" placeholder="Title" defaultValue={ post.title } onChange={ (e) => this.handleChange('title', e.target.value) }/>
                            <input className="input" placeholder="Url" defaultValue={ post.image_url } onChange={ (e) => this.handleChange('image_url', e.target.value) }/>
                            <textarea className="input" rows="1" cols="10" defaultValue={ post.text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                            <span className="btns">
                                <button className="gray-btn" onClick={ this.toggleEdit }>Cancel</button>
                                <button className="gray-btn" onClick={ () => this.props.deletePost( post.id ) }>Delete</button>
                                <button className="red-btn" onClick={ this.saveEdit }>Save</button>
                            </span>

                        </div>
                    ) : (
                        <div className="container fade-in">

                            <div className="avatar-name">
                                <Link to={`/${post.username}`}>
                                    <div className="avatar" style={{background: `center / cover no-repeat url(${profileUser.avatar})`}}></div>
                                </Link>
                                <h4>{ profileUser.username }</h4>
                            </div>
                            <h3>{ post.title }</h3>
                            { image_urlCheck && <div className="image"><img src={ post.image_url } alt="Url not found"/></div> }
                            <div className="text" >{ post.text }</div>
                            <div className="date-edit">
                                <div>{ post.date_posted }</div>
                                { user.username === paramsUsername && <div><FaEdit className="fa-edit" onClick={ () => this.toggleEdit() } size={25} color="gray" /></div> }
                            </div>

                        </div>
                    ) }
                    
                    <div className="comments">
                        <div className="container">

                            <div>
                                { comments.length > 0 && (
                                    <a onClick={ this.toggleComments }>
                                        {showComments ? 'Hide' : 'View'} {comments.length} comment{comments.length > 1 && 's'}
                                    </a> 
                                ) }
                                { user.username &&
                                <a onClick={ this.toggleCommentForm }>
                                    Comment <i className={`fas fa-angle-${showCommentForm ? 'up' : 'down'}`}></i>
                                </a> }
                            </div>

                            { showCommentForm &&
                            <form className="comment-form" style={{marginTop:'10px'}} onSubmit={this.createComment}>
                                <textarea className="input" value={ comment } placeholder="Comment" onChange={(e) => this.handleChange('comment', e.target.value)}></textarea>
                                <div className="submit-btn">
                                    <input className="red-btn" type="submit" value="Comment"/>
                                </div>
                            </form> }

                            {/* { showComments && (
                                hasComments === 'loading'
                                ? <Loading />
                                : hasComments === 'true'
                                ? <ul>{ listOfComments }</ul>
                                : ''
                            ) } */}

                        </div>
                    </div>

                </li>
                            
                { showComments && (
                    hasComments === 'loading'
                    ? <Loading />
                    : hasComments === 'true'
                    ? <ul>{ listOfComments }</ul>
                    : ''
                ) }
            </Aux>
        )
    }
}

export default connect( state => state )( Post );