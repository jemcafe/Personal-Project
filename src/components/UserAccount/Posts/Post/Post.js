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
        const { id, title, text, imageurl, dateposted, userId} = this.props.post;
        const { deletePost } = this.props;

        return (
            <li className="post">
                { !this.state.editMode ? (
                    <div>
                        <div>{ title }</div>
                        <div>{ text }</div>
                        <div>{ imageurl }</div>
                        <div>{ dateposted }</div>
                        <div>{ userId }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Edit</button>
                        </span>
                    </div>
                ) : (
                    <div>
                        <div><input placeholder="Title" defaultValue={ title } onChange={ (e) => this.handleChange('title', e.target.value) }/></div>
                        <div><input placeholder="Text" defaultValue={ text } onChange={ (e) => this.handleChange('text', e.target.value) }/></div>
                        <div><input placeholder="Url" defaultValue={ imageurl } onChange={ (e) => this.handleChange('image', e.target.value) }/></div>
                        <div>{ dateposted }</div>
                        <div>{ userId }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Cancel</button>
                            <button onClick={ () => this.saveEdit( id, this.state.title, this.state.text, this.state.image ) }>Save</button>
                            <button onClick={ () => deletePost( id ) }>Delete</button>
                        </span>
                        <p>{ JSON.stringify( this.state.title ) }</p>
                        <p>{ JSON.stringify( this.state.text ) }</p>
                        <p>{ JSON.stringify( this.state.image ) }</p>
                    </div>
                ) }
            </li>
        )
    }
}

export default Post;