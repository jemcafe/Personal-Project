import React, { Component } from 'react';
import './Following.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Following extends Component {
    constructor () {
        super();
        this.state = {
            follows: []
        }
    }

    componentDidMount () {
        axios.get(`/api/follows`).then( follows => {
            this.setState({ follows: follows.data });
        }).catch( err => console.log(err) );
    }

    render () {
        const { follows } = this.state;
        const listOfFollows = follows.map( follow => {
            return (
                <li key={ follow.id }>
                    <div><Link to={`/${follow.username}`}><img className="profile-img" src={ follow.imageurl } alt="Profile pic"/></Link></div>
                    <div><Link to={`/${follow.username}`}>{ follow.username }</Link></div>
                </li>
            )
        });
            
        return (
            <div className="following">
                <div className="following-container">

                    <h3>Following</h3>

                    { listOfFollows.length ? <ul className="follows-list">{ listOfFollows }</ul> : <h5>You aren't following anyone</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Following );