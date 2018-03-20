import React, { Component } from 'react';
import './Post.css';
import FaEdit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            text: this.props.post.text,
            imageurl: this.props.post.imageurl,
            editMode: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleEdit () {
        this.setState(prevState => ({ editMode: !prevState.editMode }));
    }

    saveEdit () {
        const { title, text, imageurl } = this.state;
        console.log( 'Image', imageurl );
        this.props.editPost(this.props.post.id, title, text, imageurl);
        this.toggleEdit();
    }

    render () {
        const { id, title, text, imageurl, dateposted, username } = this.props.post;
        const { user, profileUser, paramsUsername } = this.props;

        // If there is an image url, the image will be displayed if the input begins with the proper http
        const imageurlCheck = imageurl && (imageurl.slice(0,7) === 'http://' || imageurl.slice(0,8) === 'https://') ? true : false;

        return (
            <li className="post fade-in">
                { this.state.editMode ? (
                    <div className="container">

                        <div className="avatar-name">
                            <Link to={`/${username}`} className="avatar"><img src={ profileUser.imageurl} alt="Proifle pic"/></Link>
                        </div>
                        { imageurlCheck && <div className="image"><img src={ imageurl } alt="Url not found"/></div> }
                        <input className="input" placeholder="Title" defaultValue={ title } onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        <input className="input" placeholder="Url" defaultValue={ imageurl } onChange={ (e) => this.handleChange('imageurl', e.target.value) }/>
                        <textarea className="input" rows="1" cols="10" defaultValue={ text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                        <span className="btns">
                            <button className="gray-btn" onClick={ () => this.toggleEdit() }>Cancel</button>
                            <button className="gray-btn" onClick={ () => this.props.deletePost( id ) }>Delete</button>
                            <button className="red-btn" onClick={ () => this.saveEdit() }>Save</button>
                        </span>

                    </div>
                ) : (
                    <div className="container fade-in">

                        <div className="avatar-name">
                            <Link to={`/${profileUser.username}`} className="avatar"><img src={ profileUser.imageurl} alt="Proifle pic"/></Link>
                        </div>
                        <h3>{ title }</h3>
                        { imageurlCheck && <div className="image"><img src={ imageurl } alt="Url not found"/></div> }
                        <div className="text" >{ text }</div>
                        <div className="date-edit">
                            <div>{ dateposted }</div>
                            { user.username === paramsUsername && <div><FaEdit className="fa-edit" onClick={ () => this.toggleEdit() } size={25} color="gray" /></div> }
                        </div>

                    </div>
                ) }
            </li>
        )
    }
}

export default connect( state => state )( Post );