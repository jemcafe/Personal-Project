import React, { Component } from 'react';
import './Comment.css';
// Redux
import { connect } from 'react-redux';

class Comments extends Component {
    constructor () {
        super();
        this.state = { }
    }

    editComment = () => {
        // axios.put(`/api/comment/edit`, { id, text }).then(() => {
        //     axios.get(`/api/post/${id}/comments`).then( comments => {

        //         this.setState({ comments: comments.data });

        //     }).catch(err => console.log(err));
        // }).catch(err => console.log(err));
    }

    render () {
        // const { user, profileUser, paramsUsername, comment } = this.props;
        const { user, comment, deleteComment } = this.props;

        return (
            <li className="comment" key={comment.id}>
                <span>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div className="avatar"><div style={{background:`center / cover no-repeat url(${comment.avatar})`}}></div></div>
                        <div className="username">{comment.username}</div>
                    </div>
                    { user.username === comment.username &&
                        // <button className="gray-btn" onClick={() => this.deleteComment(comment.id)}>Delete</button> 
                        <div style={{marginRight:'5px', cursor:'pointer'}} onClick={() => deleteComment(comment.id, comment.post_id)}>
                            <i className="fa fa-trash"></i>
                        </div> 
                    }
                </span>
                <p>{comment.text}</p>
            </li>
        )
    }
}

export default connect( state => state )( Comments );