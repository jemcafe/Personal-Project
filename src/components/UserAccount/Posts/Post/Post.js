import React, { Component } from 'react';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            text: this.props.post.text,
            image: this.props.post.imageurl,
            editMode: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleEdit () {
        console.log( this.state.editMode );
        if ( this.state.editMode === false) {
            this.setState({ editMode: true }); 
        } else {
            this.setState({ editMode: false });
        }
    }

    saveEdit (id, title, text, image) {
        const { editPost } = this.props;

        this.toggleEdit();
        editPost(id, title, text, image);
    }

    render () {
        const { id, title, text, imageurl, dateposted, username } = this.props.post;
        const { deletePost } = this.props;

        // The image will be displayed if the input begins with the condition
        const imageurlCheck = imageurl.slice(0,8) === 'https://' ? true : false;

        return (
            <li className="post">
                { !this.state.editMode ? (
                    <div className="post-container">
                        { imageurlCheck && <img src={ imageurl } alt="Url not found"/> }
                        <div>
                            <div>Title: { title }</div>
                            <div>Username: { username }</div>
                        </div>
                        <div>Text: { text }</div>
                        <div>
                            <div>Date: { dateposted }</div>
                            <div><button onClick={ () => this.toggleEdit() }>Edit</button></div>
                        </div>
                    </div>
                ) : (
                    <div className="post-container">
                        { imageurlCheck && <img src={ imageurl } alt="Url not found"/> }
                        <div>
                            <input placeholder="Url" defaultValue={ imageurl } onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        </div>
                        <div>
                            <div>Title: <input placeholder="Title" defaultValue={ title } onChange={ (e) => this.handleChange('title', e.target.value) }/></div>
                            <div>Username: { username }</div>
                        </div>
                        <div>Text: <input placeholder="Text" defaultValue={ text } onChange={ (e) => this.handleChange('text', e.target.value) }/></div>
                        <div>{ dateposted }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Cancel</button>
                            <button onClick={ () => this.saveEdit( id, this.state.title, this.state.text, this.state.image ) }>Save</button>
                            <button onClick={ () => deletePost( id ) }>Delete</button>
                        </span>
                    </div>
                ) }
            </li>
        )
    }
}

export default Post;