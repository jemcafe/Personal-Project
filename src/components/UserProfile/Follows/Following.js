import React, { Component } from 'react';
import './Follows.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Following extends Component {
    render () {
        const listOfFollows = this.props.follows.map( follow => {
            return <li key={ follow.id }>
                <Link to={`/${follow.username}`} className="avatar" style={{background: `center / cover no-repeat url(${follow.avatar})`}}></Link>
                <Link to={`/${follow.username}`} className="username">{ follow.username }</Link>
            </li>
        });
            
        return (
            <div className="follows">
                <div className="container">

                    <h3>Following</h3>

                    { listOfFollows.length 
                      ? <ul className="follows-list">{ listOfFollows }</ul> 
                      : <h5>You aren't following anyone</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Following );