import React, { Component } from 'react';
import './Follows.css';
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
        const { profileUser } = this.props;

        axios.get(`/api/followers/${profileUser.id}`).then( res => {
            this.setState({ followers: res.data });
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
            <div className="follows">
                <div className="follows-container">

                    <h3>Followers</h3>

                    { listOfFollowers.length ? <ul className="follows-list">{ listOfFollowers }</ul> : <h5>No followers</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Followers );