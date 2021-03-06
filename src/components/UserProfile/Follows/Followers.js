import React, { Component } from 'react';
import './Follows.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Followers extends Component {
    render () {
        const listOfFollowers = this.props.followers.map( follower => {
            return <li key={ follower.follower_id }>
                <Link to={`/${follower.username}`} className="avatar" style={{background: `center / cover no-repeat url(${follower.avatar})`}}></Link>
                <Link to={`/${follower.username}`} className="username">{ follower.username }</Link>
            </li>
        });
            
        return (
            <div className="follows">
                <div className="container">

                    <h3>Followers</h3>

                    { listOfFollowers.length 
                      ? <ul className="follows-list">{ listOfFollowers }</ul> 
                      : <h5>No followers</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Followers );