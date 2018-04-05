import React, { Component } from 'react';
import './Post.css';
import FaEdit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Components
import Comments from '../Comments/Comments';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.post.title,
            text: props.post.text,
            image_url: props.post.image_url,
            editMode: false
        }
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

    render () {
        const { id, title, text, image_url, date_posted, username } = this.props.post;
        const { user, profileUser, paramsUsername } = this.props;

        // If there is an image url, the image will be displayed if the input begins with the proper http
        const image_urlCheck = image_url && (image_url.slice(0,7) === 'http://' || image_url.slice(0,8) === 'https://') ? true : false;

        return (
            <li className="post fade-in">
                { this.state.editMode ? (
                    <div className="container">

                        <div className="avatar-name">
                            <Link to={`/${username}`}>
                                <div className="avatar" style={{background: `center / cover no-repeat url(${profileUser.avatar})`}}></div>
                            </Link>
                            <h4>{ profileUser.username }</h4>
                        </div>
                        { image_urlCheck && <div className="image"><img src={ image_url } alt="Url not found"/></div> }
                        <input className="input" placeholder="Title" defaultValue={ title } onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input className="input" placeholder="Url" defaultValue={ image_url } onChange={ (e) => this.handleChange('image_url', e.target.value) }/>
                        <textarea className="input" rows="1" cols="10" defaultValue={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                        <span className="btns">
                            <button className="gray-btn" onClick={ this.toggleEdit }>Cancel</button>
                            <button className="gray-btn" onClick={ () => this.props.deletePost( id ) }>Delete</button>
                            <button className="red-btn" onClick={ this.saveEdit }>Save</button>
                        </span>

                    </div>
                ) : (
                    <div className="container fade-in">

                        <div className="avatar-name">
                            <Link to={`/${username}`}>
                                <div className="avatar" style={{background: `center / cover no-repeat url(${profileUser.avatar})`}}></div>
                            </Link>
                            <h4>{ profileUser.username }</h4>
                        </div>
                        <h3>{ title }</h3>
                        { image_urlCheck && <div className="image"><img src={ image_url } alt="Url not found"/></div> }
                        <div className="text" >{ text }</div>
                        <div className="date-edit">
                            <div>{ date_posted }</div>
                            { user.username === paramsUsername && <div><FaEdit className="fa-edit" onClick={ () => this.toggleEdit() } size={25} color="gray" /></div> }
                        </div>

                    </div>
                ) }

                <Comments post={this.props.post} profileUser={profileUser} paramsUsername={paramsUsername} />
            </li>
        )
    }
}

export default connect( state => state )( Post );