import React, { Component } from 'react';

class Post extends Component {
    constructor () {
        super();
        this.state = {
            editMode: false
        }
    }

    toggleEdit () {
        console.log( this.state.editMode );
        if ( this.state.editMode === false) {
            this.setState({ editMode: true });
        } else {
            this.setState({ editMode: false });
        }
    }

    render () {
        const { id, title, text, image, date, userId } = this.props;
        const { editPost, deletePost } = this.props;
        const { editMode } = this.state;

        return (
            <li>
                { !editMode ? (
                    <div>
                        <div>{ title }</div>
                        <div>{ text }</div>
                        <div>{ image }</div>
                        <div>{ date }</div>
                        <div>{ userId }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Edit</button>
                            <button onClick={ () => deletePost( id ) }>Delete</button>
                        </span>
                    </div>
                ) : (
                    <div>
                        <div><input placeholder={ title }/></div>
                        <div><input placeholder={ text }/></div>
                        <div><input placeholder={ image }/></div>
                        <div>{ date }</div>
                        <div>{ userId }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Cancel</button>
                            <button onClick={ () => editPost( id, title, text, image ) }>Confirm</button>
                        </span>
                    </div>
                ) }
            </li>
        )
    }
}

export default Post;