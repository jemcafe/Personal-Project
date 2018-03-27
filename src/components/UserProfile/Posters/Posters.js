import React, { Component } from 'react';
import './Posters.css';
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Loading from '../../Loading/Loading';
import Poster from './Poster/Poster';

class Posters extends Component {
    constructor () {
        super();
        this.state = {
            posters: [],
            hasPosters: ''
        }
    }

    componentDidMount () {
        axios.get(`/api/profile/${this.props.profileUser.username}/posters`)
        .then( posters => {
            this.setState({ 
                posters: posters.data,
                hasPosters: posters.data.length ? 'true' : 'false'
            });
        }).catch( err => console.log(err) );
    }

    render () {
        const listOfPosters = this.state.posters.map( poster => {
            return <Poster key={poster.id} poster={poster} />
        });

        return (
            <div className="posters">
                <div className="container">

                    { !listOfPosters.length && !this.state.hasPosters.length ? (
                        <Loading />
                    ) : (
                        this.state.hasPosters === 'true'
                        ? <ul className="posters-list fade-in">{ listOfPosters }</ul>
                        : <h5>No posters created</h5> 
                    ) }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );