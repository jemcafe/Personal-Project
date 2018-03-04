import React, { Component } from 'react';
import './Follows.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Following extends Component {

    render () {
        const { follows } = this.props;
        
        const listOfFollows = follows.map( follow => {
            return (
                <li key={ follow.id }>
                    <div><Link to={`/${follow.username}`}><img className="profile-img" src={ follow.imageurl } alt="Profile pic"/></Link></div>
                    <div><Link to={`/${follow.username}`} className="username">{ follow.username }</Link></div>
                </li>
            )
        });
            
        return (
            <div className="follows">
                <div className="follows-container">

                    <h3>Following</h3>

                    { listOfFollows.length ? <ul className="follows-list">{ listOfFollows }</ul> : <h5>You aren't following anyone</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Following );