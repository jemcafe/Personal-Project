import React, { Component } from 'react';
import './Following.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Followers extends Component {
    constructor () {
        super();
        this.state = {
            followers: []
        }
    }

    componentDidMount () {
        axios.get(`/api/followers`).then( followers => {
            this.setState({ followers: followers.data });
        }).catch( err => console.log(err) );
    }

    render () {
        const { followers } = this.state;
        const listOfFollowers = followers.map( follower => {
            return (
                <li key={ follower.id }>
                    <div><Link to={`/${follower.username}`}><img className="profile-img" src={ follower.imageurl } alt="Profile pic"/></Link></div>
                    <div><Link to={`/${follower.username}`}>{ follower.username }</Link></div>
                </li>
            )
        });
            
        return (
            <div className="following">
                <div className="following-container">

                    <h3>Following</h3>

                    { listOfFollowers.length ? <ul className="follows-list">{ listOfFollowers }</ul> : <h5>You aren't following anyone</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Followers );